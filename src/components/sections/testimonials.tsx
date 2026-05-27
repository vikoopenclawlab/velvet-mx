import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/seed-data";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export function Testimonials() {
  if (!TESTIMONIALS?.length) return null;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Experiencias reales de miembros que han vivido momentos inolvidables
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <Card key={i} className="p-6 border-white/10 bg-surface/50">
              <Quote className="h-8 w-8 text-secondary/30 mb-4" />
              <p className="text-white/80 leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-semibold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="font-medium text-white">{testimonial.name}</div>
                  <div className="text-sm text-white/50">{testimonial.city}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
