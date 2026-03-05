const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleID: { type: String, required: true, unique: true }, 
    brand: { type: String, required: true }, 
    model: { type: String, required: true }, 
    carType: { type: String, required: true }, 
    color: { type: String }, // 
    seatingCapacity: { type: Number, required: true },  
    pricePerHour: { type: Number, required: true }, 
    
 
    isAvailable: { type: Boolean, default: true }, 
    likes: { type: Number, default: 0 }, 
    dislikes: { type: Number, default: 0 }, 
    image: { type: String } 
});

module.exports = mongoose.model('Vehicle', vehicleSchema);