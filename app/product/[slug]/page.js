'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const products = [
  {
    name: 'Skinfood',
    slug: 'skinfood-royal-honey-propolis',
    description: 'ROYAL HONEY PROPOLIS ENRICH ESSENCE 50ml',
    price: 2152,
    original: 2690,
    discount: 20,
    img: '/images/serum-1.webp',
    rating: 4.9,
    reviews: 15763,
    tags: ['New', 'COD'],
  },
  {
    name: 'Cosrx',
    slug: 'cosrx-snail-essence',
    description: 'Advanced Snail 96 Mucin Power Essence 100mL',
    price: 1160,
    original: 1450,
    discount: 20,
    img: '/images/serum-2.jpg',
    rating: 4.9,
    reviews: 8000,
    tags: ['COD'],
  },
  {
    name: 'Beauty of Joseon',
    slug: 'beauty-of-joseon-ginseng',
    description: 'Ginseng Essence Water 150ml',
    price: 2400,
    original: 3000,
    discount: 20,
    img: '/images/serum-3.png',
    rating: 4.8,
    reviews: 1520,
    tags: ['COD'],
  },
  {
    name: 'S.Nature',
    slug: 'snature-aqua-squalane',
    description: 'Aqua Squalane Serum 50ml',
    price: 1190,
    original: 1700,
    discount: 30,
    img: '/images/serum-4.jpg',
    rating: 5.0,
    reviews: 180,
    tags: ['COD'],
  },
  {
    name: 'Skinfood',
    slug: 'skinfood-royal-honey-propolis-2',
    description: 'ROYAL HONEY PROPOLIS ENRICH ESSENCE 50ml',
    price: 2152,
    original: 2690,
    discount: 20,
    img: '/images/serum-5.jpg',
    rating: 4.9,
    reviews: 15763,
    tags: ['New', 'COD'],
  },
  {
    name: 'Cosrx',
    slug: 'cosrx-snail-essence-2',
    description: 'Advanced Snail 96 Mucin Power Essence 100mL',
    price: 1160,
    original: 1450,
    discount: 20,
    img: '/images/serum-6.jpg',
    rating: 4.9,
    reviews: 8000,
    tags: ['COD'],
  },
  {
    name: 'Beauty of Joseon',
    slug: 'beauty-of-joseon-ginseng-2',
    description: 'Ginseng Essence Water 150ml',
    price: 2400,
    original: 3000,
    discount: 20,
    img: '/images/serum-7.jpg',
    rating: 4.8,
    reviews: 1520,
    tags: ['COD'],
  },
  {
    name: 'S.Nature',
    slug: 'snature-aqua-squalane-2',
    description: 'Aqua Squalane Serum 50ml',
    price: 1190,
    original: 1700,
    discount: 30,
    img: '/images/serum-8.jpg',
    rating: 5.0,
    reviews: 180,
    tags: ['COD'],
  },
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const match = products.find((p) => p.slug === slug);
    setProduct(match);
  }, [slug]);

  if (!product) return <div className="container mt-5">Product not found.</div>;

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row align-items-start gap-4">
          <div className="col-md-6 text-center">
            <div className="p-3 bg-light rounded shadow-sm">
              <Image
                src={product.img}
                width={450}
                height={450}
                className="img-fluid rounded"
                alt={product.name}
              />
            </div>
          </div>

          <div className="col-md-5">
            <h2 className="fw-bold mb-3">{product.name}</h2>
            <p className="text-muted mb-3">{product.description}</p>

            <div className="fs-3 fw-semibold text-danger">
              ₹{product.price.toLocaleString()}
              <span className="text-muted text-decoration-line-through fs-6 ms-2">
                ₹{product.original.toLocaleString()}
              </span>
              <span className="ms-2 text-success">{product.discount}% OFF</span>
            </div>

            <div className="mt-2 mb-3">⭐ {product.rating} ({product.reviews} reviews)</div>

            <hr />

            <div className="mb-3">
              <strong>Please Select Variant:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {product.variants?.map((v, i) => (
                  <button key={i} className="btn btn-outline-secondary btn-sm rounded-pill">
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-danger px-4 py-2 rounded-pill">Add To Cart</button>
              <Link href="/address">
                <button className="btn btn-dark px-4 py-2 rounded-pill text-white">
                  Buy Now
                </button>
              </Link>
            </div>

            <div className="mt-4 d-flex flex-column gap-2 text-muted small">
              <div>✅ 100% Authentic Guaranteed</div>
              <div>📦 Free Shipping Above ₹700</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
