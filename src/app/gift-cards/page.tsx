'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Gift, Plus, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react'

type GiftCard = {
  id: string
  code: string
  amount: number
  balance: number
  expiresAt: string
  active: boolean
}

const mockMyGiftCards: GiftCard[] = []

export default function GiftCardsPage() {
  const [checkCode, setCheckCode] = useState('')
  const [checkResult, setCheckResult] = useState<GiftCard | null>(null)
  const [checkError, setCheckError] = useState('')
  const [myCards, setMyCards] = useState<GiftCard[]>(mockMyGiftCards)

  // Purchase form
  const [purchaseAmount, setPurchaseAmount] = useState('')
  const [purchasing, setPurchasing] = useState(false)
  const [purchasedCard, setPurchasedCard] = useState<GiftCard | null>(null)

  const handleCheck = async () => {
    if (!checkCode.trim()) return
    setCheckError('')
    setCheckResult(null)

    try {
      const res = await fetch(`/api/gift-cards?code=${encodeURIComponent(checkCode)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error checking gift card')
      setCheckResult(data)
    } catch (err: any) {
      setCheckError(err.message)
    }
  }

  const handlePurchase = async () => {
    const amount = parseInt(purchaseAmount)
    if (!amount || amount < 100) return
    setPurchasing(true)

    try {
      const res = await fetch('/api/gift-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setPurchasedCard(data)
      setMyCards(prev => [...prev, data])
      setPurchaseAmount('')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Gift className="h-8 w-8 text-secondary" />
          <h1 className="font-display text-3xl font-bold text-white">Gift Cards</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Check Balance */}
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Search className="h-5 w-5 text-secondary" />
                Consultar Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={checkCode}
                onChange={(e) => setCheckCode(e.target.value.toUpperCase())}
                placeholder="Código (ej: VM-XXXX-XXXX-XXXX)"
                className="font-mono"
              />
              <Button onClick={handleCheck} className="w-full" disabled={!checkCode.trim()}>
                Consultar
              </Button>

              {checkResult && (
                <div className="mt-4 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-secondary font-bold text-lg">{checkResult.code}</span>
                    <Badge className={checkResult.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                      {checkResult.active ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Valor nominal</span>
                      <span className="text-white font-semibold">${checkResult.amount} MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Balance disponible</span>
                      <span className="text-secondary font-bold">${checkResult.balance} MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Caduca</span>
                      <span className="text-white/60">{new Date(checkResult.expiresAt).toLocaleDateString('es-MX')}</span>
                    </div>
                  </div>
                </div>
              )}

              {checkError && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{checkError}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Purchase Gift Card */}
          <Card className="border-white/10">
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Plus className="h-5 w-5 text-secondary" />
                Comprar Gift Card
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {purchasedCard ? (
                <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="flex items-center gap-2 text-green-400 mb-3">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">¡Gift Card creada!</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-white/50 mb-1">Código de regalo</p>
                    <p className="font-mono text-2xl font-bold text-secondary">{purchasedCard.code}</p>
                  </div>
                  <div className="mt-3 text-center text-sm text-white/60">
                    Valor: <span className="text-white font-semibold">${purchasedCard.amount} MXN</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setPurchasedCard(null)}
                  >
                    Comprar otra
                  </Button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm text-white/60 mb-2 block">Monto (MXN)</label>
                    <Input
                      type="number"
                      min="100"
                      step="50"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(e.target.value)}
                      placeholder="Ej: 500"
                    />
                    <p className="text-xs text-white/40 mt-1">Mínimo $100 MXN</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[250, 500, 1000].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setPurchaseAmount(amount.toString())}
                        className="py-2 rounded-lg border border-white/10 text-sm text-white/70 hover:border-secondary/50 hover:text-secondary transition-colors"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={handlePurchase}
                    disabled={!purchaseAmount || parseInt(purchaseAmount) < 100 || purchasing}
                    className="w-full glow-gold"
                  >
                    {purchasing ? 'Creando...' : 'Crear Gift Card'}
                  </Button>
                  <p className="text-xs text-white/40 text-center">
                    Payment gateway no configurado — simulation only
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* My Gift Cards */}
        {myCards.length > 0 && (
          <Card className="border-white/10 mt-6">
            <CardHeader>
              <CardTitle className="font-display text-xl">Mis Gift Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myCards.map(card => (
                  <div key={card.id} className="flex items-center justify-between p-3 bg-primary rounded-lg border border-white/5">
                    <div>
                      <p className="font-mono text-secondary font-semibold">{card.code}</p>
                      <p className="text-xs text-white/50">Expira: {new Date(card.expiresAt).toLocaleDateString('es-MX')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-secondary font-bold">${card.balance} MXN</p>
                      <p className="text-xs text-white/40">de ${card.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info */}
        <Card className="border-white/5 bg-transparent mt-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-white/30 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-white/40">
                <p><strong className="text-white/60">¿Cómo funciona?</strong></p>
                <p className="mt-1">Compra una gift card para ti o para regalar. Comparte el código con la acompañante selected al momento de hacer tu reservación. El balance se descuenta automáticamente del total.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}