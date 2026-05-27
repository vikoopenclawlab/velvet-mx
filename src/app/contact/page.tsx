"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { contactSchema, type ContactInput } from "@/lib/validations";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    // Demo - just show success
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Contáctanos
          </h1>
          <p className="text-xl text-white/60">
            Estamos aquí para ayudarte
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="font-display text-xl">Envianos un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="font-display text-xl text-white mb-2">Mensaje Enviado</h3>
                  <p className="text-white/50">Te responderemos pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2 block">Nombre</label>
                    <Input {...register("name")} placeholder="Tu nombre" />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2 block">Email</label>
                    <Input type="email" {...register("email")} placeholder="tu@email.com" />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2 block">Asunto</label>
                    <Input {...register("subject")} placeholder="¿En qué podemos ayudarte?" />
                    {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2 block">Mensaje</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full bg-primary border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 resize-none focus:border-secondary/50 focus:outline-none"
                      placeholder="Tu mensaje..."
                    />
                    {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full glow-gold">
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-white/10">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-white/50">contacto@velvetmx.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Teléfono</h3>
                  <p className="text-white/50">+52 800 VELVET MX</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Ubicación</h3>
                  <p className="text-white/50">Ciudad de México, México</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-secondary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-2">Horario de Atención</h3>
                <p className="text-white/50 text-sm">Lunes a Viernes: 9:00 AM - 9:00 PM</p>
                <p className="text-white/50 text-sm">Fines de semana: 10:00 AM - 6:00 PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
