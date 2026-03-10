const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    brand: String,
    model: String,    
    carType: String,
    capacity: Number,
    dailyRate: Number, 
    likes: Number,
    image: { type: String, default: '/images/default.png' }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);