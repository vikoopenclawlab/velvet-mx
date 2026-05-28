import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get messages for a conversation (modelId + userId)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get('modelId')
    const otherUserId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Mock current user for MVP
    const currentUserId = request.headers.get('x-user-id') || 'anonymous'

    if (!modelId) {
      return NextResponse.json({ error: 'modelId required' }, { status: 400 })
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUserId, receiverId: otherUserId || currentUserId, modelId },
          { senderId: otherUserId || currentUserId, receiverId: currentUserId, modelId },
        ],
      },
      orderBy: { createdAt: 'asc' },
      take: limit,
    })

    // Mark unread messages as read
    await prisma.message.updateMany({
      where: {
        receiverId: currentUserId,
        senderId: otherUserId || currentUserId,
        modelId,
        read: false,
      },
      data: { read: true },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Messages GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Send a message
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { modelId, receiverId, content } = body

    if (!modelId || !receiverId || !content) {
      return NextResponse.json(
        { error: 'modelId, receiverId, and content are required' },
        { status: 400 }
      )
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long (max 1000 characters)' },
        { status: 400 }
      )
    }

    // Mock sender for MVP
    const senderId = body.senderId || 'anonymous'

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        modelId,
        content: content.trim(),
      },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Messages POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}