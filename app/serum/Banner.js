'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const slides = [
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
];

function Banner() {
  // Dummy product data to simulate count
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
      {/* Subcategory Header */}
      {/* <div className="mb-4">
        <h4 className="fw-bold">Skin Care / Facial Care</h4>
        <div className="subcategory-nav d-flex gap-3 flex-wrap">
          {[
            'All',
            'Serums & Essences',
            'Toners & Mists',
            'Lotions & Moisturizers',
            'Creams',
            'Spot Cream',
            'Eye Creams & Eye Serums',
          ].map((cat) => (
            <span key={cat} className="subcategory-item text-secondary">
              {cat}
            </span>
          ))}
        </div>
      </div> */}

      {/* Product Count & Sort */}
      {/* <div className="d-flex justify-content-between align-items-center mb-4">
        <span>{products.length} Items</span>
        <select className="form-select w-auto ms-auto">
          <option>Sort by: Popularity</option>
          <option>Price Low to High</option>
          <option>Price High to Low</option>
        </select>
      </div> */}

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
                className="img-fluid w-100"
                style={{ height: '70vh', objectFit: 'cover' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Banner;
