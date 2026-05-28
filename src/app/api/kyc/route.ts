import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get KYC status for a model
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const modelId = searchParams.get('modelId')

    if (!modelId) {
      return NextResponse.json({ error: 'Model ID required' }, { status: 400 })
    }

    const model = await prisma.model.findUnique({
      where: { id: modelId },
      select: {
        kycStatus: true,
        kycSubmittedAt: true,
        kycVerifiedAt: true,
        kycRejectedReason: true,
        verified: true,
        ineFrontUrl: true,
        ineBackUrl: true,
        selfieUrl: true,
      }
    })

    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    return NextResponse.json(model)
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

    const model = await prisma.model.findUnique({
      where: { id: modelId },
    })

    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    if (model.kycStatus === 'SUBMITTED' || model.kycStatus === 'APPROVED') {
      return NextResponse.json(
        { error: 'KYC already submitted or approved' },
        { status: 400 }
      )
    }

    const updated = await prisma.model.update({
      where: { id: modelId },
      data: {
        kycStatus: 'SUBMITTED',
        kycSubmittedAt: new Date(),
        ineFrontUrl,
        ineBackUrl,
        selfieUrl,
      },
    })

    return NextResponse.json({
      success: true,
      status: updated.kycStatus,
      submittedAt: updated.kycSubmittedAt,
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

    const model = await prisma.model.findUnique({
      where: { id: modelId },
    })

    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }

    if (model.kycStatus !== 'SUBMITTED') {
      return NextResponse.json(
        { error: 'KYC is not in SUBMITTED status' },
        { status: 400 }
      )
    }

    let updateData: any = {}

    if (action === 'approve') {
      updateData = {
        kycStatus: 'APPROVED',
        kycVerifiedAt: new Date(),
        verified: true,
        verifiedAt: new Date(),
        kycRejectedReason: null,
      }
    } else {
      updateData = {
        kycStatus: 'REJECTED',
        kycRejectedReason: rejectedReason || 'Documentos rechazados',
        verified: false,
      }
    }

    const updated = await prisma.model.update({
      where: { id: modelId },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      status: updated.kycStatus,
      verified: updated.verified,
    })
  } catch (error) {
    console.error('KYC PATCH error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}