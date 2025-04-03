import { SessionToken, SessionUser } from '../local-storage';

export const useSession = () => {
  const session = {
    user: SessionUser.get(),
    token: SessionToken.get(),
  };

  const isAuthenticated = !!session.token?.access_token;

  const signOut = () => {
    SessionUser.remove();
    SessionToken.remove();
    window.location.reload();
  };

  return {
    isAuthenticated,
    session,
    signOut,
  };
};
