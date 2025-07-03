'use client';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      toast.success('Registered successfully!');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <ToastContainer />
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4 d-flex justify-content-center">
          <div className="" style={{ position: 'relative', width: 100,  aspectRatio:'3.22/1' }}>
<Image src="/images/Image.jpg" alt="Logo" fill />
          </div>
          
         
        </div>
         <h4 className="fw-bold mt-2 text-center text-danger">Create Account</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <small>Already have an account? <Link href="/intermediate">Login</Link></small>
        </div>
      </div>
    </div>
  );
}
