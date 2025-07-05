import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Plus } from 'lucide-react';

interface IProduct {
  onClick: () => void;
  onAddCart: () => void;
  name: string;
  price: string;
  undiscountedPrice?: string;
  discount?: string;
  weight: string;
}

const ProductCard = () => {
  return (
    <Card className="w-full h-full p-0 gap-2 pb-4">
      <CardHeader className="px-2 pt-2 relative">
        <div className="relative w-full aspect-square overflow-hidden rounded-md ">
          <Image src={'/3.jpg'} fill alt="product image" className="absolute w-full h-full object-cover" />
        </div>
        <div className="p-2 flex items-center justify-center bg-green-700 text-white rounded-full absolute top-3 left-3">
          <p className="font-semibold leading-none">50% OFF</p>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <CardTitle className="text-lg font-serif">Cabbage</CardTitle>
        <CardDescription>200 gr</CardDescription>
      </CardContent>
      <CardFooter className="px-2 border-t !pt-2 flex justify-between items-end">
        <div className=" flex flex-col items-start">
          <p className="line-through text-sm leading-tight text-gray-600">Rp 50.000</p>
          <p className="font-bold text-lg leading-tight">Rp 20.000</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-green-700 flex items-center justify-center text-white">
          <Plus />
        </div>
        {/* <CardAction>+ add to cart</CardAction> */}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
