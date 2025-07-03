'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AddressFormPage() {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const [form, setForm] = useState({
    user_id: '',
    country: '',
    fullName: '',
    mobile: '',
    pincode: '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
    defaultAddress: false,
    instructions: '',
  });

  // On load, get user_id from cookie
  useEffect(() => {
    const token = Cookies.get('Authtoken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded?.id || '');
        setForm((prev) => ({ ...prev, user_id: decoded?.id || '' }));
      } catch (err) {
        console.error('Invalid token', err);
        toast.error('Invalid login. Please log in again.');
      }
    }
  }, []);

  const states = [
    '', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.user_id) {
      toast.error('User not logged in!');
      return;
    }

    setLoading(true);

    try {
      // 1. First: Save address
      const res = await fetch('/api/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save address');
      }

      toast.success('Address submitted successfully!');

      // 2. Then: Trigger invoice
      const invoiceRes = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: form.user_id }),
      });

      if (!invoiceRes.ok) {
        const errorData = await invoiceRes.json();
        throw new Error(errorData.error || 'Failed to generate invoice');
      }

      toast.success('Invoice generated and sent to your email!');

      // Reset form except user_id
      setForm({
        user_id: userId,
        country: '',
        fullName: '',
        mobile: '',
        pincode: '',
        flat: '',
        area: '',
        landmark: '',
        city: '',
        state: '',
        defaultAddress: false,
        instructions: '',
      });

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="container my-5" style={{ maxWidth: '900px' }}>
        <ToastContainer position="top-right" autoClose={3000} />
        <h2 className="mb-4 fw-bold text-center">Add a New Address</h2>

        <form onSubmit={handleSubmit} className="border rounded p-4 shadow-sm bg-white">
          <input type="hidden" name="user_id" value={form.user_id} />

          <div className="mb-3">
            <label className="form-label fw-medium">Country/Region</label>
            <select
              className="form-select"
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            >
              <option value="">Choose country</option>
              <option value="India">India</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              required
            />
            <div className="form-text">May be used to assist delivery</div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Pincode</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              pattern="\d{6}"
              placeholder="6-digit PIN code"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Flat, House No., Building, Apartment</label>
            <input
              type="text"
              className="form-control"
              name="flat"
              value={form.flat}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Area, Street, Sector, Village</label>
            <input
              type="text"
              className="form-control"
              name="area"
              value={form.area}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Landmark</label>
            <input
              type="text"
              className="form-control"
              name="landmark"
              value={form.landmark}
              onChange={handleChange}
              placeholder="e.g. Near Apollo Hospital"
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="form-label fw-medium">Town/City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-medium">State</label>
              <select
                className="form-select"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
              >
                {states.map((s, idx) => (
                  <option key={idx} value={s}>
                    {s || 'Choose a state'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="defaultAddress"
              checked={form.defaultAddress}
              onChange={handleChange}
              id="defaultAddress"
            />
            <label className="form-check-label" htmlFor="defaultAddress">
              Make this my default address
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Delivery Instructions (Optional)</label>
            <textarea
              className="form-control"
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              rows={2}
            />
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 fw-bold"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Continue'}
          </button>
        </form>
      </div>
      <Footer/>
    </>
  );
}
