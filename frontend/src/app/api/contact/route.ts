import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const payloadUrl = process.env.PAYLOAD_INTERNAL_URL || 'http://127.0.0.1:3001'
    const res = await fetch(`${payloadUrl}/api/contact-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data, { status: 201 })
    }

    return NextResponse.json(
      { error: 'No se pudo registrar el mensaje en Payload CMS' },
      { status: res.status },
    )
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error interno' },
      { status: 500 },
    )
  }
}
