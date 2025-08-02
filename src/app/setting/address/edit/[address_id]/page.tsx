/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { callApi } from '@/app/config/axios';
import EditAddressViews from '@/views/setting/address/edit';
import { Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EditAddressPage = () => {
  const param = useParams();
  const [detail, setDetail]: any = useState({});

  const getAddressDetail = async () => {
    try {
      const response = await callApi.get(`/address/detail/${param.address_id}`, { withCredentials: true });
      console.log(response.data);

      setDetail(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddressDetail();
  }, []);

  if (detail.address_name) {
    return <EditAddressViews detail={detail} />;
  } else {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="animate-spin duration-initial spin-in spin-out text-green-800 w-10 h-10" />
      </div>
    );
  }
};

export default EditAddressPage;
