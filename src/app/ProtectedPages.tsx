'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface IProtectedPages {
  children: React.ReactNode;
}

const ProtectedPages: React.FC<IProtectedPages> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ProtectedPages;
