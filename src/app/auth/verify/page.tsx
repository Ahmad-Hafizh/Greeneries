import { VerifyForm } from '@/app/auth/verify/verifyForm';

export default function VerifyPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <VerifyForm />
      </div>
    </div>
  );
}
