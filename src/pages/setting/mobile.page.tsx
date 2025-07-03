'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const MobileSettingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session?.user.name && status !== 'authenticated') {
    router.replace('/');
  }

  return (
    <div className="p-8 flex flex-col gap-8 mb-20">
      <div className="nav flex gap-4 items-center">
        <div className="" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <p className="text-xl font-semibold">Settings</p>
      </div>
      <div className="top mt-4 flex flex-col items-center justify-center gap-4">
        <Avatar className="w-28 h-28 text-3xl font-semibold">
          <AvatarImage src={session?.user.image as string} />
          <AvatarFallback className="bg-gray-200">{session?.user.name ? `${session?.user.name[0]}${session?.user.name[1]}` : ''}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">{session?.user.name}</p>
          <p className="text-lg font-medium text-gray-500 ">{session?.user.email}</p>
        </div>

        <div className="setting-list flex items-start justify-start w-full mt-4 gap-2">
          <div
            className="text-xl font-semibold flex items-center justify-start gap-2 cursor-pointer"
            onClick={() => {
              signOut();
              router.replace('/');
            }}
          >
            <LogOut />
            <p className="leading-tight">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSettingPage;
