"use client";
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Search from './Search';

const Home = () => {
  return (
    <>
    <Navbar/>
      <Search />
      <Footer/>
    </>
  );
};

export default Home;
 