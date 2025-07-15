'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { jwtDecode } from 'jwt-decode';
import './product.css';

export default function ProductPage({ token }) {
  const params = useParams();
  const slug = params?.slug;
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) {
          setError('Product not found');
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (!data || !data.product) {
          setError('Product not found');
          setLoading(false);
          return;
        }

        setProduct(data.product);
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = async () => {
    if (!token) {
      router.push('/intermediate');
      return;
    }

    let userId = null;
    try {
      const decoded = jwtDecode(token);
      userId = decoded?.id;
    } catch (err) {
      console.error('Failed to decode token:', err);
      alert('Invalid token');
      router.push('/intermediate');
      return;
    }

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          products_id: product.id,
          quantity: quantity,
          user_id: userId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/cart');
      } else {
        alert(data.error || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong while adding to cart');
    }
  };

  const handleBuyNow = async () => {
    if (!token) {
      router.push('/intermediate');
      return;
    }

    let userId = null;
    try {
      const decoded = jwtDecode(token);
      userId = decoded?.id;
    } catch (err) {
      console.error('Failed to decode token:', err);
      router.push('/intermediate');
      return;
    }

    try {
      const res = await fetch(`/api/get-address?user_id=${userId}`);
      if (!res.ok) throw new Error('Failed to check address');
      const data = await res.json();

      if (data?.hasAddress) {
        router.push('/cart');
      } else {
        router.push('/address');
      }
    } catch (err) {
      console.error('Error checking address:', err);
      router.push('/address');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">Loading...</div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return notFound();
  }

  const firstImage = product.images?.[0]?.image_url || '/images/default-product.webp';
  const firstAlt = product.images?.[0]?.alt || product.name;
  const discount = product.discount ?? 15;
  const originalPrice = product.original ?? (parseFloat(product.price) * 1.2).toFixed(2);
  const rating = product.rating ?? 5.0;
  const reviews = product.reviews ?? 19;

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-md-6 text-center">
            <div
              className="product-image-wrapper"
              onClick={() => setShowModal(true)}
              style={{ cursor: 'zoom-in' }}
            >
              <Image
                src={firstImage}
                alt={firstAlt}
                width={600}
                height={600}
                className="img-fluid rounded border p-3"
                style={{
                  objectFit: 'contain',
                  maxHeight: '600px',
                  width: '100%',
                  height: 'auto',
                }}
                priority
              />
              <div className="text-muted small mt-2">(Click to Zoom)</div>
            </div>
          </div>

          <div className="col-md-6">
            <h4 className="fw-bold mb-3">{product.name}</h4>

            <div className="d-flex align-items-center mb-2">
              <span className="me-2">⭐ {rating}</span>
              <span className="text-muted small">{reviews} Reviews</span>
            </div>

            <div className="fs-4 fw-bold text-danger mb-2">
              ₹{parseFloat(product.price).toFixed(2)}
              <span className="text-success ms-2">{discount}%</span>
              <span className="text-muted text-decoration-line-through ms-2">₹{originalPrice}</span>
            </div>
            <div className="text-muted mb-2 small">Inclusive of all taxes</div>

            <hr />

            <div className="mb-3 small">
              <span className="me-3">3 interest-free Payment by <strong>Simpl</strong></span>
              <span className="fw-bold">₹{(product.price / 3).toFixed(2)}</span>
            </div>

            <div className="mb-3 small">
              <span className="text-muted">Delivery Availability</span>
            </div>

            <div className="d-flex align-items-center small mb-4">
              <span className="me-3">✔️ 100% Authentic Guaranteed</span>
              <span className="ms-3">📦 Free Shipping Above ₹700</span>
            </div>

            <div className="d-grid gap-2 d-md-flex">
              <button className="btn btn-outline-dark flex-fill" onClick={addToCart}>
                Add To Cart
              </button>
              <button className="btn btn-dark flex-fill" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            <p className="mt-4 text-muted small">{product.description}</p>
          </div>
        </div>
      </div>

      <Footer />

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <span
            className="modal-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
          >
            &times;
          </span>

          <div
            className="modal-zoom-container"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              e.currentTarget.style.setProperty('--zoom-x', `${x}%`);
              e.currentTarget.style.setProperty('--zoom-y', `${y}%`);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={firstImage}
              alt={firstAlt}
              className="modal-zoom-image"
            />
          </div>
        </div>
      )}
    </>
  );
}
