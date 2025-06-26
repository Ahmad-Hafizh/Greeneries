import { GalleryVerticalEnd } from 'lucide-react';
import { SignupForm } from './signupForm';

export default function SignInPage() {
  return (
    <div className="flex flex-col-reverse lg:grid lg:min-h-svh lg:grid-cols-2">
      <div className="absolute bottom-0 z-10 bg-white w-full lg:relative rounded-t-3xl overflow-hidden lg:rounded-none flex flex-col gap-4 p-6 md:p-10 h-fit lg:h-full">
        <div className="hidden md:flex justify-center gap-2 lg:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex lg:flex-1 items-center justify-center h-fit">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative h-screen z-0 w-full">
        <img src="/3.jpg" alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale brightness-50" />
      </div>
    </div>
  );
}
