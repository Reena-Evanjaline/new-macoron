'use client';

import { useEffect, useState } from 'react';
import { Table, Button, Modal, Spinner, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  // Check auth on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('vendor_admin_auth') === 'true';
    setIsAuthenticated(isLoggedIn);
  }, []);

  // Fetch vendors
  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchVendors() {
      try {
        setLoading(true);
        const res = await fetch('/api/get-vendors');
        const data = await res.json();

        if (res.ok && data.success) {
          setVendors(data.vendors);
          toast.success('Vendors loaded!');
        } else {
          toast.error('Failed to load vendors');
        }
      } catch (err) {
        toast.error('Error fetching vendors');
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, [isAuthenticated]);

  // Toggle active status
  const handleToggleStatus = async (vendor) => {
    const newStatus = vendor.is_active ? 0 : 1;

    try {
      const res = await fetch('/api/toggle-vendor-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: vendor.id, is_active: newStatus }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(`Vendor ${newStatus ? 'approved' : 'disapproved'}`);
        setVendors((prev) =>
          prev.map((v) => (v.id === vendor.id ? { ...v, is_active: newStatus } : v))
        );
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      toast.error('Error updating vendor status');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (username === 'admin' && password === 'raceauto@2025') {
      localStorage.setItem('vendor_admin_auth', 'true');
      setIsAuthenticated(true);
      toast.success('Login successful');
    } else {
      toast.error('Invalid credentials');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ToastContainer />
        <Form onSubmit={handleLogin} className="p-4 border rounded shadow" style={{ width: 300 }}>
          <h5 className="mb-3">Admin Login</h5>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </div>
    );
  }

  // View Modal handler
  const handleView = (vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h4 className="mb-3">Vendor Emails</h4>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={vendor.id}>
                <td>{index + 1}</td>
                <td>{vendor.email}</td>
                <td>
                  <Button
                    variant={vendor.is_active ? 'success' : 'outline-secondary'}
                    size="sm"
                    onClick={() => handleToggleStatus(vendor)}
                  >
                    {vendor.is_active ? 'Approved' : 'Disapproved'}
                  </Button>
                </td>
                <td>
                  <Button size="sm" onClick={() => handleView(vendor)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Vendor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVendor && (
            <div>
              <p><strong>Business Name:</strong> {selectedVendor.business_name}</p>
              <p><strong>Primary Contact:</strong> {selectedVendor.primary_contact}</p>
              <p><strong>Phone:</strong> {selectedVendor.phone}</p>
              <p><strong>Title:</strong> {selectedVendor.title}</p>
              <p><strong>Business Type:</strong> {selectedVendor.business_type}</p>
              <p><strong>Country:</strong> {selectedVendor.country}</p>
              <p><strong>Website:</strong> {selectedVendor.website}</p>
              <p><strong>Products:</strong> {selectedVendor.products_offered}</p>
              <p><strong>Clients:</strong> {selectedVendor.client1}, {selectedVendor.client2}</p>

              <hr />
              <h6>Certificates</h6>
              {[
                'incorp_cert',
                'gst_cert',
                'pan_card',
                'msme_cert',
                'iso_cert',
                'other_cert',
              ].map((key) =>
                selectedVendor[key] ? (
                  <p key={key}>
                    <strong>{key.replace('_', ' ').toUpperCase()}:</strong>{' '}
                    <a
                      href={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${selectedVendor[key]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </p>
                ) : null
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
