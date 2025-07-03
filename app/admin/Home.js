"use client";
import React from 'react';

import ProductDetails from './ProductDetails';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const Home = () => {
  return (
    <>
    <Navbar/>
      <ProductDetails />
      <Footer/>
    </>
  );
};

export default Home;
 