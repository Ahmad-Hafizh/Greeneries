'use client';
import DesktopHomePage from '@/views/homepage/desktop.homepage';
import MobileHomePage from '@/views/homepage/mobile.homepage';
import { useMediaQuery } from 'react-responsive';
// import { useSession } from 'next-auth/react';

export default function Home() {
  // const { data: user } = useSession();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });

  if (isMobile) {
    return <MobileHomePage />;
  } else {
    return <DesktopHomePage />;
  }
}
