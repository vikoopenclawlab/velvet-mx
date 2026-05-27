import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nosotros - Velvet MX",
  description: "Conoce la historia detrás de Velvet MX.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre <span className="gradient-text">Velvet MX</span>
          </h1>
          <p className="text-xl text-white/60">
            redefiniendo la elegancia y la companionship en México
          </p>
        </div>

        {/* Story */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Nuestra Historia</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/70 leading-relaxed mb-4">
              Velvet MX nació de una visión clara: crear la plataforma de companionship más elegante y confiable de México.
              Entendemos que detrás de cada encuentro hay personas buscando conexión, experiencias únicas,y momentos inolvidables.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              Seleccionamos rigurosamente a cada una de nuestras modelos, asegurando que cada encuentro sea exceptional.
              Desde CDMX hasta Guadalajara, Mérida,y más de 10 ciudades, Velvet MX conecta personas con acompañantes que
              realmente entienden el arte de la compañía.
            </p>
            <p className="text-white/70 leading-relaxed">
              Somos [+18]. Valoramos la privacidad, el consentimiento mutuo,y la discrección absoluta.
              Tu experiencia es nuestra prioridad.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: "Privacidad", text: "Tu información y encuentros son completamente confidenciales." },
              { icon: Heart, title: "Consentimiento", text: "Respeto absoluto y consentimiento mutuo en cada interacción." },
              { icon: Users, title: "Comunidad", text: "Construimos una comunidad de profesionales y clientes excepcionales." },
              { icon: Award, title: "Excelencia", text: "Solo trabajamos con las mejores modelos de México." },
            ].map((val, i) => (
              <Card key={i} className="border-white/10">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <val.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{val.title}</h3>
                    <p className="text-sm text-white/50">{val.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="font-display text-2xl font-bold text-white mb-6">El Equipo</h2>
          <p className="text-white/70 mb-8">
            Un equipo apasionado dedicado a crear las mejores experiencias de companionship en México.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Ana G.", "Carlos R.", "Maria L."].map((name, i) => (
              <Card key={i} className="border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 text-secondary font-display text-2xl font-bold">
                    {name[0]}
                  </div>
                  <h3 className="font-semibold text-white">{name}</h3>
                  <p className="text-sm text-secondary/80">Miembro del equipo</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
