'use client';
import PlaceholderToLabelInput from '@/components/small-components/input/placeholderToLabel';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, MapPinned } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const newAddressSchema = z.object({
  addressName: z.string().nonempty(),
  street: z.string().nonempty(),
  unitNumber: z.string().nonempty(),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
  zipcode: z.string().nonempty(),
});

const AddAddressPage = () => {
  const form = useForm<z.infer<typeof newAddressSchema>>({
    resolver: zodResolver(newAddressSchema),
  });
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof newAddressSchema>) => {
    console.log(values);
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="nav flex gap-4 items-center">
        <div className="" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        {/* <p className="text-xl font-semibold">Add Address</p> */}
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-serif ">Add new address</h1>
          <p className="leading-tight text-lg font-medium text-gray-600">This should be your recident address, office or etc. the destination of delivery</p>
        </div>
        <Button variant={'outline'} className="text-xl py-4 h-fit border-gray-400">
          <MapPinned className="w-8 h-8" /> Find me
        </Button>
        <div className="flex items-center justify-center gap-4">
          <hr className="w-full mt-1 border-gray-400" />
          <p className="text-center">or</p>
          <hr className="w-full mt-1 border-gray-400" />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              name="addressName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PlaceholderToLabelInput label="Address name" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PlaceholderToLabelInput label="Country" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PlaceholderToLabelInput label="City" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="street"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PlaceholderToLabelInput label="Street" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                name="unitNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PlaceholderToLabelInput label="Unit" field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="zipcode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PlaceholderToLabelInput label="Zipcode" field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button className="text-xl py-4 bg-green-800 h-fit">Create address</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddAddressPage;
