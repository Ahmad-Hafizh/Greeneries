'use client';
import DesktopHomePage from '@/pages/homepage/desktop.page';
import MobileHomePage from '@/pages/homepage/mobile.page';
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
