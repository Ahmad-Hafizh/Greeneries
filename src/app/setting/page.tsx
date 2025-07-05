'use client';
import DesktopSettingPage from '@/views/setting/desktop.setting';
import MobileSettingPage from '@/views/setting/mobile.setting';
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
