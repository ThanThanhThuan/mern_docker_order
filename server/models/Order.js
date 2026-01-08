const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true },
    supplier: { type: String, required: true },
    item: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number },
    date: { type: Date, default: Date.now }
});

// FIX: Use async function (no 'next' param needed)
// This prevents "next is not a function" errors completely.
OrderSchema.pre('save', async function () {
    if (this.quantity && this.unitPrice) {
        this.totalPrice = this.quantity * this.unitPrice;
    }
});

module.exports = mongoose.model('Order', OrderSchema);