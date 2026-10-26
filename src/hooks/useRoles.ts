import { useEffect, useState } from 'react'
import { subscribeToActiveRoles } from '@/lib/careersService'
import { type JobRole } from '@/content/site'
import { isFirebaseConfigured } from '@/lib/firebase'

export function useRoles() {
  const [roles, setRoles] = useState<JobRole[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const isLive = isFirebaseConfigured()

  useEffect(() => {
    const unsubscribe = subscribeToActiveRoles(
      (updatedRoles) => {
        setRoles(updatedRoles)
        setLoading(false)
      },
      (err) => {
        setError(err instanceof Error ? err.message : 'Failed to fetch roles')
        setLoading(false)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return { roles, loading, error, isLive }
}
