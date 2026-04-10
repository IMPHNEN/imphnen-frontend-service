import { useState, useEffect } from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { useAuthStore } from '../../features/auth/store/auth.store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});
type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => { if (isAuthenticated) navigate('/'); }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    setIsSubmitting(true);
    try {
      const success = await login(data.email, data.password);
      if (success) { toast.success('Login successful!'); navigate('/'); }
      else setError('Login failed. Please check your credentials.');
    } catch { setError('Login failed. Please try again.'); }
    finally { setIsSubmitting(false); }
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 font-sans">Sign in to QR Campaign Manager</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" type="text" {...register('email')} placeholder="your@email.com" disabled={isSubmitting}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.email ? 'border-red-400' : 'border-gray-300'}`} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Link to="/auth/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">Forgot password?</Link>
            </div>
            <div className="relative">
              <input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} placeholder="••••••••" disabled={isSubmitting}
                className={`w-full px-4 py-2.5 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.password ? 'border-red-400' : 'border-gray-300'}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} className="text-xl" />
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={!isValid || isSubmitting}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer">
            {isSubmitting ? 'Signing in...' : 'Sign in with Email'}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button onClick={() => toast.info('GitHub login coming soon')} disabled={isGithubLoading} type="button"
          className="w-full py-3 flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors cursor-pointer">
          <GithubOutlined className="text-xl" />
          <span>{isGithubLoading ? 'Connecting...' : 'Sign in with GitHub'}</span>
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">Don't have an account? <Link to="/auth/signup" className="text-primary-600 hover:text-primary-700 font-semibold">Sign up</Link></p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
