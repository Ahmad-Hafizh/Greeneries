'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface ISessionClientProvider {
  children: React.ReactNode;
}

const SessionClientProvider: React.FC<ISessionClientProvider> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionClientProvider;
