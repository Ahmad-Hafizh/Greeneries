'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const MobileCartPage = () => {
  const router = useRouter();
  return (
    <div className=" min-h-screen relative">
      <div className="p-8 flex flex-col gap-8  h-full">
        <div className="nav flex gap-4 items-center">
          <div className="" onClick={() => router.back()}>
            <ArrowLeft />
          </div>
          <p className="text-xl font-semibold">Cart</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 border p-4 rounded-xl">
            <div className="relative bg-gray-200 w-28 h-28 rounded-lg overflow-hidden"></div>
            <div className="flex-1 flex justify-between flex-col">
              <div className="flex flex-col">
                <p className="text-xl font-serif font-medium">Cabbage</p>
                <p className="text-base">100 gr</p>
              </div>
              <p className="text-xl font-semibold">Rp 20.000</p>
            </div>
            <div className="flex justify-end items-end">
              <div className="flex gap-3 items-center px-2 py-1 rounded-full bg-green-800 text-white font-serif">
                <Minus />
                1
                <Plus />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 p-8 flex-1 border-t py-4 flex justify-between w-full">
        <div className="">
          <p>total</p>
          <p className="text-xl font-semibold">Rp 20.000</p>
        </div>
        <Button className="text-xl bg-green-800 text-white">Check out</Button>
      </div>
    </div>
  );
};

export default MobileCartPage;
