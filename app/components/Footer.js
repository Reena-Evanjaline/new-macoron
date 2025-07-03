'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaPinterest,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-5 mt-5">
      <div className="container">
        <div className="row">

          {/* ABOUT */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">ABOUT</h6>
            <p className="small text-white">
              Made in Korea is your one stop online shop to purchase the trendiest Asian fashion and beauty products.
              We aim to bring a wide range and affordable selection in both fashion and beauty to worldwide, as well as sharing with you the latest tips and secrets in beauty and styling.
            </p>

           

          </div>

          {/* ABOUT MADE IN KOREA */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">ABOUT MADE IN KOREA</h6>
            <ul className="list-unstyled small text-white">
              {/* <li className="mb-2"><a href="#" className="text-decoration-none text-white">About Us</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white">Contact Us</a></li> */}
              <li className="mb-2"><a href="/terms" className="text-decoration-none text-white">Terms & Conditions</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* CUSTOMER CARE */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">CUSTOMER CARE</h6>
            <ul className="list-unstyled small text-white">
              <li className="mb-2"><a href="/faq" className="text-decoration-none text-white">Frequently Asked Questions (FAQs)</a></li>
            </ul>
          </div>

          {/* PROMOTION & PROGRAMS */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">PROMOTION & PROGRAMS</h6>
            <ul className="list-unstyled small text-white">
              <li className="mb-2"><a href="#" className="text-decoration-none text-white">Student and Graduate Discount</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-white">Made In Korea Reward Club</a></li>
            </ul>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="bg-dark bg-opacity-50 p-3 rounded small text-secondary" style={{ lineHeight: '1.5', maxWidth: '1000px', margin: '0 auto' }}>
              <strong>Disclaimer:</strong> We are solely a reseller of Korean beauty products and have no involvement in the formulation, manufacturing, testing, certification, or claims made by the original brands. All responsibility for product quality, safety, regulatory compliance, and certifications lies entirely with the respective manufacturers. Customers are advised to review product details and ingredients carefully before purchasing, and to consult with a medical professional if needed. By purchasing, users agree that they are doing so at their own discretion and that the manufacturer is solely responsible for the product and its effects.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-center py-3 border-top border-secondary mt-3">
        <small className="text-white">
          &copy; {new Date().getFullYear()} Made In Korea. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
