'use client';

import Image from 'next/image';
import './brand.css';  
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Page() {
  const brands = [
    { name: 'COSRX', src: '/images/brand-1.png' },
    { name: 'Beauty of Joseon', src: '/images/brand-2.jpg' },
    { name: 'numbuz:n', src: '/images/brand-3.png' },
    { name: 'TIRTIR', src: '/images/brand-4.png' },
    { name: 'peripera', src: '/images/brand-5.png' },
    { name: 'goodal', src: '/images/brand-6.png' },
    { name: 'AXIS-Y', src: '/images/brand-7.png' },
    { name: 'Isntree', src: '/images/brand-8.png' },
    { name: 'dAlba', src: '/images/brand-9.webp' },
    { name: 'Biodance', src: '/images/brand-10.png' },
    { name: 'MISSHA', src: '/images/brand-11.png' },
    { name: 'CLIO', src: '/images/brand-12.png' },
    { name: 'ETUDE', src: '/images/brand-13.png' },
    { name: 'innisfree', src: '/images/brand-14.png' },
  ];

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">Our Brands</h2>
        
        <div className="brand-marquee-row marquee-left">
          <div className="marquee-content">
            {brands.concat(brands).map((brand, index) => (
              <div key={`row1-${index}`} className="brand-item">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={200}
                  height={80}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        <div className="brand-marquee-row marquee-right">
          <div className="marquee-content">
            {brands.concat(brands).map((brand, index) => (
              <div key={`row2-${index}`} className="brand-item">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={200}
                  height={80}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
