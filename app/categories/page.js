'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Spinner, Table, Alert } from 'react-bootstrap';

/**
 * Flatten tree to flat list with level info for indentation
 */
function flattenCategories(tree, level = 0) {
  let result = [];
  tree.forEach(node => {
    result.push({ id: node.id, name: node.name, level });
    if (node.children && node.children.length > 0) {
      result = result.concat(flattenCategories(node.children, level + 1));
    }
  });
  return result;
}

export default function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [parentId, setParentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // For Edit Modal
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editParentId, setEditParentId] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch categories.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/categories', {
        name,
        slug,
        parent_id: parentId || null,
      });
      setName('');
      setSlug('');
      setParentId('');
      fetchCategories();
    } catch (err) {
      console.error(err);
      setError('Error creating category.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
      setError('Error deleting category.');
    }
  };

  const openEditModal = (cat) => {
    setEditId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setEditParentId(cat.parent_id || '');
    setShowEdit(true);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.put(`/api/categories/${editId}`, {
        name: editName,
        slug: editSlug,
        parent_id: editParentId || null,
      });
      setShowEdit(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
      setError('Error updating category.');
    } finally {
      setLoading(false);
    }
  };

  const flattenedOptions = flattenCategories(categories);

  return (
    <div className="container py-4">
      <h3 className="mb-4">🗂️ Category Management</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="mb-4 shadow-sm p-3 rounded bg-light">
        <h5 className="mb-3">Add New Category</h5>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <option value="">-- Parent Category (Optional) --</option>
            {flattenedOptions.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {'— '.repeat(cat.level) + cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : 'Add Category'}
        </Button>
      </Form>

      <h5 className="mb-3">📋 Existing Categories</h5>
      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Parent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flattenedOptions.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{'— '.repeat(cat.level) + cat.name}</td>
              <td>{cat.slug}</td>
              <td>
                {cat.parent_id
                  ? categories.find((p) => p.id === cat.parent_id)?.name || `(ID ${cat.parent_id})`
                  : '-'}
              </td>
              <td>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => openEditModal(cat)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              value={editSlug}
              onChange={(e) => setEditSlug(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Parent Category</Form.Label>
            <Form.Select
              value={editParentId}
              onChange={(e) => setEditParentId(e.target.value)}
            >
              <option value="">-- None --</option>
              {flattenedOptions
                .filter((cat) => cat.id !== editId)
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {'— '.repeat(cat.level) + cat.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
