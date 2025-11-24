import { FC, ReactElement, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@imphnen-frontend-service/utils';
import { supabase } from '@imphnen-frontend-service/service';
import { toast } from 'sonner';

const CallbackPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { setSession } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (hasRunRef.current) {
        console.log('[Callback] Already processed, skipping...');
        return;
      }
      hasRunRef.current = true;
      try {
        console.log('[Callback] Processing OAuth callback...');
        console.log('[Callback] Current URL:', globalThis.location.href);

        // Supabase client is configured with detectSessionInUrl: true
        // This means Supabase automatically detects and processes OAuth tokens from the URL hash
        // We just need to wait a moment for it to complete, then check for the session

        console.log('[Callback] Waiting for Supabase to process OAuth callback...');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get the session that Supabase automatically created from the URL hash
        const { data: { session: sessionData }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('[Callback] Session error:', sessionError);
          throw new Error(sessionError.message || 'Failed to get session');
        }

        if (!sessionData || !sessionData.user) {
          throw new Error('No session found after OAuth callback. Please try logging in again.');
        }

        console.log('[Callback] Supabase session established:', {
          userId: sessionData.user.id,
          email: sessionData.user.email,
        });

        // Create/update user in the users table (for foreign key constraints)
        console.log('[Callback] Creating/updating user record...');
        const { data: userData, error: upsertError } = await supabase
          .from('users')
          .upsert({
            id: sessionData.user.id,
            email: sessionData.user.email || '',
            fullname: sessionData.user.user_metadata?.full_name ||
                     sessionData.user.user_metadata?.name ||
                     sessionData.user.email?.split('@')[0] || '',
            avatar: sessionData.user.user_metadata?.avatar_url || '',
            is_active: true,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id',
          })
          .select()
          .single();

        if (upsertError) {
          console.warn('[Callback] Failed to create user record:', upsertError);
          // Don't throw - continue with login even if user record creation fails
        } else {
          console.log('[Callback] User record created/updated successfully');
        }

        // Store user-friendly data in Zustand for UI purposes
        // Supabase now manages the actual auth session
        // Use data from database if available, otherwise use OAuth metadata
        const userRecord = userData || {
          id: sessionData.user.id,
          email: sessionData.user.email || '',
          fullname: sessionData.user.user_metadata?.full_name ||
                   sessionData.user.user_metadata?.name ||
                   sessionData.user.email?.split('@')[0] || '',
          avatar: sessionData.user.user_metadata?.avatar_url || '',
          phone_number: '',
          birthdate: '',
          gender: '',
          is_active: true,
        };

        setSession({
          token: {
            access_token: sessionData.access_token,
            refresh_token: sessionData.refresh_token || '',
          },
          user: {
            id: userRecord.id,
            email: userRecord.email,
            fullname: userRecord.fullname,
            phone_number: userRecord.phone_number || '',
            avatar: userRecord.avatar || '',
            birthdate: userRecord.birthdate || '',
            gender: userRecord.gender || '',
            is_active: userRecord.is_active,
            location: userRecord.location,
            bio: userRecord.bio,
            skills: userRecord.skills,
            role: {
              id: '',
              name: 'user',
              permissions: [],
              created_at: '',
              updated_at: '',
            },
          },
        });

        console.log('[Callback] Session stored successfully');
        toast.success('Login successful!');
        setIsProcessing(false);

        // Check if user has completed onboarding (has location)
        // Use globalThis.location.replace for hard redirect to prevent history issues
        if (userRecord.location) {
          console.log('[Callback] User has completed onboarding, redirecting to dashboard...');
          globalThis.location.replace('/dashboard');
        } else {
          console.log('[Callback] User needs onboarding, redirecting...');
          globalThis.location.replace('/onboarding/user');
        }
      } catch (err) {
        console.error('[Callback] Error:', err);
        setError((err as Error).message);
        setIsProcessing(false);
        toast.error('An error occurred during login');

        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
      }
    };

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  if (error) {
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

          <p className="text-gray-600 text-sm mt-6 text-center">
            Redirecting to login page in 3 seconds...
          </p>
        </div>
      </div>
    );
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
  );
};

export default CallbackPage;
