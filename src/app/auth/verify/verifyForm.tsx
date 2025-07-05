'use client';
import { LockKeyhole } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { passwordSchema } from '@/lib/schema/auth.schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { callApi } from '@/app/config/axios';
import { useSearchParams } from 'next/navigation';

export function VerifyForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const queryParams = useSearchParams();
  const token = queryParams?.get('a_t');

  const onHandleSubmit = async (values: z.infer<typeof passwordSchema>) => {
    if (values.confirmPassword === values.password) {
      try {
        const response = await callApi.post(
          '/auth/verify/credentials',
          {
            password: values.password,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      throw new Error('Password Confirmation is incorrect');
    }
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onHandleSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a href="#" className="flex flex-col items-center gap-2 font-medium">
                <div className="flex size-8 items-center justify-center rounded-md">
                  <LockKeyhole className="size-6" />
                </div>
                <span className="sr-only">Acme Inc.</span>
              </a>
              <h1 className="text-xl font-bold">Verify & secure your account</h1>
              <div className="text-center text-sm">Verify and secure your account to enjoy our app</div>
            </div>
            <div className="flex flex-col gap-6">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <FormControl>
                      <Input id="confirmPassword" type="password" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Verify and Secure
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
