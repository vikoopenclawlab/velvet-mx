import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get reviews for a model
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get('modelId')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!modelId) {
      return NextResponse.json({ error: 'modelId required' }, { status: 400 })
    }

    const reviews = await prisma.review.findMany({
      where: { modelId },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

    // Update model's rating and reviewCount
    if (reviews.length > 0) {
      await prisma.model.update({
        where: { id: modelId },
        data: {
          rating: Math.round(avgRating * 10) / 10,
          reviewCount: reviews.length,
        },
      })
    }

    return NextResponse.json({
      reviews,
      averageRating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length,
    })
  } catch (error) {
    console.error('Reviews GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a review
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { modelId, rating, title, content } = body

    if (!modelId || !rating) {
      return NextResponse.json(
        { error: 'modelId and rating are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Mock userId for MVP - in production, get from session
    const userId = body.userId || 'anonymous'

    // Check if user already reviewed this model
    const existing = await prisma.review.findUnique({
      where: {
        userId_modelId: { userId, modelId },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Ya has dejado una reseña para esta modelo' },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        modelId,
        userId,
        rating,
        title: title || null,
        content: content || null,
      },
      include: {
        user: { select: { name: true } },
      },
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('Reviews POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}