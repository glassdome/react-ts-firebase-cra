import {
  AuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  verifyPasswordResetCode,
  User,
  UserCredential,
  updatePassword,
} from 'firebase/auth';
import React, { useState, useEffect, useContext, createContext } from 'react';

import { auth } from 'config/firebase';
import { SignInWithSocialMedia } from '../modules';

export interface AuthContextProps {
  user: User | null;
  register: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signInSocial: (provider: AuthProvider) => Promise<UserCredential>;
  changePassword: (user: User, newPassword: string) => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
  confirmReset: (code: string, password: string) => Promise<void>;
  verifyResetCode: (code: string) => Promise<string>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth() must be used within an AuthProvider.');
  }
  return context;
};

export function ProvideAuth({ children }: React.PropsWithChildren<unknown>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const register = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInSocial = (provider: AuthProvider): Promise<UserCredential> => {
    return SignInWithSocialMedia(provider);
  };
  const changePassword = (user: User, newPassword: string): Promise<void> => {
    return updatePassword(user, newPassword);
  };

  const sendResetEmail = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  const confirmReset = (code: string, password: string): Promise<void> => {
    return confirmPasswordReset(auth, code, password);
  };

  const verifyResetCode = (code: string): Promise<string> => {
    return verifyPasswordResetCode(auth, code);
  };

  const signOut = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Clean up sub
    return () => unsubscribe();
  });

  const value = {
    user,
    register,
    signIn,
    signInSocial,
    changePassword,
    sendResetEmail,
    confirmReset,
    verifyResetCode,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
