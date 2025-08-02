import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

const ExplorePage = () => {
  return (
    <div className="p-8 flex flex-col gap-8 mb-20">
      <div className="relative flex bordr items-center ">
        <Input placeholder="Search" className="border-gray-600 placeholder:text-lg text-lg pr-7 leading-tight h-fit py-2 " />
        <Search className="absolute right-2 text-gray-500 w-5 h-5" />
      </div>
    </div>
  );
};

export default ExplorePage;
