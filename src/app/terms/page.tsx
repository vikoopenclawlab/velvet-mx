export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0D0D14] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-[#C9A96E] mb-2">Términos de Uso</h1>
          <p className="text-[#F5F5F7]/60 text-sm">Última actualización: 27 de mayo de 2026</p>
        </div>

        {/* Content */}
        <div className="bg-[#16162A] border border-white/5 rounded-2xl p-8 space-y-6 text-[#F5F5F7]/80 text-sm leading-relaxed">
          
          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">1. Aceptación de los términos</h2>
            <p>
              Al acceder y utilizar Velvet MX (&ldquo;la Plataforma&rdquo;), usted (&ldquo;el Usuario&rdquo;) acepta 
              estar sujeto a estos Términos de Uso (&ldquo;Términos&rdquo;). Si no está de acuerdo con estos Términos, 
              no debe utilizar la Plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">2. Requisitos de edad</h2>
            <p>
              La Plataforma está diseñada exclusivamente para personas mayores de 18 años. 
              <strong className="text-[#C9A96E]"> Es estrictamente prohibido</strong> el acceso a menores de edad. 
              Al utilizar la Plataforma, usted declara y garantiza ser mayor de 18 años.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">3. Naturaleza del servicio</h2>
            <p>
              Velvet MX es un <strong>intermediario tecnológico</strong> que facilita la conexión entre 
              usuarios que buscan compañía y modelos que ofrecen servicios de acompañamiento. 
              Velvet MX <strong>no es parte de</strong>, no organiza, no gestiona ni es responsable de 
              ninguna transacción, encuentro o relación entre los usuarios.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">4. Restricciones de uso</h2>
            <p>El Usuario se compromete a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>No utilizar la Plataforma para fines ilegales o no autorizados</li>
              <li>No realizar amenazas, acoso, intimidación o discriminación</li>
              <li>No publicar contenido falso, engañoso o difamatorio</li>
              <li>No solicitar servicios fuera de la Plataforma para evadir pagos</li>
              <li>Respetar la privacidad y seguridad de los demás usuarios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">5. Responsabilidad</h2>
            <p>
              Velvet MX no garantiza la calidad, seguridad ni legalidad de los servicios ofrecidos 
              por los modelos. <strong>Los encuentros son arrangements independientes</strong> entre 
              adultos consentingientes. Velvet MX no será responsable de daños directos, indirectos 
              o consecuentes derivados del uso de la Plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">6. Content & Intellectual Property</h2>
            <p>
              Todo el contenido publicado en la Plataforma (fotos, textos, perfiles) es propiedad 
              de sus respectivos dueños. El Usuario no puede copiar, distribuir o utilizar dicho 
              contenido sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">7. Terminación</h2>
            <p>
              Velvet MX se reserva el derecho de suspender o terminating cuentas que violen estos 
              Términos, sin previo aviso y sin derecho a compensación.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">8. Modificaciones</h2>
            <p>
              Velvet MX puede modificar estos Términos en cualquier momento. Los cambios serán 
              efectivos inmediatamente después de su publicación. El uso continuado de la 
              Plataforma constituye aceptación de los nuevos Términos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">9. Ley aplicable</h2>
            <p>
              Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. 
              Cualquier controversia será resuelta en los tribunales competentes de la 
              Ciudad de México.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">10. Contacto</h2>
            <p>
              Para preguntas sobre estos Términos, contacta a:{' '}
              <a href="mailto:legal@velvetmx.com" className="text-[#C9A96E] hover:underline">
                legal@velvetmx.com
              </a>
            </p>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <a href="/" className="text-[#C9A96E] hover:underline text-sm">← Volver al inicio</a>
          <a href="/privacy" className="text-[#C9A96E] hover:underline text-sm">Política de Privacidad →</a>
        </div>
      </div>
    </div>
  )
}