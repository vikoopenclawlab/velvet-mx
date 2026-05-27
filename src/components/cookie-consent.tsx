'use client'

import { useState, useEffect } from 'react'
import { APP_CONSTANTS } from '@/lib/constants'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consented = document.cookie.includes('cookie_consent=true')
    if (!consented) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    document.cookie = `cookie_consent=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    setVisible(false)
  }

  const handleDecline = () => {
    document.cookie = `cookie_consent=false; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#16162A] border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-[#F5F5F7]/80">
            Utilizamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra{' '}
            <a href="/privacy" className="text-[#C9A96E] hover:underline">Política de Privacidad</a>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm text-[#F5F5F7]/60 hover:text-[#F5F5F7] transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-[#C9A96E] hover:bg-[#C9A96E]/90 text-[#0D0D14] text-sm font-semibold rounded-lg transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}