'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LogOut, MapPin, SwitchCamera, User2 } from 'lucide-react';
import { signOut } from 'next-auth/react';

const MobileSettingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session?.user.name && status !== 'authenticated') {
    router.replace('/');
  }

  const settingList = [
    {
      name: 'General',
      list: [
        {
          name: 'Profile',
          icon: <User2 />,
          onclick: () => router.push('/setting/profile'),
        },
        {
          name: 'Address',
          icon: <MapPin />,
          onclick: () => router.push('/setting/address'),
        },
      ],
    },

    {
      name: 'Account Management',
      list: [
        {
          name: 'Logout',
          icon: <LogOut />,
          onclick: () => {
            signOut();
            router.replace('/');
          },
        },
        {
          name: 'Switch Account',
          icon: <SwitchCamera />,
          onclick: () => {
            signOut();
            router.replace('/auth/signin');
          },
        },
      ],
    },
  ];

  return (
    <div className="p-8 flex flex-col gap-8 min-h-screen">
      <div className="nav flex gap-4 items-center">
        <div className="" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <p className="text-xl font-semibold">Settings</p>
      </div>
      <div className="top mt-2 flex flex-col items-center justify-center gap-4">
        <Avatar className="w-28 h-28 text-3xl font-semibold">
          <AvatarImage src={session?.user.image as string} />
          <AvatarFallback className="bg-gray-200 uppercase font-serif">{session?.user.name ? `${session?.user.name[0]}${session?.user.name[1]}` : ''}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold capitalize font-serif">{session?.user.name}</p>
          <p className="text-lg font-medium text-gray-500 ">{session?.user.email}</p>
        </div>

        <div className="setting-list flex flex-col items-start justify-start w-full mt-4 gap-4 ">
          {settingList.map((item, idx) => (
            <div className="w-full flex flex-col gap-2" key={idx}>
              <p className="font-semibold text-lg">{item.name}</p>
              <div className="flex flex-col bg-gray-200 rounded-xl">
                {item.list.map((e, i) => (
                  <div className="text-lg font-semibold flex items-center justify-start p-4 cursor-pointer gap-2 " onClick={e.onclick} key={i}>
                    {e.icon}
                    <p className="leading-tight text-lg">{e.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSettingPage;
