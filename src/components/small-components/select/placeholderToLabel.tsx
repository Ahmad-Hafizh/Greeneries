/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface IPlaceholderToLabel {
  label: string;
  field: any;
  disabled?: boolean;
  items: any[];
  itemValue: string;
  onValueChange?: (e: any) => void;
}

const PlaceholderToLabelSelect = ({ label = '', field, items, itemValue, disabled, onValueChange }: IPlaceholderToLabel) => {
  return (
    <Select {...field} onValueChange={onValueChange ? (e) => onValueChange(e) : field.onChange} disabled={disabled}>
      <SelectTrigger className={`relative w-full group flex items-center !h-fit text-xl !py-5 !pl-4 flex-1 border-gray-400  ${field.value && field.value !== '' && '!pt-7 !pb-3 '}`}>
        <SelectValue placeholder=" " />
        <Label className={`absolute text-xl  left-4 font-normal  pointer-events-none transition-all text-gray-500 ${field.value && field.value !== '' && 'top-2 text-sm '}`}>{label}</Label>
      </SelectTrigger>
      <SelectContent className="w-full">
        {items.map((e, i) => (
          <SelectItem value={e[itemValue]} key={i}>
            {e.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PlaceholderToLabelSelect;
