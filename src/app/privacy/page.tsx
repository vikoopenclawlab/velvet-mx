export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0D0D14] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-[#C9A96E] mb-2">Política de Privacidad</h1>
          <p className="text-[#F5F5F7]/60 text-sm">Última actualización: 27 de mayo de 2026</p>
        </div>

        {/* Content */}
        <div className="bg-[#16162A] border border-white/5 rounded-2xl p-8 space-y-6 text-[#F5F5F7]/80 text-sm leading-relaxed">
          
          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">1. Información que recopilamos</h2>
            <p className="mb-3">
              Velvet MX (&ldquo;nosotros&rdquo;, &ldquo;nostotros&rdquo;) recopila información para proporcionar y mejorar 
              nuestros servicios. Esta información incluye:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Datos de registro:</strong> nombre, correo electrónico, contraseña (encriptada)</li>
              <li><strong>Datos del perfil:</strong> fotos, biografía, ciudad, servicios ofrecidos</li>
              <li><strong>Datos de uso:</strong> páginas visitadas, reservas realizadas, favoritos</li>
              <li><strong>Datos de pago:</strong> procesamos pagos a través de Stripe (no almacenamos datos de tarjeta)</li>
              <li><strong>Datos de comunicación:</strong> mensajes entre usuarios (cifrados)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">2. Uso de la información</h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Proveer y mantener la Plataforma</li>
              <li>Procesar reservas y pagos</li>
              <li>Comunicar actualizaciones y notificaciones</li>
              <li>Mejorar la experiencia del usuario</li>
              <li>Detectar y prevenir fraudes o actividades ilegales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">3. Cookies y tracking</h2>
            <p className="mb-3">
              Utilizamos cookies y tecnologías similares para:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Mantener sesiones de usuario</li>
              <li>Recordar preferencias (idioma, ciudad)</li>
              <li>Analizar tráfico del sitio (Google Analytics)</li>
              <li>Mostrar anuncios relevantes (opcional)</li>
            </ul>
            <p className="mt-3">
              El Usuario puede desactivar las cookies en su navegador, aunque esto puede afectar 
              la funcionalidad de la Plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">4. Compartición de datos</h2>
            <p>No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Proveedores de servicios:</strong> Stripe (pagos), AWS (hosting), analytics</li>
              <li><strong>Obligaciones legales:</strong> cuando sea requerido por ley o autoridad competente</li>
              <li><strong>Protección de derechos:</strong> para proteger nuestros derechos o los de terceros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">5. Seguridad</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger 
              tus datos personales contra acceso no autorizado, alteration o destrucción.
              Sin embargo, <strong>ningún sistema es 100% seguro</strong>, por lo que no podemos 
              garantizar seguridad absoluta.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">6. Retención de datos</h2>
            <p>
              Conservamos tus datos personales mientras tengas una cuenta activa o según sea necesario 
              para proporcionar servicios. Los datos pueden conservarse por períodos más largos 
              para cumplir con obligaciones legales o resolver disputas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">7. Tus derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Acceso:</strong> solicitar una copia de tus datos personales</li>
              <li><strong>Corrección:</strong> solicitar la corrección de datos inexactos</li>
              <li><strong>Eliminación:</strong> solicitar la eliminación de tu cuenta y datos</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado</li>
              <li><strong>Objección:</strong> oponerte al procesamiento de tus datos</li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos, contacta a:{' '}
              <a href="mailto:privacy@velvetmx.com" className="text-[#C9A96E] hover:underline">
                privacy@velvetmx.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">8. Datos de menores</h2>
            <p>
              <strong>La Plataforma no está diseñada para menores de 18 años.</strong> 
              No recopilamos intencionalmente datos de menores. Si descubrimos que hemos 
              recopilado datos de un menor, eliminaremos dicha información inmediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">9. Transferencias internacionales</h2>
            <p>
              Tus datos pueden ser transferidos y procesados en servidores ubicados fuera de 
              tu país de residencia. Al utilizar la Plataforma, consientes tale transferencias.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">10. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Los cambios serán 
              notificados a través de la Plataforma o por correo electrónico. El uso continuado 
              de la Plataforma después de los cambios constituye aceptación de la nueva política.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#C9A96E] mb-3">11. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta Política de Privacidad, contacta a:{' '}
              <a href="mailto:privacy@velvetmx.com" className="text-[#C9A96E] hover:underline">
                privacy@velvetmx.com
              </a>
            </p>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <a href="/terms" className="text-[#C9A96E] hover:underline text-sm">← Términos de Uso</a>
          <a href="/contact" className="text-[#C9A96E] hover:underline text-sm">Contacto →</a>
        </div>
      </div>
    </div>
  )
}