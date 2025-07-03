import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { MapPin, ShoppingCart, Vegan } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DesktopNavbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div className="nav  border-b py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between md:mx-4 lg:mx-8 gap-4">
          <div className="flex gap-1 items-center">
            <Vegan />
            <p className="text-xl font-semibold">Greeneries</p>
          </div>
          <div className="flex p-2 bg-green-800 text-white gap-1 rounded-full text-nowrap">
            <MapPin />
            <p>Greeneries Kuningan</p>
          </div>
          <div className="w-full">
            <Input placeholder="Search" />
          </div>
          {status == 'authenticated' && session.user.name ? (
            <div className="flex gap-4 items-center justify-end">
              <div className="">
                <ShoppingCart />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={session?.user.image as string} />
                    <AvatarFallback className="text-sm bg-gray-200 font-semibold uppercase">{session?.user.name && `${session?.user.name[0]}${session?.user.name[1]}`}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Button onClick={() => router.push('/auth/signup')}>Sign up</Button>
              {/* <Link href={'/auth/signup'} className="px-2 py-1 text-nowrap text-white bg-black">
                Sign up
              </Link> */}
              <Button onClick={() => router.push('/auth/signin')}>Sign in</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
