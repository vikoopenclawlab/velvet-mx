import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { APP_CONSTANTS } from "@/lib/constants";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-background to-background" />
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://picsum.photos/seed/velvet-hero/1920/1080"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm mb-8 animate-fade-in">
          <Sparkles className="h-4 w-4" />
          <span>Plataforma Premium de Acompañantes</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 animate-slide-up">
          Experiencias que{" "}
          <span className="gradient-text">seducen</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "100ms" }}>
          Conexiones auténticas en las principales ciudades de México.
          Belleza, elegancia y momentos inolvidables te esperan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <Link href="/models">
            <Button size="lg" className="glow-gold min-w-[200px] group">
              Explorar Modelos
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="secondary">
              Conoce Velvet MX
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-secondary" />
        </div>
      </div>
    </section>
  );
}
