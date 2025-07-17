'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './serum.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
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
    { src: '/images/mo-1.png', link: '/brightening-cream' },
    { src: '/images/mo-2.png', link: '/brightening-cream' },
    { src: '/images/mo-3.png', link: '/brightening-cream' },
    { src: '/images/mo-4.png', link: '/brightening-cream' },
    { src: '/images/mo-5.png', link: '/brightening-cream' },
    { src: '/images/mo-6.png', link: '/exclusive' },
    { src: '/images/mo-7.png', link: '/brightening-cream' },
    { src: '/images/mo-8.png', link: '/brightening-cream' },
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
            {mobileSlides.map((image, index) => {
              const imgElement = (
                <div
                  className="mobile-slide"
                  style={{ position: 'relative', aspectRatio: '3/2', width: '100%' }}
                >
                  <Image
                    src={image.src}
                    alt={`Mobile Slide ${index + 1}`}
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              );

              return (
                <SwiperSlide key={index}>
                  {image.link ? (
                    <Link href={image.link}>{imgElement}</Link>
                  ) : (
                    imgElement
                  )}
                </SwiperSlide>
              );
            })}
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
                <div
                  className="desktop-slide"
                  style={{ position: 'relative', aspectRatio: '3.84/1', width: '100%' }}
                >
                  <Image
                    src={image}
                    alt={`Desktop Slide ${index + 1}`}
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
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
