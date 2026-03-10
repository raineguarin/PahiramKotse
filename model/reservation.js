// model/reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    // 'ref' links this directly to user and vehicle model
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    
    date: String, // "Feb 20, 2026"
    time: String, // "9:00 AM - 12:00 PM"
    
    status: { 
        type: String, 
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Cancelled', 'Completed'] 
    },
    
    paymentStatus: { 
        type: String, 
        default: 'Unpaid',
        enum: ['Unpaid', 'Down Payment', 'Fully Paid'] 
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);