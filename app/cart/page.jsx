'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        setLoading(true);

        const token = Cookies.get('Authtoken');
        if (!token) throw new Error('Not logged in');

        const decoded = jwtDecode(token);
        const userId = decoded?.id;
        if (!userId) throw new Error('Invalid user');

        const res = await fetch(`/api/get-cart?user_id=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch cart');

        const data = await res.json();

        const cleanedItems = (data.cartItems || []).map(item => ({
          ...item,
          price: Number(item.price) || 0,
          original: Number(item.original) || 0,
          quantity: Number(item.quantity) || 1,
          discount: Number(item.discount) || 0,
        }));

        setCart(cleanedItems);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load cart.');
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  // Totals
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const originalTotal = cart.reduce(
    (acc, item) => acc + item.original * item.quantity,
    0
  );
  const saved = originalTotal - total;

  // Delete a single item
  const handleDelete = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from cart.');
  };

  // Delete all items
  const handleClearCart = () => {
    setCart([]);
    toast.success('All items removed from cart.');
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            <div className="border rounded p-3 mb-3">

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={cart.length > 0}
                  readOnly
                />
                <label className="form-check-label">
                  Select All ({cart.length}/{cart.length})
                </label>
              </div>

              {loading && <p>Loading cart...</p>}
              {!loading && cart.length === 0 && <p>Your cart is empty.</p>}

              {!loading && cart.length > 0 && (
                <>
                  {cart.map(item => (
                    <div
                      key={item.id}
                      className="d-flex align-items-start gap-3 mb-4 border-top pt-3 position-relative"
                    >
                      <input
                        type="checkbox"
                        checked
                        readOnly
                        className="form-check-input mt-2"
                      />
                      <Image
                        src={item.image_url || '/images/placeholder.jpg'}
                        width={80}
                        height={80}
                        alt={item.name}
                        className="rounded"
                      />
                      <div className="flex-grow-1">
                        <div className="fw-bold">
                          [{item.brand}] {item.name}
                        </div>
                        <span className="badge bg-light text-dark mt-1">
                          COD
                        </span>
                        <div className="fw-bold text-danger mt-1">
                          ₹{item.price.toLocaleString()}
                          {item.original > item.price && (
                            <span className="text-muted text-decoration-line-through ms-2">
                              ₹{item.original.toLocaleString()}
                            </span>
                          )}
                          {item.discount > 0 && (
                            <span className="ms-2 text-pink">
                              {item.discount}% OFF
                            </span>
                          )}
                        </div>
                        <div className="mt-2">
                          Quantity: <strong>{item.quantity}</strong>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-sm btn-outline-danger mt-2"
                      >
                        Delete
                      </button>
                    </div>
                  ))}

                  <button
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={handleClearCart}
                  >
                    Remove Selected Items
                  </button>
                </>
              )}
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
                <span className="text-danger">
                  -₹{saved > 0 ? saved.toLocaleString() : '0'}
                </span>
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
              <p className="text-muted small">
                or 3 interest free payments of ₹{(total / 3).toFixed(2)} with Simpl
              </p>
              <Link
                href="/address"
                className="btn w-100 mt-3 text-white bg-danger"
              >
                Checkout →
              </Link>

              <p className="text-muted small mt-2">
                * Vouchers can be applied on the checkout page.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
