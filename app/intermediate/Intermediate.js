'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function EmailCheckPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [checking, setChecking] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [exists, setExists] = useState(false);
  const router = useRouter();

  const handleCheckAndLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    setChecking(true);

    try {
      const check = await axios.post('/api/check-email', { email });

      if (check.data.exists) {
        // Try to login
        try {
          const res = await axios.post('/api/auth/login', form);
          localStorage.setItem('token', res.data.token);
          toast.success('Logged in successfully!');
          setTimeout(() => {
            router.push('/');
          }, 1000);
        } catch (err) {
          if (err.response?.status === 401) {
            toast.error('Invalid email or password.');
          } else {
            toast.error('Login failed. Please try again.');
          }
        }
      } else {
        setExists(false);
        setSubmitted(true);
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setChecking(false);
    }
  };

  const handleProceedToRegister = () => {
    router.push(`/register?email=${form.email}`);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ email: '', password: '' });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className="p-4 shadow"
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: '20px',
        }}
      >
        {!submitted ? (
          <>
            <div className="text-center mb-3">
              <h2 className="fw-bold text-danger">Welcome Back</h2>
              <p className="text-muted">Login to your account</p>
            </div>

            <form onSubmit={handleCheckAndLogin}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="btn btn-danger w-100 fw-semibold"
                disabled={checking}
              >
                {checking ? 'Checking...' : 'Login'}
              </button>
            </form>

            <div className="text-center mt-3">
              <small className="text-muted">
                Don't have an account? <Link href="/register">Sign up</Link>
              </small>
            </div>
          </>
        ) : (
          <>
            <h5 className="fw-semibold mb-2">Looks like you're new here</h5>
            <p className="mb-1">
              {form.email}{' '}
              <button className="btn btn-link p-0" onClick={reset}>
                Change
              </button>
            </p>
            <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
              Let's create an account using your email address
            </p>
            <button className="btn btn-danger w-100 fw-semibold" onClick={handleProceedToRegister}>
              Proceed to create an account
            </button>
            <hr />
            <p className="text-center small">
              <span className="fw-bold">Already have an account?</span>{' '}
              <Link href="/intermediate" className="text-primary">
                Sign in with another email
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
