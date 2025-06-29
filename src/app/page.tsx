'use client';
import DesktopNavbar from '@/components/big-components/navbar/desktop.navbar';
import MobileNavbar from '@/components/big-components/navbar/mobile.navbar';
import DesktopHomePage from '@/pages/homepage/desktop.page';
import MobileHomePage from '@/pages/homepage/mobile.page';
import { useMediaQuery } from 'react-responsive';
// import { useSession } from 'next-auth/react';

export default function Home() {
  // const { data: user } = useSession();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });

  if (isMobile) {
    return (
      <div className="relative w-full min-h-screen">
        <MobileNavbar />
        <MobileHomePage />
      </div>
    );
  } else {
    return (
      <div className="relative w-full min-h-screen">
        <DesktopNavbar />
        <DesktopHomePage />
      </div>
    );
  }
}
