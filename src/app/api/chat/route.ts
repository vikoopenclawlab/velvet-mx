import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// SSE endpoint for real-time message streaming
// Client connects to this endpoint and receives new messages via Server-Sent Events

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const modelId = searchParams.get('modelId')
  const userId = request.headers.get('x-user-id') || 'anonymous'

  if (!modelId) {
    return NextResponse.json({ error: 'modelId required' }, { status: 400 })
  }

  // Set up SSE response
  const encoder = new TextEncoder()
  let isClosed = false

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial connection event
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`))

      // Poll for new messages every 3 seconds
      let lastMessageTime = new Date()

      const interval = setInterval(async () => {
        if (isClosed) {
          clearInterval(interval)
          return
        }

        try {
          // Get new messages since last check
          const newMessages = await prisma.message.findMany({
            where: {
              modelId,
              receiverId: userId,
              createdAt: { gt: lastMessageTime },
              read: false,
            },
            orderBy: { createdAt: 'asc' },
          })

          if (newMessages.length > 0) {
            for (const msg of newMessages) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type: 'message', message: msg })}\n\n`)
              )
            }
            lastMessageTime = new Date()
          }

          // Send heartbeat to keep connection alive
          controller.enqueue(encoder.encode(`: heartbeat\n\n`))
        } catch (err) {
          console.error('SSE poll error:', err)
        }
      }, 3000)

      // Clean up on close
      request.signal.addEventListener('abort', () => {
        isClosed = true
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering if behind proxy
    },
  })
}