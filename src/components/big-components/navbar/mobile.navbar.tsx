import { Button } from '@/components/ui/button';
import { Home, Package, ShoppingBag, ShoppingCart, User2Icon, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const MobileNavbar = () => {
  const { status } = useSession();
  const [isClosed, setIsClosed] = useState<boolean>(false);

  if (status == 'authenticated') {
    return (
      <div className="fixed bottom-0 z-50 bg-white w-full  p-6 border-t-2">
        <div className="flex flex-row justify-between px-4 mb-2">
          <div className="w-8 h-8">
            <Home className="text-green-700 w-8 h-8" />
          </div>
          <div className="w-8 h-8">
            <ShoppingCart className="text-green-700 w-8 h-8" />
          </div>
          <div className="w-8 h-8">
            <ShoppingBag className="text-green-700 w-8 h-8" />
          </div>
          <div className="w-8 h-8">
            <Package className="text-green-700 w-8 h-8" />
          </div>
          <div className="w-8 h-8">
            <User2Icon className="text-green-700 w-8 h-8" />
          </div>
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
            <Button className="text-lg">Sign in</Button>
            <Button variant={'outline'} className="text-lg">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default MobileNavbar;
