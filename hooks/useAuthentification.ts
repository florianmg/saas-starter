import { useRouter } from 'next/router';

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  AuthError,
  sendEmailVerification,
  applyActionCode,
} from 'firebase/auth';

import { auth } from '../lib/firebase/client';
import { useAuth } from './useAuth';
import { FirebaseError } from 'firebase/app';
import { APP_ROUTES } from '../constants';

interface IFormValues {
  email: string;
  password: string;
}

const useAuthentification = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const verifyEmailValidity = async (
    oobCode: string
  ): Promise<{ success: boolean; error?: AuthError }> => {
    try {
      console.log('[FIRESTORE] verifyEmailValidity');
      await applyActionCode(auth, oobCode);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error as AuthError,
      };
    }
  };

  const emailLogin = async ({
    email,
    password,
  }: IFormValues): Promise<{ success: boolean; error?: AuthError }> => {
    try {
      console.log('[FIRESTORE] emailLogin');
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credentials.user);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error as AuthError,
      };
    }
  };

  const emailRegister = async ({
    email,
    password,
  }: IFormValues): Promise<{ success: boolean; error?: AuthError }> => {
    try {
      console.log('[FIRESTORE] emailRegister');
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(credentials.user);
      setUser(credentials.user);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error as AuthError,
      };
    }
  };

  const sendResetPasswordLink = async (
    email: string
  ): Promise<{ success: boolean; error?: AuthError }> => {
    try {
      console.log('[FIRESTORE] sendResetPasswordLink');
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error as AuthError,
      };
    }
  };

  const resetPassword = async ({
    password,
    oobCode,
  }: {
    password: string;
    oobCode: string;
  }): Promise<{ success: boolean; error?: AuthError }> => {
    try {
      console.log('[FIRESTORE] resetPassword');
      await confirmPasswordReset(auth, oobCode, password);
      return {
        success: false,
      };
    } catch (error) {
      return {
        success: false,
        error: error as AuthError,
      };
    }
  };

  const googleAuth = async (): Promise<{
    success: boolean;
    error?: AuthError | FirebaseError;
  }> => {
    try {
      console.log('[FIRESTORE] googleAuth');
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error as AuthError | FirebaseError,
      };
    }
  };

  const logout = () => {
    console.log('[FIRESTORE] logout');
    signOut(auth).then(() => {
      setUser(null);
      router.push(APP_ROUTES.HOME.URL);
    });
  };

  return {
    emailLogin,
    emailRegister,
    googleAuth,
    sendResetPasswordLink,
    resetPassword,
    verifyEmailValidity,
    logout,
  };
};

export default useAuthentification;
