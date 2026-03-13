const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    brand: String,
    model: String,    
    carType: String,
    capacity: Number,
    dailyRate: Number, 
    likes: { type: Number, default: 0 },
    likedBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        default: [] 
    }],
    image: { type: String, default: '/images/default.png' },
    status: { type: Boolean, default: true }
});

vehicleSchema.virtual('likeCount').get(function() {
    return this.likedBy.length;
});

module.exports = mongoose.model('Vehicle', vehicleSchema);