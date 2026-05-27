import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Shield, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Experiencias - Velvet MX",
  description: "Descubre experiencias únicas con nuestras modelos.",
};

const FEATURES = [
  {
    icon: CheckCircle2,
    title: "Elegancia",
    description: "Cada encuentro está lleno de sophistication y buen gusto.",
  },
  {
    icon: Clock,
    title: "Flexibilidad",
    description: "Reserva cuando quieras, adapta las citas a tu agenda.",
  },
  {
    icon: Shield,
    title: "Seguridad",
    description: "Tu privacidad es nuestra prioridad absoluta.",
  },
  {
    icon: Star,
    title: "Excelencia",
    description: "Las mejores experiencias de México te esperan.",
  },
];

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Experiencias Únicas
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Descubre momentos inolvidables diseñadas para ti
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FEATURES.map((feature, i) => (
            <Card key={i} className="border-white/10 bg-surface/50">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Experience Types */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white text-center mb-8">
            Tipos de Experiencias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Citas de Companía",
                description: "Acompañamiento elegante para eventos sociales, cenas, y reuniones de negocios.",
                price: "Desde $1,500 MXN",
              },
              {
                title: "Encuentros Privados",
                description: "Momentos íntimos en privacidad total,consentimiento mutuo.",
                price: "Desde $2,000 MXN",
              },
              {
                title: "旅途acompanamiento",
                description: "Viajes de fin de semana o长假 con companía excepcional.",
                price: "Desde $5,000 MXN",
              },
            ].map((exp, i) => (
              <Card key={i} className="border-white/10 bg-surface/50">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    {exp.description}
                  </p>
                  <p className="text-secondary font-semibold">{exp.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/models">
            <Button size="lg" className="glow-gold">
              Explorar Modelos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
