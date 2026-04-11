import { createFileRoute, redirect } from '@tanstack/react-router'
import { SessionToken } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const session = SessionToken.get()
    if (session?.token?.access_token) {
      throw redirect({ to: '/hackathon-dashboard' })
    }
    throw redirect({ to: '/auth/login' })
  },
})
