'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    sku: '',
    discount: '',
    alt_text: '',
    sort_order: '',
    keywords: '',
  });

  const [files, setFiles] = useState([]);
  const [descLength, setDescLength] = useState(0);

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'slug') {
      const cleanValue = value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
        .replace(/-+/g, '-');
      setForm({ ...form, [name]: cleanValue });
    } else if (name === 'description') {
      setForm({ ...form, [name]: value });
      setDescLength(value.length);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.slug) {
      toast.error('Name and slug are required');
      return;
    }

    if (form.description.length < 70) {
      toast.error('Description should be at least 70 characters for SEO');
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    files.forEach((file) => formData.append('images', file));

    try {
      const res = await axios.post('/api/product', formData);
      toast.success('Product created successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="card shadow p-4">
        <h3 className="card-title mb-4">Add Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Product Name */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Product Name"
                onChange={handleChange}
                value={form.name}
                required
              />
              {form.name.length > 0 && form.name.length < 3 && (
                <div className="text-danger mt-1">Name is too short</div>
              )}
              {form.name.length >= 3 && form.name.length <= 5 && (
                <div className="text-warning mt-1">Try using a more descriptive product name</div>
              )}
              {form.name.length > 5 && form.name.length <= 100 && (
                <div className="text-success mt-1">Looks good!</div>
              )}
              {form.name.length > 100 && (
                <div className="text-danger mt-1">Must be under 100 characters</div>
              )}
            </div>

            {/* Slug */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Slug</label>
              <input
                type="text"
                className="form-control"
                name="slug"
                placeholder="Slug (letters, numbers, dashes only)"
                onChange={handleChange}
                value={form.slug}
                required
              />
            </div>

            {/* Price */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="price"
                placeholder="Price"
                onChange={handleChange}
                value={form.price}
              />
            </div>

            {/* Stock */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                placeholder="Stock"
                onChange={handleChange}
                value={form.stock}
              />
            </div>

            {/* Category */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                name="category"
                placeholder="Category"
                onChange={handleChange}
                value={form.category}
              />
            </div>

            {/* SKU */}
            <div className="col-md-6 mb-3">
              <label className="form-label">SKU</label>
              <input
                type="text"
                className="form-control"
                name="sku"
                placeholder="SKU"
                onChange={handleChange}
                value={form.sku}
              />
            </div>

            {/* Discount */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Discount (%)</label>
              <input
                type="number"
                className="form-control"
                name="discount"
                placeholder="Discount"
                onChange={handleChange}
                value={form.discount}
              />
            </div>

            {/* Alt Text */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Alt Text</label>
              <input
                type="text"
                className="form-control"
                name="alt_text"
                placeholder="Alt Text"
                onChange={handleChange}
                value={form.alt_text}
              />
            </div>

            {/* Keywords */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Keywords</label>
              <input
                type="text"
                className="form-control"
                name="keywords"
                placeholder="Comma-separated keywords"
                onChange={handleChange}
                value={form.keywords}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Description (min 150 characters)"
              rows={4}
              onChange={handleChange}
              value={form.description}
            />
            <small className={descLength < 150 ? 'text-danger' : 'text-success'}>
              {descLength} / 150 characters
            </small>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="form-label">Product Images</label>
            <div
              {...getRootProps({
                className: 'dropzone border border-secondary p-4 text-center bg-light rounded shadow-sm',
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the images here ...</p>
              ) : (
                <p>Drag & drop images here, or click to select</p>
              )}
            </div>
            {files.length > 0 && (
              <ul className="mt-3">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit */}
          <div className="text-end">
            <button type="submit" className="btn btn-primary px-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductDetails;
