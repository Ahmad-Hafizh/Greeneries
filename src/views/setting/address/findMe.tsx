import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// import { callApi } from '@/app/config/axios';
import PlaceholderToLabelInput from '@/components/small-components/input/placeholderToLabel';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { MapPinned } from 'lucide-react';
import { callApi } from '@/app/config/axios';

const addressByCoordinates = z.object({
  address_name: z.string().nonempty(),
  lat: z.string(),
  lng: z.string(),
});

const FindMe = () => {
  const form = useForm<z.infer<typeof addressByCoordinates>>({
    resolver: zodResolver(addressByCoordinates),
  });

  const onSubmit = async (values: z.infer<typeof addressByCoordinates>) => {
    try {
      const response = await callApi.post(
        '/address/create/reverse',
        {
          ...values,
        },
        { withCredentials: true }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue('lat', position.coords.latitude.toString());
          form.setValue('lng', position.coords.longitude.toString());
        },
        () => {
          console.log('error');
        }
      );
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={'outline'} className="text-xl py-4 h-fit border-gray-400" onClick={getLocation} type="button">
          <MapPinned className="w-8 h-8" /> Find me
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DrawerHeader className="flex flex-col gap-2">
              <DrawerTitle className="text-xl font-serif">Your new address name</DrawerTitle>
              <FormField
                name="address_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PlaceholderToLabelInput field={field} label="Address name" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </DrawerHeader>
            <DrawerFooter>
              <Button type="submit" className="bg-green-800 text-white h-fit py-4">
                Submit
              </Button>
              <DrawerClose>
                <Button variant="outline" type="button" className="h-fit py-4 w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default FindMe;
