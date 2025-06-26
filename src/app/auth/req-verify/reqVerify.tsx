'use client';
import { LockKeyhole } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { reqVerifySchema } from '@/lib/schema/auth.schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { callApi } from '@/app/config/axios';

export function ReqVerifyForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm<z.infer<typeof reqVerifySchema>>({
    resolver: zodResolver(reqVerifySchema),
  });

  const onHandleSubmit = async (values: z.infer<typeof reqVerifySchema>) => {
    try {
      const response = await callApi.post('/auth/req-verify', {
        email: values.email,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
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
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="m@example.com" required {...field} />
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
