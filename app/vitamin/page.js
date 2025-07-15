'use client';

import { useState, useEffect } from 'react';
import './serum.css';
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/vitamin');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="row">
          {currentItems.map((product, i) => {
            const firstImageUrl = product.images?.[0]?.url || '/placeholder.png';
            const firstImageAlt = product.images?.[0]?.alt || product.name;
            const discount = product.discount ?? 0;
            const original = product.original ?? (parseFloat(product.price) * 1.2).toFixed(2);
            const rating = product.rating ?? 4.5;
            const reviews = product.reviews ?? 10;
            const tags = product.tags ?? [];

            return (
              <div className="col-6 col-md-4 col-lg-3 mb-4" key={i}>
                <div className="product-card border rounded p-3 h-100 d-flex flex-column justify-content-between position-relative">
                  <div className="discount-badge-top">{discount}% OFF</div>

                  <div className="hover-icons d-flex justify-content-center align-items-center gap-3">
                    <span className="icon-circle"><FaHeart /></span>
                    <span className="icon-circle"><FaShoppingBag /></span>
                  </div>

                  <Link href={`/products/${product.slug}`} className="text-decoration-none d-block">
                    <img
                      src={firstImageUrl}
                      className="img-fluid mb-2 cursor-pointer"
                      alt={firstImageAlt}
                    />
                  </Link>

                  <div className="fw-bold text-truncate-1">{product.name}</div>
                  <div className="small text-muted text-truncate-2">{product.description}</div>

                  <div className="mt-2 fw-bold text-danger">
                    ₹{parseFloat(product.price).toLocaleString()}
                    <span className="text-muted fw-normal text-decoration-line-through ms-2">
                      ₹{original}
                    </span>
                    <span className="ms-2 text-success">{discount}%</span>
                  </div>
                  <div className="small mt-1">⭐ {rating} ({reviews})</div>
                  <div className="mt-1">
                    {tags.map((tag, idx) => (
                      <span key={idx} className="badge bg-light border text-muted me-2">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="align-self-center">{currentPage} / {totalPages}</span>
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
