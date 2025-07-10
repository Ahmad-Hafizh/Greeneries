'use client';
import { ArrowLeft, Edit, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const AddressPage = () => {
  const router = useRouter();
  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="nav flex gap-4 items-center">
        <div className="" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <p className="text-xl font-semibold">Address</p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between mb-2 items-center">
          <h1 className="text-xl font-serif">Address List</h1>
          <div className="flex items-center gap-1 p-2 pr-4 border rounded-full bg-green-900 text-white cursor-pointer" onClick={() => router.push('/setting/address/add')}>
            <Plus className="w-5 h-5" />
            <p className="text-base ">Create</p>
          </div>
        </div>
        <div className="border p-4 rounded-lg shadow flex justify-between">
          <div className="">
            <div className="flex gap-2 items-center">
              {/* <Home className="w-5 h-5" /> */}
              <p className="text-lg font-semibold">My Home</p>
            </div>
            <p className="text-wrap">Jl.Meteorologi IV no23a, Medan, Indonesia</p>
          </div>
          <div className="">
            <Edit className="w-5 h-5" />
          </div>
        </div>
        <div className="border p-4 rounded-lg shadow flex justify-between">
          <div className="">
            <div className="flex gap-2 items-center">
              {/* <Home className="w-5 h-5" /> */}
              <p className="text-lg font-semibold">My Home</p>
            </div>
            <p className="text-wrap">Jl.Meteorologi IV no23a, Medan, Indonesia</p>
          </div>
          <div className="">
            <Edit className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
