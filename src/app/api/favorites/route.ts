import { NextResponse } from 'next/server'

// Mock favorites data for MVP
// In production, this would use the Favorite model in the database
let mockFavorites: string[] = [] // Array of model IDs

// GET - Get user's favorites (model IDs)
export async function GET() {
  try {
    // In production, get userId from session
    // const userId = session.user.id
    // const favorites = await prisma.favorite.findMany({ where: { userId }, select: { modelId: true } })
    // return NextResponse.json(favorites.map(f => f.modelId))

    return NextResponse.json(mockFavorites)
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

    // In production:
    // const userId = session.user.id
    // await prisma.favorite.create({ data: { userId, modelId } })

    if (!mockFavorites.includes(modelId)) {
      mockFavorites.push(modelId)
    }

    return NextResponse.json({ success: true, favorites: mockFavorites }, { status: 201 })
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

    // In production:
    // const userId = session.user.id
    // await prisma.favorite.deleteMany({ where: { userId, modelId } })

    mockFavorites = mockFavorites.filter(id => id !== modelId)

    return NextResponse.json({ success: true, favorites: mockFavorites })
  } catch (error) {
    console.error('Favorites DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}