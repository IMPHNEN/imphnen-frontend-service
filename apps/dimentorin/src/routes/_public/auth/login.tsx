import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useGitHubAuth, useLogin, authLoginSchema, TLoginRequest } from '@imphnen-frontend-service/service'
import { GithubOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { LoginBanner } from '@imphnen-frontend-service/ui/organisms'
import { Icon } from '@iconify/react'

export const Route = createFileRoute('/_public/auth/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { signInWithGitHub } = useGitHubAuth()
  const loginMutation = useLogin()
  const [isGithubLoading, setIsGithubLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<TLoginRequest>({
    resolver: zodResolver(authLoginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  })

  useEffect(() => {
    const hashParams = new URLSearchParams(globalThis.location.hash.substring(1))
    const urlParams = new URLSearchParams(globalThis.location.search)
    const accessToken = hashParams.get('access_token') || urlParams.get('access_token')
    const type = hashParams.get('type') || urlParams.get('type')
    if (accessToken && (type === 'recovery' || type === 'magiclink' || !type)) {
      toast.info('Redirecting to password reset...')
      navigate({ to: '/auth/login', search: { access_token: accessToken } })
    }
  }, [navigate])

  const onSubmit = handleSubmit(async (data) => {
    setError(null)
    try {
      await loginMutation.mutateAsync(data)
      toast.success('Login successful!')
      navigate({ to: '/dashboard' })
    } catch (err) {
      setError((err as Error).message || 'Login failed')
    }
  })

  const handleGithubLogin = async () => {
    try {
      setIsGithubLoading(true)
      const result = await signInWithGitHub()
      if (result?.url) globalThis.location.href = result.url
      else { setIsGithubLoading(false); setError('Failed to get GitHub OAuth URL') }
    } catch (err) {
      setError((err as Error).message || 'GitHub login failed')
      setIsGithubLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-5">
      <div className="flex w-[90%] max-w-[1120px] min-h-[712px] bg-white rounded-[48px] shadow-auth border border-border-light overflow-hidden relative z-[1] p-10 gap-6">
        <LoginBanner />

        <div className="flex-1 py-[53px] px-10 bg-white border border-border-light rounded-[48px] flex flex-col items-center justify-start w-full">
          <div className="w-full max-w-[404px]">
            <div className="mb-8">
              <h1 className="text-[46px] leading-[1.2] font-bold text-primary-accent mb-2">Hallo Minna-san</h1>
              <p className="text-[19px] leading-[1.2] font-medium text-primary-accent">Welcome to Dimentorin by IMPHNEN</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-[15px] leading-[19.5px] font-medium text-text-label mb-2">Email</label>
                <input id="email" type="text" {...register('email')} placeholder="Masukkan email-mu, Senpai~! ✨" disabled={loginMutation.isPending}
                  className={`w-full h-[52px] px-5 border rounded-md bg-white text-text-dark text-[15px] focus:outline-none focus:border-primary-accent focus:shadow-[0_0_0_3px_rgba(35,161,235,0.12)] placeholder:text-placeholder disabled:bg-neutral-100 disabled:cursor-not-allowed transition-all duration-200 ease-in-out ${errors.email ? 'border-red-400' : 'border-[#d1d1d1]'}`} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-[15px] leading-[19.5px] font-medium text-text-label">Password</label>
                  <Link to="/auth/forgot" className="text-[15px] font-medium text-primary-accent hover:underline cursor-pointer">Lupa Password?</Link>
                </div>
                <div className="relative">
                  <input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} placeholder="Masukkan password rahasiamu! 🔒" disabled={loginMutation.isPending}
                    className={`w-full h-[52px] px-5 border rounded-md bg-white text-text-dark text-[15px] focus:outline-none focus:border-primary-accent focus:shadow-[0_0_0_3px_rgba(35,161,235,0.12)] placeholder:text-placeholder pr-12 disabled:bg-neutral-100 disabled:cursor-not-allowed transition-all duration-200 ease-in-out ${errors.password ? 'border-red-400' : 'border-[#d1d1d1]'}`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark">
                    <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} className="text-xl" />
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button type="submit" disabled={!isValid || loginMutation.isPending}
                className="w-full h-[34px] bg-primary-accent text-[#f6f6f6] rounded-md text-[15px] font-semibold flex items-center justify-center hover:bg-[#1e8cd1] focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all duration-200 ease-in-out cursor-pointer">
                {loginMutation.isPending ? 'Entering...' : 'Enter Isekai'}
              </button>
            </form>

            <div className="my-6 flex items-center justify-center gap-4">
              <div className="flex-1 h-px bg-divider-blue"></div>
              <span className="text-xs font-medium text-primary-accent">Or</span>
              <div className="flex-1 h-px bg-divider-blue"></div>
            </div>

            <button onClick={handleGithubLogin} disabled={isGithubLoading} type="button"
              className="w-full h-[44px] flex items-center justify-center gap-3 bg-bg-secondary border border-border-subtle rounded-md font-semibold text-text-label hover:bg-[#f0f0f0] focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2 disabled:bg-neutral-100 disabled:cursor-not-allowed transition-all duration-200 ease-in-out cursor-pointer">
              <GithubOutlined className="text-lg" />
              <span className="text-[19px] leading-[1.2] font-semibold">{isGithubLoading ? 'Connecting...' : 'Log In With GitHub'}</span>
            </button>

            <div className="mt-4 text-center">
              <p className="text-[15px] font-medium text-text-secondary">Belum punya akun? <Link to="/auth/register" className="text-primary-accent font-medium text-[15px] hover:underline cursor-pointer">Daftar disini</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
