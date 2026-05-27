import { NextResponse } from 'next/server'

// Mock reviews data for MVP
// In production, this would use Prisma to query the Review model
const mockReviews = [
  {
    id: 'rev-1',
    modelId: 'model-001',
    userId: 'user-1',
    userName: 'Carlos M.',
    rating: 5,
    title: 'Increíble experiencia',
    content: 'Valentina es extremadamente profesional y discretta. La cita fue perfecta desde start hasta finish.',
    createdAt: '2026-05-20T10:00:00Z',
  },
  {
    id: 'rev-2',
    modelId: 'model-001',
    userId: 'user-2',
    userName: 'Roberto D.',
    rating: 5,
    title: 'Muy recommendada',
    content: 'La mejor experiencia que he tenido. Elegante, inteligente y muy atractiva.',
    createdAt: '2026-05-15T14:30:00Z',
  },
  {
    id: 'rev-3',
    modelId: 'model-001',
    userId: 'user-3',
    userName: 'Miguel A.',
    rating: 4,
    title: 'Excelente',
    content: 'Muy buen servicio, la recomiendo totalmente.',
    createdAt: '2026-05-10T09:00:00Z',
  },
]

// GET - Get reviews for a model
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get('modelId')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!modelId) {
      return NextResponse.json({ error: 'modelId required' }, { status: 400 })
    }

    // Filter reviews for the given model
    const reviews = mockReviews
      .filter(r => r.modelId === modelId)
      .slice(0, limit)

    // Calculate average rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

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

    // In production, this would create a Review record in the database
    // For MVP, we just return a mock response
    const newReview = {
      id: `rev-${Date.now()}`,
      modelId,
      userId: 'user-mock', // Would come from session
      userName: 'Usuario', // Would come from session
      rating,
      title: title || null,
      content: content || null,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error('Reviews POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}