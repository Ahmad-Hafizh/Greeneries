/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { callApi } from '@/app/config/axios';
import { ArrowLeft, Edit, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AddressPage = () => {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);

  const getAddresses = async () => {
    try {
      const response = await callApi.get('/address/list', { withCredentials: true });
      setAddresses(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);
  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="nav flex gap-4 items-center">
        <div className="" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <p className="text-xl font-semibold">Address</p>
      </div>
      <div className="w-full flex flex-col gap-2 mb-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-serif">Address List</h1>
          <div className="flex items-center gap-1 p-2 pr-4 border rounded-full bg-green-900 text-white cursor-pointer" onClick={() => router.push('/setting/address/add')}>
            <Plus className="w-5 h-5" />
            <p className="text-base ">Create</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {addresses.map((e: any, i) => (
            <div className="border p-4 rounded-lg shadow flex justify-between" key={i}>
              <div className="">
                <div className="flex gap-2 items-center">
                  {/* <Home className="w-5 h-5" /> */}
                  <p className="text-lg font-semibold">{e.address_name}</p>
                </div>
                <p className="text-wrap">
                  {e.street}, {e.city}, {e.country}
                </p>
              </div>
              <div className="">
                <Edit className="w-5 h-5" onClick={() => router.push(`/setting/address/edit/${e.address_id}`)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
