'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Send, MessageCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type Message = {
  id: string
  senderId: string
  receiverId: string
  modelId: string
  content: string
  read: boolean
  createdAt: string
}

export default function ChatPage({ params }: { params: { modelId: string } }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [connected, setConnected] = useState(false)
  const [modelName, setModelName] = useState('Tu acompañante')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Load initial messages
  useEffect(() => {
    fetch(`/api/chat/messages?modelId=${params.modelId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data)
      })
      .catch(console.error)
  }, [params.modelId])

  // Connect to SSE for real-time updates
  useEffect(() => {
    const userId = 'anonymous'
    const url = `/api/chat?modelId=${params.modelId}`

    const eventSource = new EventSource(url, {
      // EventSource doesn't support custom headers, so we pass userId as query param
    } as EventSourceInit)

    eventSourceRef.current = eventSource

    eventSource.onopen = () => setConnected(true)

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'message') {
          setMessages(prev => [...prev, data.message])
          scrollToBottom()
        }
      } catch {
        // Ignore parse errors (heartbeats)
      }
    }

    eventSource.onerror = () => {
      setConnected(false)
      eventSource.close()
      // Reconnect after 5 seconds
      setTimeout(() => {
        if (!eventSourceRef.current) {
          // Will be re-created by this effect
        }
      }, 5000)
    }

    return () => {
      eventSource.close()
      eventSourceRef.current = null
    }
  }, [params.modelId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return

    setSending(true)
    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelId: params.modelId,
          receiverId: 'model-' + params.modelId,
          content: newMessage.trim(),
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessages(prev => [...prev, data])
        setNewMessage('')
        scrollToBottom()
      }
    } catch (err) {
      console.error('Send error:', err)
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--primary)' }}>
      {/* Header */}
      <div className="border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <Link href={`/models/${params.modelId}`}>
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold overflow-hidden">
          <Image src={`https://picsum.photos/seed/${params.modelId}/100/100`} alt={modelName} width={40} height={40} className="object-cover" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white">{modelName}</p>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-white/30'}`} />
            <span className="text-xs text-white/50">{connected ? 'En línea' : 'Conectando...'}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-white/60">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">Aún no hay mensajes</p>
            <p className="text-white/30 text-sm mt-1">Inicia la conversación</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMine = msg.senderId === 'anonymous'
            return (
              <div
                key={msg.id}
                className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    isMine
                      ? 'bg-secondary text-white rounded-br-md'
                      : 'bg-white/10 text-white rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-xs mt-1 ${isMine ? 'text-white/50' : 'text-white/30'} text-right`}>
                    {new Date(msg.createdAt).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-4">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje..."
            className="flex-1"
            disabled={sending}
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className="glow-gold"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-white/30 mt-2 text-center">
          Los mensajes son privados y confidenciales
        </p>
      </div>
    </div>
  )
}