export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-[#0D0D14] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#C9A96E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">💳</span>
          </div>
          <h1 className="text-3xl font-serif text-[#C9A96E] mb-2">Pagos</h1>
          <p className="text-[#F5F5F7]/60">
            Procesador de pagos en configuración
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-[#16162A] border border-white/5 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A96E]/10 text-[#C9A96E] rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#C9A96E] rounded-full animate-pulse"></span>
            En desarrollo
          </div>

          <h2 className="text-xl font-semibold text-[#F5F5F7] mb-4">
            Gateway de pagos en implementación
          </h2>

          <p className="text-[#F5F5F7]/70 mb-6 leading-relaxed">
            Estamos configurando un procesador de pagos adecuado para México.
            Muy pronto podrás reservar servicios de forma segura.
          </p>

          <div className="bg-[#0D0D14] rounded-xl p-4 mb-6">
            <p className="text-sm text-[#F5F5F7]/50 mb-2">Alternativas evaluadas:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Conekta', 'Kushki', 'OpenPay'].map(name => (
                <span key={name} className="px-3 py-1 bg-[#16162A] text-[#F5F5F7]/60 text-xs rounded-full">
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-[#F5F5F7]/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
              <rect width="20" height="14" x="2" y="5" rx="2"/>
              <line x1="2" x2="22" y1="10" y2="10"/>
            </svg>
            <span>Pagos seguros con SSL</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center">
          <a
            href="/models"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] hover:bg-[#C9A96E]/90 text-[#0D0D14] font-semibold rounded-xl transition-colors"
          >
            Explorar modelos
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" x2="19" y1="12" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        {/* Note */}
        <p className="text-center text-[#F5F5F7]/40 text-xs mt-8">
         stripe no disponible para plataformas de acompañantes en México.
          <br/>
          Contáctanos para opciones de reserva directa.
        </p>
      </div>
    </div>
  )
}