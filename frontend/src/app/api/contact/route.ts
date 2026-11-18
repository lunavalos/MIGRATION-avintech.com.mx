import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, email, phone, message, interests } = body

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Por favor completa todos los campos requeridos.' },
        { status: 400 },
      )
    }

    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT) || 465
    const secure = process.env.SMTP_SECURE === 'false' ? false : true
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const from = process.env.SMTP_FROM || (user ? `"Formulario Web Avintech" <${user}>` : undefined)
    const to = process.env.CONTACT_TO || 'contacto@avintech.com.mx'

    if (!host || !user || !pass) {
      console.error('Configuración SMTP incompleta en variables de entorno (SMTP_HOST, SMTP_USER, SMTP_PASS)')
      return NextResponse.json(
        { error: 'Servicio de correo temporalmente no disponible.' },
        { status: 500 },
      )
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    })

    const interestList =
      Array.isArray(interests) && interests.length > 0
        ? interests.join(', ')
        : 'No especificado'

    const htmlContent = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #242421; color: #ffffff; padding: 22px 26px;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">Nuevo mensaje desde avintech.com.mx</h2>
        </div>
        <div style="padding: 26px; color: #333333; line-height: 1.6;">
          <p style="margin-top: 0; font-size: 15px;">Has recibido un nuevo contacto a través del formulario del sitio web:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 18px 0;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #555555; border-bottom: 1px solid #f0f0f0;">Nombre:</td>
              <td style="padding: 10px 0; color: #111111; border-bottom: 1px solid #f0f0f0;">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555555; border-bottom: 1px solid #f0f0f0;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${escapeHtml(email)}" style="color: #006cb8; text-decoration: none; font-weight: 500;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555555; border-bottom: 1px solid #f0f0f0;">Teléfono:</td>
              <td style="padding: 10px 0; color: #111111; border-bottom: 1px solid #f0f0f0;">${escapeHtml(phone || 'No proporcionado')}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555555; border-bottom: 1px solid #f0f0f0;">Interesado en:</td>
              <td style="padding: 10px 0; color: #111111; border-bottom: 1px solid #f0f0f0;">${escapeHtml(interestList)}</td>
            </tr>
          </table>
          <div style="background-color: #f7f9fa; border-left: 4px solid #006cb8; padding: 16px 18px; border-radius: 4px; margin-top: 15px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #444444; font-size: 14px;">Mensaje:</p>
            <p style="margin: 0; white-space: pre-wrap; color: #222222; font-size: 14px;">${escapeHtml(message)}</p>
          </div>
        </div>
        <div style="background-color: #f5f5f5; padding: 14px 24px; font-size: 12px; color: #777777; text-align: center; border-top: 1px solid #eeeeee;">
          Este correo fue enviado automáticamente desde el formulario de contacto de <a href="https://avintech.com.mx" style="color: #006cb8; text-decoration: none;">avintech.com.mx</a>
        </div>
      </div>
    `.trim()

    const textContent = `
Nuevo mensaje desde avintech.com.mx
------------------------------------
Nombre: ${fullName}
Email: ${email}
Teléfono: ${phone || 'No proporcionado'}
Interesado en: ${interestList}

Mensaje:
${message}
------------------------------------
    `.trim()

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Nuevo contacto: ${fullName} - Avintech`,
      text: textContent,
      html: htmlContent,
    })

    // Registro secundario en Payload CMS si está disponible
    const payloadUrl = process.env.PAYLOAD_INTERNAL_URL || 'http://127.0.0.1:3001'
    try {
      await fetch(`${payloadUrl}/api/contact-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch {
      // Ignorar si Payload no está disponible en este momento
    }

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente' },
      { status: 200 },
    )
  } catch (err) {
    console.error('Error enviando correo SMTP:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error interno al procesar el mensaje' },
      { status: 500 },
    )
  }
}
