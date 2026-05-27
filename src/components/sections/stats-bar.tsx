export function StatsBar() {
  const stats = [
    { value: "247", label: "modelos activas" },
    { value: "10", label: "ciudades" },
    { value: "1,847", label: "reservas este mes" },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-secondary">
                {stat.value}
              </div>
              <div className="text-white/60 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
