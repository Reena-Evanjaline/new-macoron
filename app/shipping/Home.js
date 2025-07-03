"use client";
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Shipping from './Shipping';



const Home = () => {
  return (
    <>
    <Navbar/>
     <Shipping/> 
      <Footer/>
    </>
  );
};

export default Home;
 