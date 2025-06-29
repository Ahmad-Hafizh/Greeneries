'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Globe2Icon, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const MobileHomePage = () => {
  const { data: session, status } = useSession();
  return (
    <div className="p-8 flex flex-col gap-8 mb-20">
      {status == 'authenticated' && session.user.name && (
        <div className="flex flex-col gap-6">
          <div className="header flex justify-between items-center">
            <Avatar className="w-14 h-14">
              <AvatarImage src={session?.user.image as string} />
              <AvatarFallback className="text-xl bg-gray-200 font-semibold">{`${session?.user.name[0]}${session?.user.name[1]}`}</AvatarFallback>
            </Avatar>
            <div className="relative mr-2">
              <Bell className="w-8 h-8 " />
              <div className="absolute bottom-1 right-[-5px] w-5 h-5 flex items-center justify-center bg-green-800 rounded-full">
                <p className="leading-none text-sm font-semibold text-white">2</p>
              </div>
            </div>
          </div>
          <div className="">
            <p className="text-3xl font-semibold">
              Good Morning <span className="font-bold">{session.user.name.split(' ')[0]}</span>,
            </p>
            <p className="text-xl font-semibold">What things do you want to buy today ?</p>
          </div>
        </div>
      )}
      <div className="relative flex items-center">
        <Input placeholder="Search" className="border-2 py-5 px-4 rounded-full pr-9 font-medium text-lg" />
        <Search className="absolute right-3 text-gray-400 w-5 h-5" />
      </div>
      <div className="bg-green-800 text-white w-full p-4 rounded-xl flex justify-between">
        <div className="">
          <p className="text-sm">Current store :</p>
          <p className="text-2xl leading-tight font-semibold">Greeneries Kuningan</p>
        </div>
        <div className="flex flex-col justify-between items-end">
          <Globe2Icon />
          <p className="underline">ubah</p>
        </div>
      </div>
      <div className="deals-for-you flex flex-col gap-4">
        <p className="text-xl font-semibold">Deals for you</p>
        <Carousel className="relative rounded-xl overflow-hidden">
          <CarouselContent className="ml-2 gap-2 pr-10">
            {Array.from({ length: 5 }).map((e, i) => (
              <CarouselItem className="h-[200px] bg-gray-300 basis-11/12 rounded-xl flex items-center justify-center pl-2" key={i}>
                {i}
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <div className="absolute w-full top-1/2">
            <CarouselPrevious className="!left-0" />
            <CarouselNext className="!right-0" />
          </div> */}
        </Carousel>
      </div>

      <div className="category">
        <Carousel>
          <CarouselContent className="gap-2 ml-1">
            {Array.from({ length: 7 }).map((e, i) => (
              <CarouselItem key={i} className="p-4  rounded-full bg-gray-200 w-fit basis-auto">
                Medicine
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="deals-for-you flex flex-col gap-4">
        <p className="text-xl font-semibold">Product for you</p>
        <Carousel className="relative rounded-xl overflow-hidden">
          <CarouselContent className="ml-2 gap-2 pr-10">
            {Array.from({ length: 5 }).map((e, i) => (
              <CarouselItem className="h-[200px] bg-gray-300 basis-1/2 rounded-xl flex items-center justify-center pl-2" key={i}>
                {i}
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <div className="absolute w-full top-1/2">
            <CarouselPrevious className="!left-0" />
            <CarouselNext className="!right-0" />
          </div> */}
        </Carousel>
      </div>
    </div>
  );
};

export default MobileHomePage;
