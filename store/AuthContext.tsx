import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import nookies from 'nookies';

import { User, onIdTokenChanged } from 'firebase/auth';
import { auth } from '../lib/firebase/client';

import { APP_ROUTES } from '../constants';

export const AuthContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: APP_ROUTES.HOME });
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, 'token', token, { path: APP_ROUTES.HOME });
        setUser(user);
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
