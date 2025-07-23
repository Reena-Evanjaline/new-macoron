'use client';

import { useState } from 'react';
import {
  Form, Button, Row, Col, Container, Card
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VendorForm() {
  const [formData, setFormData] = useState({
    business_name: '',
    email: '',
    password: '',
    primary_contact: '',
    title: '',
    phone: '',
    business_type: '',
    year_established: '',
    tin: '',
    gst_number: '',
    pan_number: '',
    website: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    products_offered: '',
    client1: '',
    client2: '',
  });

  const [certs, setCerts] = useState({
    incorp_cert: null,
    gst_cert: null,
    pan_card: null,
    msme_cert: null,
    iso_cert: null,
    other_cert: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCerts({ ...certs, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['business_name', 'email', 'password', 'business_type', 'year_established', 'country'];
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());

    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!certs.incorp_cert) {
      toast.error('Incorporation Certificate is required.');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    for (const key in certs) {
      if (certs[key]) {
        data.append(key, certs[key]);
      }
    }

    try {
      const res = await fetch('/api/vendor-auth', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Vendor registered successfully!');
      } else {
        toast.error('Submission failed: ' + result.error);
      }
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Something went wrong during submission.');
    }
  };

  return (
    <Container className="my-5">
      <Card className="p-4">
        <h3 className="mb-4">Vendor Registration</h3>
        <Form onSubmit={handleSubmit}>
          <h5>Business Info</h5>
          <Row>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Business Name *</Form.Label><Form.Control name="business_name" value={formData.business_name} onChange={handleChange} required /></Form.Group></Col>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Email *</Form.Label><Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required /></Form.Group></Col>
          </Row>
          <Row>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Password *</Form.Label><Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required /></Form.Group></Col>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Primary Contact</Form.Label><Form.Control name="primary_contact" value={formData.primary_contact} onChange={handleChange} /></Form.Group></Col>
          </Row>

          <h5 className="mt-4">Business Details</h5>
          <Row>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Business Type *</Form.Label><Form.Control name="business_type" value={formData.business_type} onChange={handleChange} required /></Form.Group></Col>
            <Col md={6}><Form.Group className="mb-3"><Form.Label>Year Established *</Form.Label><Form.Control name="year_established" value={formData.year_established} onChange={handleChange} required /></Form.Group></Col>
          </Row>
          <Row>
            <Col md={4}><Form.Group className="mb-3"><Form.Label>TIN</Form.Label><Form.Control name="tin" value={formData.tin} onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group className="mb-3"><Form.Label>GST Number</Form.Label><Form.Control name="gst_number" value={formData.gst_number} onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group className="mb-3"><Form.Label>PAN Number</Form.Label><Form.Control name="pan_number" value={formData.pan_number} onChange={handleChange} /></Form.Group></Col>
          </Row>

          <h5 className="mt-4">Address</h5>
          <Form.Group className="mb-3"><Form.Label>Street</Form.Label><Form.Control name="street" value={formData.street} onChange={handleChange} /></Form.Group>
          <Row>
            <Col md={4}><Form.Group className="mb-3"><Form.Label>City</Form.Label><Form.Control name="city" value={formData.city} onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group className="mb-3"><Form.Label>State</Form.Label><Form.Control name="state" value={formData.state} onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group className="mb-3"><Form.Label>Postal Code</Form.Label><Form.Control name="postal_code" value={formData.postal_code} onChange={handleChange} /></Form.Group></Col>
          </Row>
          <Form.Group className="mb-3"><Form.Label>Country *</Form.Label><Form.Control name="country" value={formData.country} onChange={handleChange} required /></Form.Group>

          <h5 className="mt-4">Other Info</h5>
          <Form.Group className="mb-3"><Form.Label>Website</Form.Label><Form.Control name="website" value={formData.website} onChange={handleChange} /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Products Offered</Form.Label><Form.Control name="products_offered" value={formData.products_offered} onChange={handleChange} /></Form.Group>
          <Row>
            <Col><Form.Group className="mb-3"><Form.Label>Client 1</Form.Label><Form.Control name="client1" value={formData.client1} onChange={handleChange} /></Form.Group></Col>
            <Col><Form.Group className="mb-3"><Form.Label>Client 2</Form.Label><Form.Control name="client2" value={formData.client2} onChange={handleChange} /></Form.Group></Col>
          </Row>

          <h5 className="mt-4">Certifications</h5>
          {[
            ['incorp_cert', 'Incorporation Certificate *'],
            ['gst_cert', 'GST Certificate'],
            ['pan_card', 'PAN Card'],
            ['msme_cert', 'MSME Certificate'],
            ['iso_cert', 'ISO Certificate'],
            ['other_cert', 'Other Certificate']
          ].map(([name, label]) => (
            <Form.Group className="mb-3" key={name}>
              <Form.Label>{label}</Form.Label>
              <Form.Control type="file" name={name} onChange={handleFileChange} />
            </Form.Group>
          ))}

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Card>
       <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}
