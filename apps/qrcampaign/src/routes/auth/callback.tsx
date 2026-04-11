import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { FC, ReactElement, useEffect, useState, useRef } from 'react'
import { useGitHubCallback } from '@imphnen-frontend-service/service'
import { toast } from 'sonner'

export const Route = createFileRoute('/auth/callback')({
  component: CallbackPage,
})

function CallbackPage(): ReactElement {
  const navigate = useNavigate()
  const { mutateAsync: exchangeGitHubCode } = useGitHubCallback()
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasRunRef = useRef(false)

  useEffect(() => {
    const handleCallback = async () => {
      if (hasRunRef.current) {
        return
      }
      hasRunRef.current = true

      try {
        const hashParams = new URLSearchParams(
          globalThis.location.hash.substring(1)
        )
        const urlParams = new URLSearchParams(globalThis.location.search)

        const type = hashParams.get('type') || urlParams.get('type')
        const accessToken =
          hashParams.get('access_token') || urlParams.get('access_token')

        console.log('[Callback] Params:', {
          type,
          accessToken: !!accessToken,
          hash: globalThis.location.hash,
          search: globalThis.location.search,
        })

        if (accessToken) {
          setIsProcessing(false)

          if (type === 'recovery' || type === 'magiclink') {
            toast.success('Email verified! Please set your new password.')
            navigate({ to: '/auth/reset-password', search: { access_token: accessToken } })
            return
          }

          if (type === 'signup' || type === 'email_confirmation') {
            toast.success(
              'Email verified successfully! Please log in to continue.'
            )
            navigate({ to: '/auth/login' })
            return
          }

          toast.success('Email verified! Please set your new password.')
          navigate({ to: '/auth/reset-password', search: { access_token: accessToken } })
          return
        }

        const code = urlParams.get('code')

        if (!code) {
          throw new Error('No authorization code received')
        }

        const result = await exchangeGitHubCode({ code })

        toast.success('Login successful!')
        setIsProcessing(false)

        if (result.user.location) {
          globalThis.location.replace('/dashboard')
        } else {
          globalThis.location.replace('/onboarding/user')
        }
      } catch (err) {
        console.error('[Callback] Error:', err)
        setError((err as Error).message)
        setIsProcessing(false)
        toast.error('An error occurred during login')

        setTimeout(() => {
          navigate({ to: '/auth/login' })
        }, 3000)
      }
    }

    handleCallback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) {
    const isPrivateEmailError =
      error.toLowerCase().includes('failed to create user') ||
      error.toLowerCase().includes('email') ||
      error.toLowerCase().includes('user record')

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg border border-red-200">
          <div className="text-center mb-6">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              GitHub Login Failed
            </h2>
            <p className="text-red-600 mb-4 whitespace-pre-line">{error}</p>
          </div>

          {isPrivateEmailError && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-amber-800 mb-2">
                Is your GitHub email set to private?
              </h3>
              <p className="text-amber-700 text-sm mb-3">
                GitHub login requires a public email address. Please follow
                these steps:
              </p>
              <ol className="text-amber-700 text-sm list-decimal list-inside space-y-1 mb-3">
                <li>
                  Go to{' '}
                  <a
                    href="https://github.com/settings/emails"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-amber-900"
                  >
                    GitHub Email Settings
                  </a>
                </li>
                <li>Uncheck "Keep my email addresses private"</li>
                <li>
                  Or go to{' '}
                  <a
                    href="https://github.com/settings/profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-amber-900"
                  >
                    Profile Settings
                  </a>{' '}
                  and set a public email
                </li>
                <li>Try signing in with GitHub again</li>
              </ol>
              <p className="text-amber-600 text-xs">
                Alternatively, you can sign up using email and password instead.
              </p>
            </div>
          )}

          <p className="text-gray-600 text-sm mt-6 text-center">
            Redirecting to login page in 3 seconds...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Completing login...
        </h2>
        <p className="text-gray-600">Please wait</p>
      </div>
    </div>
  )
}
