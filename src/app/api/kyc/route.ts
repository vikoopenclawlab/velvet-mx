import { NextResponse } from 'next/server'

// KYC API - handles Know Your Customer verification for models
// Note: Requires database migration to add KYC fields to Model model

// GET - Get KYC status for a model
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get('modelId')

    if (!modelId) {
      return NextResponse.json({ error: 'Model ID required' }, { status: 400 })
    }

    // Mock response for MVP - replace with actual DB query after migration
    return NextResponse.json({
      kycStatus: 'NOT_SUBMITTED',
      kycSubmittedAt: null,
      kycVerifiedAt: null,
      kycRejectedReason: null,
      verified: false,
    })
  } catch (error) {
    console.error('KYC GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Submit KYC documents
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { modelId, ineFrontUrl, ineBackUrl, selfieUrl } = body

    if (!modelId || !ineFrontUrl || !ineBackUrl || !selfieUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: modelId, ineFrontUrl, ineBackUrl, selfieUrl' },
        { status: 400 }
      )
    }

    // Mock response for MVP - replace with actual DB update after migration
    // In production:
    // const updated = await prisma.model.update({
    //   where: { id: modelId },
    //   data: {
    //     kycStatus: 'SUBMITTED',
    //     kycSubmittedAt: new Date(),
    //     ineFrontUrl,
    //     ineBackUrl,
    //     selfieUrl,
    //   },
    // })

    return NextResponse.json({
      success: true,
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('KYC POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH - Admin approves or rejects KYC
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { modelId, action, rejectedReason } = body

    if (!modelId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: modelId, action' },
        { status: 400 }
      )
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Action must be "approve" or "reject"' },
        { status: 400 }
      )
    }

    // Mock response for MVP - replace with actual DB update after migration
    // In production:
    // if (action === 'approve') {
    //   await prisma.model.update({
    //     where: { id: modelId },
    //     data: { kycStatus: 'APPROVED', verified: true, kycVerifiedAt: new Date() },
    //   })
    // } else {
    //   await prisma.model.update({
    //     where: { id: modelId },
    //     data: { kycStatus: 'REJECTED', kycRejectedReason: rejectedReason },
    //   })
    // }

    return NextResponse.json({
      success: true,
      status: action === 'approve' ? 'APPROVED' : 'REJECTED',
      verified: action === 'approve',
    })
  } catch (error) {
    console.error('KYC PATCH error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}