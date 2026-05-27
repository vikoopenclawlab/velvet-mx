"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, Upload, Camera } from "lucide-react";

export default function ModelSettingsPage() {
  const [name, setName] = useState("Valentina Noir");
  const [email, setEmail] = useState("valentina@velvetmx.com");
  const [phone, setPhone] = useState("+52 55 1234 5678");
  const [bio, setBio] = useState("Soy una persona apasionada por el arte de la compañía...");

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-white mb-8">Configuración</h1>

        {/* Profile */}
        <Card className="border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="font-display text-xl">Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-3xl font-display font-bold">
                V
              </div>
              <button className="text-sm text-secondary hover:text-secondary/80 flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Cambiar foto
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white/60 mb-2 block">Nombre</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-white/60 mb-2 block">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white/60 mb-2 block">Teléfono</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-medium text-white/60 mb-2 block">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full bg-primary border border-white/10 rounded-lg px-4 py-3 text-sm text-white resize-none focus:border-secondary/50 focus:outline-none"
              />
            </div>

            <Button className="glow-gold">
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </CardContent>
        </Card>

        {/* Password */}
        <Card className="border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="font-display text-xl">Contraseña</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/60 mb-2 block">Nueva contraseña</label>
              <Input type="password" placeholder="Mínimo 8 caracteres" />
            </div>
            <div>
              <label className="text-sm font-medium text-white/60 mb-2 block">Confirmar contraseña</label>
              <Input type="password" placeholder="Repite la nueva contraseña" />
            </div>
            <Button variant="secondary">Actualizar Contraseña</Button>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card className="border-secondary/20 bg-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Estado de Verificación</h3>
                <p className="text-sm text-white/50 mt-1">Tu cuenta está verificada</p>
              </div>
              <Badge variant="accent">Verificada ✓</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
