import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SessionToken } from '@imphnen-frontend-service/service'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: IndexRedirect,
})

function IndexRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const session = SessionToken.get()
      if (session?.token?.access_token) {
        navigate({ to: '/hackathon-dashboard' })
      } else {
        navigate({ to: '/auth/login' })
      }
    } catch {
      navigate({ to: '/auth/login' })
    }
  }, [navigate])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ width: 40, height: 40, border: '3px solid #e5e7eb', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  )
}
