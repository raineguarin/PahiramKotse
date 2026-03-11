const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    brand: String,
    model: String,    
    carType: String,
    capacity: Number,
    dailyRate: Number, 
    likes: { type: Number, default: 0 },
    image: { type: String, default: '/images/default.png' },
    status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);