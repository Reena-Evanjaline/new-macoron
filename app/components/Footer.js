'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaPinterest,
} from 'react-icons/fa';

function MobileFooter() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5 position-relative">
      <div className="container">
        <div className="col-12 mb-3" style={{ textAlign: 'justify' }}>
          <h6 className="fw-bold mb-2">ABOUT MADE IN KOREA</h6>
          <p>
            Address: D3, Tulash Garden, 3rd Street, Baby Nagar, Velachery, Chennai 600042
          </p>
        </div>
        <div className="col-12 mb-3" style={{ textAlign: 'justify' }}>
          <h6 className="fw-bold mb-2">DISCLAIMER</h6>
          <p className="small text-white" style={{ lineHeight: '1.5' }}>
            We are solely a reseller of Korean beauty products and have no involvement in
            their formulation or manufacturing. Responsibility lies with the original brands.
            Customers should review details and consult professionals if needed.
          </p>
        </div>
        <div className="row mt-4 mb-3">
          <div className="col text-center">
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="text-white fs-5"><FaFacebookF /></a>
              <a href="#" className="text-white fs-5"><FaInstagram /></a>
              <a href="#" className="text-white fs-5"><FaYoutube /></a>
              <a href="#" className="text-white fs-5"><FaTwitter /></a>
              <a href="#" className="text-white fs-5"><FaPinterest /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <Image
            src="/images/1-logo.png"
            alt="Made in Korea Logo"
            width={80}
            height={80}
            className="footer-logo"
            priority
          />
        </div>
        <small className="d-block mt-3">
          &copy; {new Date().getFullYear()} Made In Korea. All rights reserved.
        </small>
      </div>
    </footer>
  );
}

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <MobileFooter />;
  }

  return (
    <footer className="bg-black text-white pt-5 mt-5 position-relative">
      <div className="container position-relative">
        <div className="row gy-4">
          {/* ABOUT */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 pb-2">ABOUT</h6>
            <p className="small text-white">
              Made in Korea is your one-stop shop for the trendiest Asian fashion and beauty products. We offer an affordable, wide selection worldwide, plus the latest tips and secrets in beauty and styling.
            </p>
            <p>This Site is Developed for Dr KIM ESTHER HYANG SOOK, CEO INKOMO</p>
          </div>

          {/* ABOUT MADE IN KOREA */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 pb-2">ABOUT MADE IN KOREA</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/terms" className="text-decoration-none text-white">Terms & Conditions</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">Privacy Policy</a>
              </li>
            </ul>
            <p>Address: D3, Tulash Garden, 3rd Street, Baby Nagar, Velachery, Chennai 600042</p>
          </div>

          {/* CUSTOMER CARE */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 pb-2">CUSTOMER CARE</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/faq" className="text-decoration-none text-white">Frequently Asked Questions (FAQs)</a>
              </li>
            </ul>
             <div className="footer-logo-container">
          <Image
            src="/images/1-logo.png"
            alt="Made in Korea Logo"
            width={50}
            height={50}
            className="footer-logo"
            priority
          />
        </div>
          </div>

          {/* DISCLAIMER */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 pb-2">DISCLAIMER</h6>
            <p className="small text-white" style={{ lineHeight: '1.5' }}>
              We are solely a reseller of Korean beauty products and have no involvement in their formulation or manufacturing. Responsibility lies with the original brands. Customers should review details and consult professionals if needed.
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="row mt-4">
          <div className="col text-center">
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="text-white fs-5"><FaFacebookF /></a>
              <a href="#" className="text-white fs-5"><FaInstagram /></a>
              <a href="#" className="text-white fs-5"><FaYoutube /></a>
              <a href="#" className="text-white fs-5"><FaTwitter /></a>
              <a href="#" className="text-white fs-5"><FaPinterest /></a>
            </div>
          </div>
        </div>

        {/* Desktop Logo in Corner */}

      </div>

      <div className="text-center py-3 mt-4 border-top border-white">
        <small className="text-white">
          &copy; {new Date().getFullYear()} Made In Korea. All rights reserved.
        </small>
      </div>

    </footer>
  );
}
