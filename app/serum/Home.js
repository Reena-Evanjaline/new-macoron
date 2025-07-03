"use client";
import React from 'react';

import Navbar from '../components/Navbar';

import Serum from './Serum';
import Banner from './Banner';
import Footer from '../components/Footer';



const Home = () => {
  return (
    <>
    <Navbar/>
    
     <Serum/> 
     <Footer/>
     
    </>
  );
};

export default Home;
 