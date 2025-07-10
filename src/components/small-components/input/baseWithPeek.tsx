/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-react';
import React from 'react';

interface IBaseWithPeekInput {
  field: any;
  type?: string;
  placeholder?: string;
}

const BaseWithPeekInput = ({ type = 'text', field, placeholder }: IBaseWithPeekInput) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  if (type == 'password') {
    return (
      <div className="w-full flex items-center relative">
        <Input type={isVisible ? 'text' : 'password'} {...field} placeholder={placeholder} />
        <div className="absolute right-2" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <Eye className="w-4 h-4" /> : <EyeClosed className="w-4 h-4" />}
        </div>
      </div>
    );
  } else {
    return <Input type={type} {...field} placeholder={placeholder} />;
  }
};

export default BaseWithPeekInput;
