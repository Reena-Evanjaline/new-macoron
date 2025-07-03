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
      'Room Fragrance':[{name:'Room fragrance',link:'/room-fragrance'}]
    },
    'Baby': {
       'Baby Bodywash':[{name:'Baby Bodywash',link:'/body-wash'}]
    },
    'K-POP': {
       'K-POP':[{name:'Album',link:'/k-pop'}]
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

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-light border-bottom py-1 small sticky-top">
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex gap-4 flex-wrap align-items-center">
            <Link href="/shipping" className="text-reset text-decoration-none">
              <div className="d-flex align-items-center gap-1">
                <FaPlane size={14} /> <span className="text-muted">INTERNATIONAL SHIPPING</span>
              </div>
            </Link>
            <Link href="/faq" className="text-reset text-decoration-none">
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
            <a href="#" className="text-dark"><i className="bi bi-bell"></i></a>
          </div>
        </div>
     

      {/* Main Navbar */}
      <div className="container-fluid px-0 mt-2 sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light bg-white  px-3 py-2">
          
          {/* Mobile Header */}
          <div className="d-flex d-lg-none align-items-center gap-2 me-auto">
            <FaBars className="fs-4 cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
            <Image src="/images/lo.png" alt="Logo" width={300} height={200} priority />
          </div>

          {/* Desktop Left Section */}
          <div className="d-none d-lg-flex align-items-center gap-3 flex-shrink-1">
            <div className="dropdown mega-hover position-relative">
              <span className="nav-link dropdown-toggle" role="button">
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
            {/* <a className="nav-link fw-bold" href="#"><span className="text-muted">Global Store</span></a> */}
          </div>

          {/* Desktop Center Logo */}
          <div className="position-absolute top-50 start-50 translate-middle d-none d-lg-block">
            <Image src="/images/lo.png" alt="Logo" width={450} height={300} style={{ objectFit: 'contain' }} priority />
          </div>

          {/* Right Icons */}
          <div className="d-flex align-items-center gap-3 ms-auto">
            <FaSearch className="fs-5 cursor-pointer mt-1" />
            <FaHeart className="fs-5 cursor-pointer mt-1" />
            <div className="position-relative">
              <Link href="/cart" passHref>
                <div className="text-dark position-relative" style={{ cursor: 'pointer' }}>
                  <BsBagFill className='fs-5' />
                  {cartCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-10px',
                        background: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '2px 6px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '25px',
                        textAlign: 'center',
                      }}
                    >
                      {cartCount > 10 ? '10+' : cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
            <Link href="/intermediate" className="nav-link fw-medium d-none d-lg-block">
              Log-In / Sign-Up
            </Link>
          </div>
        </nav>
      </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Categories</h5>
              <FaTimes className="cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
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
