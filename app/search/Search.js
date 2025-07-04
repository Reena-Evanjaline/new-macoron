'use client';

export const dynamic = 'force-dynamic'; 
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // ✅ FIX: send the right query param
        const res = await fetch(`/api/search-product?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        console.log(data);
        
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Search error:', err);
        setLoading(false);
      }
    };

    if (query) fetchResults();
    else setLoading(false);
  }, [query]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Search Results for "{query}"</h2>
      <div className="row">
        {products.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          products.map((product, index) => (
            <div className="col-6 col-lg-3 mb-4" key={index}>
              <div className="p-3 shadow-sm rounded bg-white h-100 text-center">
                <Link href={`/products/${product.slug}`} className="text-decoration-none d-block">
                  <Image
                    src={product.images?.[0] || '/images/no-image.png'}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="rounded img-fluid"
                    style={{ objectFit: 'contain' }}
                  />
                  <p className="mt-2 mb-1 fw-medium text-dark">{product.name}</p>
                  <p className="mb-0 fw-semibold text-dark">₹{product.price}</p>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
