'use client';
import DesktopCartPage from '@/pages/cart/desktop.page';
import MobileCartPage from '@/pages/cart/mobile.page';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const CartPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });

  if (isMobile) {
    return <MobileCartPage />;
  } else {
    return <DesktopCartPage />;
  }
};

export default CartPage;
