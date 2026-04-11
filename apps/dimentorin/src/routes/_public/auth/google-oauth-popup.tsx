import { createFileRoute } from '@tanstack/react-router'
import { FC, ReactElement, useEffect } from 'react'

let globalIsProcessed = false

export const Route = createFileRoute('/_public/auth/google-oauth-popup')({
  component: GoogleOAuthPopupPage,
})

function GoogleOAuthPopupPage(): ReactElement {

  useEffect(() => {
    if (globalIsProcessed) {
      return
    }

    const callBackend = async (code: string, state: string) => {
      if (globalIsProcessed) {
        return
      }

      globalIsProcessed = true

      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4099'
        let callbackUrl

        if (baseUrl.endsWith('/v1')) {
          callbackUrl = `${baseUrl}/auth/google/callback`
        } else {
          callbackUrl = `${baseUrl}/v1/auth/google/callback`
        }

        const url = new URL(callbackUrl)
        url.searchParams.append('code', code)
        url.searchParams.append('state', state)
        url.searchParams.append('redirect_uri', `${window.location.origin}/auth/google-oauth-popup`)

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          credentials: 'omit',
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`)
        }

        const data = await response.json()

        window.opener?.postMessage(
          {
            type: 'GOOGLE_OAUTH_SUCCESS',
            payload: data,
          },
          window.location.origin
        )
        window.close()

      } catch (error) {
        globalIsProcessed = false

        window.opener?.postMessage(
          {
            type: 'GOOGLE_OAUTH_ERROR',
            error: `Failed to process OAuth callback: ${error instanceof Error ? error.message : String(error)}`,
          },
          window.location.origin
        )
        window.close()
      }
    }

    const handleOAuthResponse = () => {
      const isPopup = window.opener && window.opener !== window

      const detectJsonResponse = () => {
        try {
          const bodyText = document.body.innerText || document.body.textContent || ''
          const trimmedText = bodyText.trim()

          if (trimmedText.startsWith('{') && trimmedText.endsWith('}')) {
            const parsedJson = JSON.parse(trimmedText)

            if (parsedJson && typeof parsedJson === 'object') {
              const hasAccessToken = parsedJson.access_token || parsedJson.token || parsedJson.accessToken

              if (hasAccessToken) {
                return parsedJson
              }
            }
          }
        } catch {
          return null
        }
        return null
      }

      const checkOAuthParams = () => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const state = urlParams.get('state')
        const error = urlParams.get('error')

        if (error) {
          if (isPopup) {
            window.opener?.postMessage(
              {
                type: 'GOOGLE_OAUTH_ERROR',
                error: error,
              },
              window.location.origin
            )
            window.close()
          }
          return true
        }

        if (code && state) {
          if (isPopup) {
            callBackend(code, state)
          }
          return true
        }

        return false
      }

      const immediateJson = detectJsonResponse()
      if (immediateJson && isPopup) {
        window.opener?.postMessage(
          {
            type: 'GOOGLE_OAUTH_SUCCESS',
            payload: immediateJson,
          },
          window.location.origin
        )
        window.close()
        return
      }

      if (checkOAuthParams()) {
        return
      }

      let attempts = 0
      const maxAttempts = 50

      const checkForJson = () => {
        attempts++
        const jsonResponse = detectJsonResponse()

        if (jsonResponse && isPopup) {
          window.opener?.postMessage(
            {
              type: 'GOOGLE_OAUTH_SUCCESS',
              payload: jsonResponse,
            },
            window.location.origin
          )
          window.close()
          return
        }

        if (attempts < maxAttempts) {
          setTimeout(checkForJson, 500)
        } else if (isPopup) {
          window.opener?.postMessage(
            {
              type: 'GOOGLE_OAUTH_ERROR',
              error: 'Timeout waiting for response',
            },
            window.location.origin
          )
          window.close()
        }
      }

      setTimeout(checkForJson, 1000)
    }

    setTimeout(handleOAuthResponse, 100)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <h2 className="text-lg font-semibold text-primary-500 mb-2">
          Memproses Login Google...
        </h2>
        <p className="text-gray-600 text-sm">
          Jangan tutup jendela ini.
        </p>
      </div>
    </div>
  )
}
