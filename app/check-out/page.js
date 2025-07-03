// File: app/cart/page.jsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const initialCart = [
  {
    id: 1,
    name: 'ROYAL HONEY PROPOLIS ENRICH ESSENCE 50ml',
    brand: 'Skinfood',
    img: '/images/serum-1.webp',
    price: 2152,
    original: 2690,
    discount: 20,
  },
  {
    id: 2,
    name: 'POTATO MADECASSOSIDE SOOTHING PAD 250g',
    brand: 'Skinfood',
    img: '/images/serum-6.jpg',
    price: 1752,
    original: 2190,
    discount: 20,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const originalTotal = cart.reduce((acc, item) => acc + item.original, 0);
  const saved = originalTotal - total;

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            <div className="border rounded p-3 mb-3">
            
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" checked readOnly />
                <label className="form-check-label">Select All ({cart.length}/{cart.length})</label>
              </div>
              {cart.map((item) => (
                <div key={item.id} className="d-flex align-items-start gap-3 mb-4 border-top pt-3">
                  <input type="checkbox" checked readOnly className="form-check-input mt-2" />
                  <Image src={item.img} width={80} height={80} alt={item.name} className="rounded" />
                  <div className="flex-grow-1">
                    <div className="fw-bold">[{item.brand}] {item.name}</div>
                    <span className="badge bg-light text-dark mt-1">COD</span>
                    <div className="fw-bold text-danger mt-1">
                      ₹{item.price.toLocaleString()} <span className="text-muted text-decoration-line-through ms-2">₹{item.original.toLocaleString()}</span>
                      <span className="ms-2 text-pink">{item.discount}%</span>
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn btn-outline-danger btn-sm mt-2">Remove Selected Items</button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded p-4">
              <h5 className="fw-bold mb-3">Total</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Retail Price</span>
                <span>₹{originalTotal.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-danger">Saved</span>
                <span className="text-danger">-₹{saved.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Estimated Shipping Fee</span>
                <span>₹0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <p className="text-muted small mt-2">All taxes included</p>
              <p className="text-muted small">or 3 interest free payments of ₹{(total / 3).toFixed(2)} with Simpl</p>
              <button className="btn w-100 mt-3 text-white" style={{ background: 'linear-gradient(to right, #ff5ed0, #d63384)' }}>
                Checkout →
              </button>
              <p className="text-muted small mt-2">* Vouchers can be applied on the checkout page.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
