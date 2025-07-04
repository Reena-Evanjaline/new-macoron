'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { FaBars, FaSearch, FaHeart, FaPlane, FaUndo, FaTimes } from 'react-icons/fa';
import { BsBagFill } from 'react-icons/bs';
import './navbar.css';

export default function Navbar() {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [language, setLanguage] = useState('EN');
  const [activeMain, setActiveMain] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = {
    'Skin Care': {
      'Facial care': [{ name: 'Serum', link: '/serum' }],
      'Sun care': [{ name: 'Sunscreens', link: '/sunscreen' }]
    },
    'Make Up': {
      'Base Makeup': [{ name: 'BB & CC Creams', link: '/bbcream' }],
      'Eye Makeup': [{ name: 'Eyeliner', link: '/eyemakeup' }],
      'Lip Makeup': [{ name: 'Lipstick', link: '/lipmakeup' }]
    },
    'Hair Care': {
      'Hair Care': [{ name: 'Shampoo', link: '/shampoo' }],
    },
    'Body Care': {
      'Nails & Pedi': [{ name: 'Nail Polish', link: '/nailpolish' }],
    },
    'Men Care': {
      'Men Care': [{ name: 'Facial Creams & Moisturizers', link: '/facial' }],
    },
    'Beauty Tools': {
      'Beauty Tools': [{ name: 'Makeup Tools', link: '/makeup-tools' }],
    },
    'Health & Personal Care': {
      'Health Care': [{ name: 'Vitamin', link: '/vitamin' }],
    },
    'Perfume & Deodorant': {
      'Perfume & Deodorant': [{ name: 'Deodorant', link: '/deodorant' }],
    },
    'Life & Home': {
      'Room Fragrance': [{ name: 'Room fragrance', link: '/room-fragrance' }]
    },
    'Baby': {
      'Baby Bodywash': [{ name: 'Baby Bodywash', link: '/body-wash' }]
    },
    'K-POP': {
      'K-POP': [{ name: 'Album', link: '/k-pop' }]
    }
  };

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  useEffect(() => {
    const userId = Cookies.get('Authtoken');
    if (userId) {
      const decodedToken = jwtDecode(userId);
      setId(decodedToken?.id || null);
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    async function fetchCartCount() {
      try {
        const res = await fetch(`/api/get-cart?user_id=${id}`);
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();
        setCartCount((data.cartItems || []).length);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCartCount();
  }, [id]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className='sticky-top bg-light'>
        <div className="top-info-bar ">
          <div className="container d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex gap-4 flex-wrap align-items-center p-3">
              <Link href="/shipping" className="text-reset text-decoration-none">
                <div className="d-flex align-items-center gap-1 fs-7" style={{fontSize:"12px"}}>
                  <FaPlane size={14} /> <span className="text-muted  fs-7">INTERNATIONAL SHIPPING</span>
                </div>
              </Link>
              <Link href="/faq" className="text-reset text-decoration-none" style={{fontSize:"12px"}}>
                <div className="d-flex align-items-center gap-1">
                  <FaUndo size={14} /> <span>FAQ</span>
                </div>
              </Link>
            </div>
            <div className="d-flex align-items-center gap-3">
              <select
                className="form-select form-select-sm w-auto"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="EN">EN</option>
                <option value="KR">KR</option>
                <option value="JP">JP</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="navbar-wrapper sticky-top p-lg-4 bg-white">
          <nav className="navbar navbar-expand-lg navbar-light bg-white px-3 py-2">

            {/* Mobile Header */}
            <div className="d-flex d-lg-none align-items-center gap-2 mb-2 me-auto">
              <FaBars className="fs-4 cursor-pointer btn p-0 mt-2" onClick={() => setMobileMenuOpen(true)} />
              <Image
                src="/images/lo-mobile.png"
                alt="Mobile Logo"
                width={23}
                height={45}
                priority
              />
            </div>

            {/* Desktop Left Section */}
            <div className="d-none d-lg-flex align-items-center gap-3 flex-shrink-1">
              <div className="dropdown mega-hover position-relative">
                <span className="nav-link dropdown-toggle mt-2 mt-md-0" role="button">
                  <FaBars className="me-1" /> Category
                </span>
                <div className="mega-menu">
                  <div className="row w-100">
                    <div className="col-3 border-end">
                      <ul className="mb-0">
                        {Object.keys(categories).map((main) => (
                          <li
                            key={main}
                            onMouseEnter={() => {
                              setActiveMain(main);
                              setActiveSub(null);
                            }}
                            className={`cursor-pointer ${activeMain === main ? 'text-pink fw-bold' : ''}`}
                          >
                            {main}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {activeMain && Object.keys(categories[activeMain]).length > 0 && (
                      <div className="col-3 border-end">
                        <ul className="mb-0">
                          {Object.keys(categories[activeMain]).map((sub) => (
                            <li
                              key={sub}
                              onMouseEnter={() => setActiveSub(sub)}
                              className={`cursor-pointer ${activeSub === sub ? 'text-pink fw-bold bg-light-rounded' : ''}`}
                            >
                              {sub}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {activeMain && activeSub && (
                      <div className="col-6">
                        <ul className="mb-0">
                          {categories[activeMain][activeSub].map((item, i) => (
                            <li key={i}>
                              <Link href={item.link} className="text-dark text-decoration-none">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <a className="nav-link" href="/brand">Brand</a>
              <a className="nav-link" href="#">Exclusive Offers</a>
            </div>

            {/* Desktop Center Logo */}
            <div className="position-absolute top-50 start-50 translate-middle d-none d-lg-block">
              <Image
                src="/images/lo.png"
                alt="Desktop Logo"
                width={450}
                height={300}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>

            {/* Right Icons and Search */}
            <div className="d-flex align-items-center gap-3 ms-auto">
              <div className="input-group d-none d-lg-flex" style={{ maxWidth: '150px' }}>
                <input
                  type="text"
                  className="form-control form-control-sm border rounded-start"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  style={{ height: '32px' }}
                />
                <button
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center rounded-end"
                  type="button"
                  onClick={handleSearch}
                  style={{ height: '32px', width: '36px' }}
                >
                  <FaSearch size={14} />
                </button>
              </div>

              <FaSearch
                className="fs-5 cursor-pointer mt-1 d-lg-none"
                onClick={() => setMobileMenuOpen(true)}
              />

              <FaHeart className="fs-5 cursor-pointer mt-1" />

              <div className="position-relative">
                <Link href="/cart" passHref>
                  <div className="text-dark position-relative" style={{ cursor: 'pointer' }}>
                    <BsBagFill className='fs-5' />
                    {cartCount > 0 && (
                      <span className="cart-badge bg-danger text-white">
                        {cartCount > 10 ? '10+' : cartCount}
                      </span>
                    )}
                  </div>
                </Link>
              </div>

              <Link href="/intermediate" className="nav-link fw-medium d-none d-lg-block">
                Login
              </Link>
            </div>

          </nav>
        </div>
      </div>
      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Categories</h5>
                <FaTimes className="cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
              </div>
              <div className="input-group mt-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  onClick={handleSearch}
                >
                  <FaSearch size={14} />
                </button>
              </div>
            </div>

            <ul className="list-unstyled">
              {Object.keys(categories).map((main) => (
                <li key={main} className="mb-2">
                  <span
                    className="fw-bold cursor-pointer"
                    onClick={() => setActiveMain(activeMain === main ? null : main)}
                  >
                    {main}
                  </span>
                  {activeMain === main && Object.keys(categories[main]).length > 0 && (
                    <ul className="list-unstyled ms-3 mt-2">
                      {Object.keys(categories[main]).map((sub) => (
                        <li key={sub} className="mb-1">
                          <span
                            className="cursor-pointer"
                            onClick={() => setActiveSub(activeSub === sub ? null : sub)}
                          >
                            {sub}
                          </span>
                          {activeSub === sub && categories[main][sub] && (
                            <ul className="list-unstyled ms-3">
                              {categories[main][sub].map((item, i) => (
                                <li key={i}>
                                  <Link href={item.link} className="text-decoration-none">
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
