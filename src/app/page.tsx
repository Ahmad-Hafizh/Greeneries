'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: user } = useSession();

  return <div className="">email: {user?.user?.email}</div>;
}
