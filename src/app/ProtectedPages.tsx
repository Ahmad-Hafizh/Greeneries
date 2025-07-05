'use client';
import DesktopNavbar from '@/components/big-components/navbar/desktop.navbar';
import MobileNavbar from '@/components/big-components/navbar/mobile.navbar';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface IProtectedPages {
  children: ReactNode;
}

const ProtectedPages = ({ children }: IProtectedPages) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });

  const firstRoute = pathname?.split('/')[1];
  const privateRoute = ['setting', 'cart', 'checkout'];

  if (status == 'loading') {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="animate-spin duration-initial spin-in spin-out text-green-800 w-10 h-10" />
      </div>
    );
  }

  if (firstRoute === 'admin' && session?.user.role === 'user') {
    router.replace('/');
  }

  if (firstRoute === 'auth' && session?.user) {
    router.replace('/');
  }

  if (firstRoute && privateRoute.includes(firstRoute) && !session?.user) {
    router.replace('/auth/signin');
  }

  if (isMobile) {
    return (
      <div className="relative w-full min-h-screen">
        {!privateRoute.includes(firstRoute || '') && firstRoute !== 'auth' && <MobileNavbar />}
        {children}
      </div>
    );
  } else {
    return (
      <div className="relative w-full min-h-screen">
        <DesktopNavbar />
        {children}
      </div>
    );
  }
};

export default ProtectedPages;
