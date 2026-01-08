const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Note: 'mongo' is the service name we will define in docker-compose
const MONGO_URI = 'mongodb://mongo:27017/purchase_orders';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// --- ROUTES ---

// CREATE
// CREATE
app.post('/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.json(savedOrder);
    } catch (err) {
        // 1. Log to the terminal (so you can see it in docker logs)
        console.error("Error creating order:", err);

        // 2. Send a proper error message to the frontend
        res.status(500).json({
            message: err.message || "An unknown error occurred",
            error: err
        });
    }
});

// READ
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
app.put('/orders/:id', async (req, res) => {
    try {
        // Recalculate total if quantity/price changes (handled by frontend logic or hook, but simple update here)
        const { quantity, unitPrice } = req.body;
        let updateData = req.body;

        if (quantity && unitPrice) {
            updateData.totalPrice = quantity * unitPrice;
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
app.delete('/orders/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));