import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_CONSTANTS } from "@/lib/constants";
import { ArrowRight, Shield, Clock, Heart } from "lucide-react";

const BENEFITS = [
  {
    icon: Shield,
    title: "Verificadas",
    description: "Todas nuestras Models pasan un proceso de verificación riguroso para garantizar autenticidad y seguridad.",
  },
  {
    icon: Clock,
    title: "Disponibles 24/7",
    description: "Reserva cuando quieras. Nuestro equipo está disponible las 24 horas para asistirte.",
  },
  {
    icon: Heart,
    title: "Experiencias Únicas",
    description: "Cada encuentro es especial. Nos aseguramos de que cada momento sea inolvidable.",
  },
];

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {BENEFITS.map((benefit, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-white/50">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          ¿Listo para comenzar?
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Únete a miles de clientes satisfechos en todo México.
          Tu próxima experiencia te está esperando.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="glow-gold min-w-[200px] group">
              Crear Cuenta
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/models">
            <Button size="lg" variant="outline">
              Explorar sin Registrarte
            </Button>
          </Link>
        </div>

        <p className="text-xs text-white/30 mt-8">
          Velvet MX • {APP_CONSTANTS.tagline} • +18 Only
        </p>
      </div>
    </section>
  );
}
