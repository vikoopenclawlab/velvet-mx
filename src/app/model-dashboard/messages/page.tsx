"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, User } from "lucide-react";

const DEMO_MESSAGES = [
  { id: "1", name: "Carlos M.", lastMessage: "Hola, me gustaría agendar una cita...", time: "Hace 2h", unread: true },
  { id: "2", name: "Roberto K.", lastMessage: "La experiencia fue increíble...", time: "Ayer", unread: false },
  { id: "3", name: "Miguel A.", lastMessage: "¿Estás disponible el próximo viernes?", time: "Hace 2 días", unread: false },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-white mb-8">Mensajes</h1>

        <Card className="border-white/10 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[500px]">
            {/* Contacts List */}
            <div className="border-r border-white/5 overflow-y-auto">
              {DEMO_MESSAGES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-colors text-left ${selected === m.id ? "bg-white/5" : ""}`}
                >
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white flex items-center gap-2">
                      {m.name}
                      {m.unread && <span className="w-2 h-2 rounded-full bg-secondary" />}
                    </p>
                    <p className="text-sm text-white/50 truncate">{m.lastMessage}</p>
                  </div>
                  <span className="text-xs text-white/30 shrink-0">{m.time}</span>
                </button>
              ))}
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col">
              {selected ? (
                <>
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <p className="font-medium text-white">
                      {DEMO_MESSAGES.find((m) => m.id === selected)?.name}
                    </p>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-primary rounded-lg p-3 max-w-[70%]">
                        <p className="text-white/80">Hola, ¿estás disponible esta noche?</p>
                        <p className="text-xs text-white/30 mt-1">10:30 PM</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-secondary/20 rounded-lg p-3 max-w-[70%]">
                        <p className="text-white/80">Sí, ¿a qué hora?</p>
                        <p className="text-xs text-white/30 mt-1">10:32 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-white/5 flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="flex-1"
                    />
                    <button className="p-3 rounded-lg bg-secondary text-primary hover:bg-secondary/90 transition-colors">
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <MessageCircle className="h-12 w-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/50">Selecciona una conversación</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
