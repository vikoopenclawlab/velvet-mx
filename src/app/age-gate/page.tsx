import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface PageProps {
  searchParams: Promise<{ redirect?: string }>
}

export default async function AgeGatePage({ searchParams }: PageProps) {
  const params = await searchParams
  const redirectTo = params.redirect || '/'
  const encodedRedirect = encodeURIComponent(redirectTo)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D14] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#C9A96E] mb-2">Velvet MX</h1>
          <p className="text-[#F5F5F7]/60 text-sm">Plataforma premium de acompañantes</p>
        </div>

        {/* Age verification card */}
        <div className="bg-[#16162A] border border-[#C9A96E]/20 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-[#C9A96E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔞</span>
          </div>

          <h2 className="text-2xl font-serif text-[#F5F5F7] mb-4">
            Verificación de Edad
          </h2>

          <p className="text-[#F5F5F7]/70 mb-6 leading-relaxed">
            Este sitio contiene material para adultos. <br />
            <strong className="text-[#C9A96E]">Debes tener 18 años o más</strong> para acceder.
          </p>

          <div className="space-y-3">
            <form action={`/api/age/verify?redirect=${encodedRedirect}`} method="POST">
              <button
                type="submit"
                className="w-full py-4 bg-[#C9A96E] hover:bg-[#C9A96E]/90 text-[#0D0D14] font-semibold rounded-xl transition-colors"
              >
                tengo 18 años o más
              </button>
            </form>

            <a
              href="https://www.google.com"
              className="block w-full py-4 bg-transparent border border-[#F5F5F7]/20 hover:border-[#F5F5F7]/40 text-[#F5F5F7]/70 hover:text-[#F5F5F7] font-medium rounded-xl transition-colors"
            >
              tengo menos de 18 años
            </a>
          </div>
        </div>

        {/* Legal note */}
        <p className="text-center text-[#F5F5F7]/40 text-xs mt-6">
          Al continuar, confirmas que eres mayor de edad según las leyes de tu país.
          <br />
          Consulta nuestros{' '}
          <a href="/terms" className="text-[#C9A96E] hover:underline">Términos de Uso</a>
          {' '}y{' '}
          <a href="/privacy" className="text-[#C9A96E] hover:underline">Política de Privacidad</a>.
        </p>
      </div>
    </div>
  )
}