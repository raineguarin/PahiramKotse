// model/reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    
    date: String, 
    time: String, 
    
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