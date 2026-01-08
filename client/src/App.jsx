/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// 1. Define Constant OUTSIDE the component to prevent re-creation
const API_URL = 'http://localhost:5000/orders';

function App() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    orderNumber: '', supplier: '', item: '', quantity: 0, unitPrice: 0
  });
  const [editingId, setEditingId] = useState(null);

  // 2. Define the fetch function normally
  const fetchOrders = async () => {
    try {
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // 3. useEffect runs ONCE on mount.
  // We pass an empty array []. 
  // We do NOT put fetchOrders in the array. This prevents the loop.
  useEffect(() => {
    fetchOrders();

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIX: Ensure numbers are actually numbers, not strings
      const payload = {
        ...form,
        quantity: Number(form.quantity),
        unitPrice: Number(form.unitPrice)
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post(API_URL, payload);
      }

      setForm({ orderNumber: '', supplier: '', item: '', quantity: 0, unitPrice: 0 });
      fetchOrders();
    } catch (error) {
      console.error("Error saving order:", error);
      // Optional: Alert the user to what went wrong
      if (error.response) {
        alert("Server Error: " + JSON.stringify(error.response.data));
      }
    }
  };

  const handleEdit = (order) => {
    setEditingId(order._id);
    setForm({
      orderNumber: order.orderNumber,
      supplier: order.supplier,
      item: order.item,
      quantity: order.quantity,
      unitPrice: order.unitPrice
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchOrders(); // Manually refresh list after delete
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Purchase Order Management</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
        <input
          placeholder="Order #"
          value={form.orderNumber}
          onChange={e => setForm({ ...form, orderNumber: e.target.value })}
          required
        />
        <input
          placeholder="Supplier"
          value={form.supplier}
          onChange={e => setForm({ ...form, supplier: e.target.value })}
          required
        />
        <input
          placeholder="Item Name"
          value={form.item}
          onChange={e => setForm({ ...form, item: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Unit Price"
          value={form.unitPrice}
          onChange={e => setForm({ ...form, unitPrice: e.target.value })}
          required
        />
        <button type="submit">{editingId ? 'Update Order' : 'Create Order'}</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.orderNumber}</td>
              <td>{order.item}</td>
              <td>{order.quantity}</td>
              <td>${order.totalPrice}</td>
              <td>
                <button onClick={() => handleEdit(order)}>Edit</button>
                <button onClick={() => handleDelete(order._id)} style={{ marginLeft: '5px', color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;