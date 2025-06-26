import React from 'react';
import { ReqVerifyForm } from './reqVerify';

const ReqVerify = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ReqVerifyForm />
      </div>
    </div>
  );
};

export default ReqVerify;
