'use client';
import DesktopCartPage from '@/views/cart/desktop.homepage';
import MobileCartPage from '@/views/cart/mobile.homepage';
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
