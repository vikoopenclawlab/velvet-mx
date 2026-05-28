import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get user's favorites (model IDs with full data)
export async function GET(request: Request) {
  try {
    // Mock userId for MVP - in production, get from session
    const userId = request.headers.get('x-user-id') || 'anonymous'

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        model: {
          select: {
            id: true,
            name: true,
            tagline: true,
            age: true,
            type: true,
            mainPhoto: true,
            city: { select: { name: true } },
            rating: true,
            reviewCount: true,
            verified: true,
            services: {
              where: { active: true },
              take: 1,
              select: { price: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(favorites.map(f => f.model))
  } catch (error) {
    console.error('Favorites GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Add model to favorites
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { modelId } = body

    if (!modelId) {
      return NextResponse.json({ error: 'modelId required' }, { status: 400 })
    }

    // Mock userId for MVP - in production, get from session
    const userId = body.userId || 'anonymous'

    // Check if model exists
    const model = await prisma.model.findUnique({ where: { id: modelId } })
    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_modelId: { userId, modelId },
      },
    })

    if (existing) {
      return NextResponse.json({ error: 'Already in favorites' }, { status: 400 })
    }

    await prisma.favorite.create({
      data: { userId, modelId },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Favorites POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Remove model from favorites
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get('modelId')

    if (!modelId) {
      return NextResponse.json({ error: 'modelId required' }, { status: 400 })
    }

    // Mock userId for MVP - in production, get from session
    const userId = request.headers.get('x-user-id') || 'anonymous'

    await prisma.favorite.deleteMany({
      where: { userId, modelId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Favorites DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}