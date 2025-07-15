'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './serum.css';
import Image from 'next/image';

export default function Banner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if screen is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile(); // initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopSlides = [
    '/images/1.webp',
    '/images/2.webp',
    '/images/3.webp',
    '/images/4.webp',
    '/images/5.webp',
    '/images/6.webp',
    '/images/8.jpg',
    '/images/9.jpg',
    '/images/10.jpg',
    '/images/11.jpg',
    '/images/12.jpg',
    '/images/13.jpg',
    '/images/14.jpg',
    '/images/15.jpg',
  ];

  const mobileSlides = [
    '/images/mo-1.png',
    '/images/mo-2.png',
    '/images/mo-3.png',
    '/images/mo-4.png',
    '/images/mo-5.png',
    '/images/mo-6.png',
    '/images/mo-7.png',
    '/images/mo-8.png',
  ];

  return (
    <div className="container-fluid px-0">
      {isMobile ? (
        <div className="mobile-banner">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="w-100"
          >
            {mobileSlides.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="mobile-slide" style={{ position: "relative", aspectRatio: "3/2", width: "100%" }}>
                  <Image
                    src={image}
                    alt={`Mobile Slide ${index + 1}`}
                    fill
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="desktop-banner">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="w-100"
          >
            {desktopSlides.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="mobile-slide" style={{ position: "relative", aspectRatio: "3.84/1", width: "100%" }}>
                  <Image
                    src={image}
                    alt={`Mobile Slide ${index + 1}`}
                    fill
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
