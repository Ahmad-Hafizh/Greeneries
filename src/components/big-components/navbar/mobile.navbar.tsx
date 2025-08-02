import { Button } from '@/components/ui/button';
import { Home, Package, ShoppingBag, ShoppingCart, User2Icon, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const MobileNavbar = () => {
  const { status } = useSession();
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname()?.split('/')[1];

  const navList = [
    {
      icon: <Home className=" w-8 h-8" />,
      route: '/',
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      route: '/cart',
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      route: '/explore',
    },
    {
      icon: <Package className="w-8 h-8" />,
      route: '/transaction',
    },
    {
      icon: <User2Icon className="w-8 h-8" />,
      route: '/setting',
    },
  ];

  if (status == 'authenticated') {
    return (
      <div className="fixed bottom-0 z-50 bg-white w-full  p-6 border-t-2">
        <div className="flex flex-row justify-between px-4 mb-2">
          {navList.map((e, i) => (
            <div className={`w-8 h-8 cursor-pointer  ${e.route == `/${pathName}` ? 'text-green-800' : 'text-gray-400'}`} onClick={() => router.push(e.route)} key={i}>
              {e.icon}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (status == 'unauthenticated') {
    return (
      <div className={`${isClosed ? 'hidden' : 'block'}  fixed bottom-0 w-full  p-6 border-t-2 z-50 bg-white `}>
        <div className="flex-col gap-4 flex text-lg ">
          <div className="flex justify-between">
            <p className="text-lg font-medium">You are not signed in, Sign in or Sign up</p>
            <div className="" onClick={() => setIsClosed(true)}>
              <X />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="text-lg" onClick={() => router.push('/auth/signin')}>
              Sign in
            </Button>
            <Button variant={'outline'} className="text-lg" onClick={() => router.push('/auth/signup')}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default MobileNavbar;
