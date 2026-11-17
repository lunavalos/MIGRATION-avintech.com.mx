'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PAYLOAD_PUBLIC } from '@/lib/payload'

const INTEREST_OPTIONS = ['Audio/Video', 'Redes', 'Iluminación', 'Seguridad', 'Control']

export function ContactForm() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleInterest = (val: string) => {
    setInterests((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          message,
          interests,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'No se pudo enviar el mensaje. Intenta nuevamente.')
      }

      router.push('/gracias')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ocurrió un error al enviar tu mensaje. Por favor contáctanos por teléfono o email.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="av-form-grid">
      <div>
        <label htmlFor="fullName" className="av-field-label">
          Nombre Completo
        </label>
        <input
          id="fullName"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nombre"
          className="av-input"
        />
      </div>

      <div className="av-form-row-2">
        <div>
          <label htmlFor="email" className="av-field-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="av-input"
          />
        </div>
        <div>
          <label htmlFor="phone" className="av-field-label">
            Teléfono
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Teléfono"
            className="av-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="av-field-label">
          Mensaje
        </label>
        <textarea
          id="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mensaje"
          className="av-textarea"
        />
      </div>

      <div>
        <span className="av-field-label">Estoy Interesado en:</span>
        <div className="av-checkbox-group">
          {INTEREST_OPTIONS.map((option) => (
            <label key={option} className="av-checkbox-item">
              <input
                type="checkbox"
                checked={interests.includes(option)}
                onChange={() => toggleInterest(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <p style={{ color: 'var(--color-orange-red)', fontSize: '0.9rem', margin: 0 }}>{error}</p>
      )}

      <button type="submit" disabled={submitting} className="av-submit-btn">
        {submitting ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  )
}
