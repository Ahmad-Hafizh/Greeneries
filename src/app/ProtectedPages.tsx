'use client';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

interface IProtectedPages {
  children: ReactNode;
}

const ProtectedPages = ({ children }: IProtectedPages) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const firstRoute = pathname.split('/')[1];
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

  if (privateRoute.includes(firstRoute) && !session?.user) {
    router.replace('/auth/signin');
  }

  return <div>{children}</div>;
};

export default ProtectedPages;
