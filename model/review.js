const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    //User
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    //Vehicle
    car: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vehicle', 
        required: true 
    },
    title: { 
        type: String, 
        required: true,
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Review', reviewSchema);