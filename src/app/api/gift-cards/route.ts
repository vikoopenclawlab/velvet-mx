import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get gift card by code or user's gift cards
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const userId = request.headers.get('x-user-id') || 'anonymous'

    if (code) {
      // Lookup by code (public - for checking balance)
      const giftCard = await prisma.giftCard.findUnique({
        where: { code: code.toUpperCase() },
      })

      if (!giftCard) {
        return NextResponse.json({ error: 'Gift card not found' }, { status: 404 })
      }

      // Don't expose full gift card details
      return NextResponse.json({
        code: giftCard.code,
        balance: giftCard.balance,
        amount: giftCard.amount,
        expiresAt: giftCard.expiresAt,
        active: giftCard.active,
      })
    }

    // Get all gift cards for user
    const giftCards = await prisma.giftCard.findMany({
      where: { clientId: userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(giftCards)
  } catch (error) {
    console.error('GiftCards GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a new gift card (purchase)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, recipientEmail, recipientName, message } = body

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: 'Minimum gift card amount is $100 MXN' },
        { status: 400 }
      )
    }

    // Generate unique code
    const code = generateGiftCardCode()

    // Expire in 1 year
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    const giftCard = await prisma.giftCard.create({
      data: {
        code,
        amount,
        balance: amount,
        expiresAt,
        active: true,
        // recipientEmail and recipientName stored in a separate table in production
        // For MVP, we just track the purchaser
      },
    })

    return NextResponse.json({
      id: giftCard.id,
      code: giftCard.code,
      amount: giftCard.amount,
      balance: giftCard.balance,
      expiresAt: giftCard.expiresAt,
      message: 'Gift card created successfully. Share the code with the recipient.',
    }, { status: 201 })
  } catch (error) {
    console.error('GiftCards POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH - Redeem a gift card (apply to booking)
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { code, amount, bookingId } = body

    if (!code || !amount) {
      return NextResponse.json(
        { error: 'code and amount required' },
        { status: 400 }
      )
    }

    const giftCard = await prisma.giftCard.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (!giftCard) {
      return NextResponse.json({ error: 'Gift card not found' }, { status: 404 })
    }

    if (!giftCard.active) {
      return NextResponse.json({ error: 'Gift card is no longer active' }, { status: 400 })
    }

    if (new Date() > giftCard.expiresAt) {
      return NextResponse.json({ error: 'Gift card has expired' }, { status: 400 })
    }

    if (giftCard.balance < amount) {
      return NextResponse.json(
        { error: `Insufficient balance. Available: $${giftCard.balance}` },
        { status: 400 }
      )
    }

    // Redeem the amount
    const updated = await prisma.giftCard.update({
      where: { id: giftCard.id },
      data: {
        balance: Number(giftCard.balance) - Number(amount),
        // If balance is 0, deactivate
        active: Number(giftCard.balance) - Number(amount) > 0,
      },
    })

    return NextResponse.json({
      success: true,
      newBalance: updated.balance,
      amountRedeemed: amount,
      bookingId: bookingId || null,
    })
  } catch (error) {
    console.error('GiftCards PATCH error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateGiftCardCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'VM-'
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) code += '-'
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}