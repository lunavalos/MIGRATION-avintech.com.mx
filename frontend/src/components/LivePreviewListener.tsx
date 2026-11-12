'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PAYLOAD_PUBLIC } from '@/lib/payload'

export function LivePreviewListener() {
  const router = useRouter()

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === PAYLOAD_PUBLIC ||
        event.origin === 'http://localhost:3001' ||
        event.origin === 'http://127.0.0.1:3001'
      ) {
        if (event.data?.type === 'payload-live-preview') {
          router.refresh()
        }
      }
    }

    window.addEventListener('message', handleMessage)
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'payload-live-preview', ready: true }, '*')
    }

    return () => window.removeEventListener('message', handleMessage)
  }, [router])

  return null
}
