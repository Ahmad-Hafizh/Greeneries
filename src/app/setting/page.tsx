'use client';
import DesktopSettingPage from '@/pages/setting/desktop.page';
import MobileSettingPage from '@/pages/setting/mobile.page';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const SettingPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });

  if (isMobile) {
    return <MobileSettingPage />;
  } else {
    return <DesktopSettingPage />;
  }
};

export default SettingPage;
