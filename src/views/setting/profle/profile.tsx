'use client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Upload } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

const profileShema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  gender: z.string().optional(),
});

const ProfileViews = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof profileShema>>({
    resolver: zodResolver(profileShema),
    defaultValues: {
      name: session?.user.name as string,
      email: session?.user.email as string,
      phone: '',
      gender: '',
    },
  });

  const onUpdate = (values: z.infer<typeof profileShema>) => {
    console.log(values);
  };

  return (
    <div className="p-8 flex flex-col gap-8 ">
      <div className="nav flex gap-4 items-center">
        <div className="" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <p className="text-xl font-semibold">Profile</p>
      </div>
      <div className="flex items-center flex-col gap-2">
        <Avatar className="w-20 h-20 text-3xl font-semibold">
          <AvatarImage src={session?.user.image as string} />
          <AvatarFallback className="bg-gray-200 uppercase font-serif">{session?.user.name ? `${session?.user.name[0]}${session?.user.name[1]}` : ''}</AvatarFallback>
        </Avatar>
        <Drawer>
          <DrawerTrigger className="text-base font-medium">Change profile picture</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="flex items-center flex-col">
              <Upload />
              <DrawerTitle>Upload your picture here</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="flex flex-col gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="gender"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button>Update</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileViews;
