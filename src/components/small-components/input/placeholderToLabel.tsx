/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeClosed } from 'lucide-react';
import React from 'react';

interface IPlaceholderToLabel {
  label: string;
  field: any;
  type?: string;
  disabled?: boolean;
}

const PlaceholderToLabelInput = ({ label, field, type = 'text', disabled = false }: IPlaceholderToLabel) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  if (type == 'password') {
    return (
      <div className="relative w-full h-fit group flex items-center">
        <Input
          type={isVisible ? 'text' : 'password'}
          className={` peer text-lg py-5 pl-4 pr-11 focus:pt-7 focus:pb-3 flex-1 h-fit border-gray-400 focus-visible:ring-0 focus-visible:border-green-800 ${field.value && field.value !== '' && 'pt-7 pb-3 '}
      `}
          {...field}
          disabled={disabled}
        />
        <Label className={`absolute text-xl  left-4 font-normal peer-focus:text-sm peer-focus:top-2  pointer-events-none transition-all peer-focus:text-green-800 text-gray-500 ${field.value && field.value !== '' && 'top-2 text-sm '}`}>
          {label}
        </Label>
        <div className="absolute right-4 text-gray-500" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <Eye className="w-6 h-6" /> : <EyeClosed className="w-6 h-6" />}
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative w-full h-fit group flex items-center">
        <Input
          className={` peer text-lg py-5 pl-4 focus:pt-7 focus:pb-3 flex-1 h-fit border-gray-400 focus-visible:ring-0 focus-visible:border-green-800 ${field.value && field.value !== '' && 'pt-7 pb-3 '}
      `}
          {...field}
          disabled={disabled}
        />
        <Label className={`absolute text-xl  left-4 font-normal peer-focus:text-sm peer-focus:top-2  pointer-events-none transition-all peer-focus:text-green-800 text-gray-500 ${field.value && field.value !== '' && 'top-2 text-sm '}`}>
          {label}
        </Label>
      </div>
    );
  }
};

export default PlaceholderToLabelInput;
