'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './serum.css';   

const slides = [
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
];

export default function Banner() {
  const [products] = useState([
    { name: 'Product 1' },
    { name: 'Product 2' },
    { name: 'Product 3' },
    { name: 'Product 4' },
    { name: 'Product 5' },
    { name: 'Product 6' },
  ]);

  return (
    <div className="container-fluid">
      {/* Swiper Banner */}
      <div className="container-fluid px-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="w-100"
        >
          {slides.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="img-fluid w-100 banner-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
