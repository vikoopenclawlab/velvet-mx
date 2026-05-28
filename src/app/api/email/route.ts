import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

// Email types
type EmailType = 'welcome' | 'password_reset' | 'booking_confirmation' | 'booking_cancelled'

interface EmailData {
  email: string
  name?: string
  code?: string
  bookingId?: string
  modelName?: string
  date?: string
  amount?: string
  resetUrl?: string
}

// Email templates
const emailTemplates: Record<EmailType, { subject: string; html: (data: EmailData) => string; text: (data: EmailData) => string }> = {
  welcome: {
    subject: 'Bienvenida a Velvet MX 🌙',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1A1A2E; color: #E0E0E0; padding: 40px;">
        <h1 style="color: #C9A96E; font-size: 28px; margin-bottom: 20px;">Bienvenida a Velvet MX 🌙</h1>
        <p style="font-size: 16px; line-height: 1.6;">Hola${data.name ? ` ${data.name}` : ''},</p>
        <p style="font-size: 16px; line-height: 1.6;">Gracias por unirte a Velvet MX. Tu cuenta ha sido creada exitosamente.</p>
        <p style="font-size: 16px; line-height: 1.6;">Explora nuestras modelos, reserva citas y disfruta de experiencias inolvidables.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://velvetmx.com'}" style="display: inline-block; background: #C9A96E; color: #1A1A2E; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; margin-top: 20px;">Explorar Modelos</a>
        <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
        <p style="font-size: 12px; color: #888;">Velvet MX — Experiencias que seducen</p>
      </div>
    `,
    text: (data) => `Hola${data.name ? ` ${data.name}` : ''}, Gracias por unirte a Velvet MX. Tu cuenta ha sido creada exitosamente. Explora nuestras modelos en: ${process.env.NEXT_PUBLIC_APP_URL || 'https://velvetmx.com'}`,
  },
  password_reset: {
    subject: 'Restablecer contraseña — Velvet MX',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1A1A2E; color: #E0E0E0; padding: 40px;">
        <h1 style="color: #C9A96E; font-size: 24px; margin-bottom: 20px;">Restablecer Contraseña</h1>
        <p style="font-size: 16px; line-height: 1.6;">Recibimos una solicitud para restablecer la contraseña de tu cuenta en Velvet MX.</p>
        ${data.code ? `<div style="background: #252540; border: 2px dashed #C9A96E; padding: 20px; text-align: center; margin: 24px 0; border-radius: 8px;">
          <p style="font-size: 12px; color: #888; margin: 0 0 8px;">Tu código de verificación</p>
          <p style="font-size: 32px; font-weight: bold; color: #C9A96E; letter-spacing: 4px; margin: 0;">${data.code}</p>
        </div>` : ''}
        ${data.resetUrl ? `<a href="${data.resetUrl}" style="display: inline-block; background: #C9A96E; color: #1A1A2E; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; margin: 16px 0;">Restablecer Contraseña</a>` : ''}
        <p style="font-size: 14px; color: #888; margin-top: 20px;">Si no solicitaste este cambio, ignora este email. El código expira en 15 minutos.</p>
        <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
        <p style="font-size: 12px; color: #888;">Velvet MX — Experiencias que seducen</p>
      </div>
    `,
    text: (data) => `Restablece tu contraseña en: ${data.resetUrl || `Usa el código: ${data.code}`}. Si no lo solicitaste, ignora este mensaje.`,
  },
  booking_confirmation: {
    subject: 'Confirmación de reservación — Velvet MX',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1A1A2E; color: #E0E0E0; padding: 40px;">
        <h1 style="color: #C9A96E; font-size: 24px; margin-bottom: 20px;">✓ Reservación Confirmada</h1>
        <p style="font-size: 16px; line-height: 1.6;">Tu reservación ha sido confirmada. Aquí están los detalles:</p>
        <div style="background: #252540; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <table style="width: 100%; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #888;">Modelo</td><td style="padding: 8px 0; text-align: right; color: #E0E0E0;">${data.modelName || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Fecha</td><td style="padding: 8px 0; text-align: right; color: #E0E0E0;">${data.date || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Total</td><td style="padding: 8px 0; text-align: right; color: #C9A96E; font-weight: bold;">${data.amount || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Folio</td><td style="padding: 8px 0; text-align: right; color: #E0E0E0;">${data.bookingId || 'N/A'}</td></tr>
          </table>
        </div>
        <p style="font-size: 14px; color: #888;">Recuerda llegar a tiempo y seguir las indicaciones de tu acompañante para una experiencia perfecta.</p>
        <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
        <p style="font-size: 12px; color: #888;">Velvet MX — Experiencias que seducen</p>
      </div>
    `,
    text: (data) => `Tu reservación #${data.bookingId} con ${data.modelName} el ${data.date} por ${data.amount} ha sido confirmada.`,
  },
  booking_cancelled: {
    subject: 'Reservación cancelada — Velvet MX',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1A1A2E; color: #E0E0E0; padding: 40px;">
        <h1 style="color: #FF6B6B; font-size: 24px; margin-bottom: 20px;">Reservación Cancelada</h1>
        <p style="font-size: 16px; line-height: 1.6;">Tu reservación #${data.bookingId || ''} ha sido cancelada.</p>
        <p style="font-size: 14px; color: #888; margin-top: 16px;">Si tienes alguna duda o quieres reprogramar, no dudes en contactarnos.</p>
        <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
        <p style="font-size: 12px; color: #888;">Velvet MX — Experiencias que seducen</p>
      </div>
    `,
    text: (data) => `Tu reservación #${data.bookingId} ha sido cancelada.`,
  },
}

// Create transporter
function createTransporter() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  })
}

// POST - Send email
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, to, data } = body as { type: EmailType; to: string; data: EmailData }

    if (!type || !to) {
      return NextResponse.json({ error: 'type and to are required' }, { status: 400 })
    }

    const template = emailTemplates[type]
    if (!template) {
      return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    const transporter = createTransporter()

    if (!transporter) {
      // Stub mode - log and return success for MVP
      console.log(`[EMAIL STUB] Would send ${type} email to ${to}:`, data)
      return NextResponse.json({
        success: true,
        stub: true,
        message: 'Email sending is stubbed (SMTP not configured). Check server logs for details.'
      })
    }

    const info = await transporter.sendMail({
      from: `"Velvet MX" <${process.env.EMAIL_FROM || 'noreply@velvetmx.com'}>`,
      to,
      subject: template.subject,
      text: template.text(data),
      html: template.html(data),
    })

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}