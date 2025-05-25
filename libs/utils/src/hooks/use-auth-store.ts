import { create } from 'zustand';
import { TLoginItem } from '@imphnen-frontend-service/service';
import { SessionToken } from '../cookies';
import { SessionUser } from '../local-storage';

export enum ESessionStatus {
  Authenticated = 'authenticated',
  Authenticating = 'authenticating',
  Unauthenticated = 'unauthenticated',
}

type SessionState = {
  isLoading: boolean;
  session?: TLoginItem;
  status?: ESessionStatus;
  setLoading: (val: boolean) => void;
  setSession: (payload: TLoginItem) => void;
  clearSession: () => void;
};

export const useAuthStore = create<SessionState>((set) => {
  const session = SessionToken.get();
  const user = SessionUser.get();
  const isAuthenticated = !!session;

  return {
    isLoading: false,
    session: isAuthenticated ? { ...session, ...user } : undefined,
    status: isAuthenticated
      ? ESessionStatus.Authenticated
      : ESessionStatus.Unauthenticated,
    setLoading: (val) => set({ isLoading: val }),
    setSession: (data) => {
      SessionToken.set({ token: data.token });
      SessionUser.set(data.user);
      set({
        session: data,
        status: ESessionStatus.Authenticated,
      });
    },
    clearSession: () => {
      SessionToken.remove();
      SessionUser.remove();
      set({ session: undefined, status: ESessionStatus.Unauthenticated });
    },
  };
});
