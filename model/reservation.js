const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true }, 
    reservationDate: { type: Date, required: true }, 
    timeslot: { type: String, required: true }, 
    
    status: { 
        type: String, 
        enum: ['Pending', 'Accepted', 'Declined', 'Cancelled'], 
        default: 'Pending' 
    }, 
    
    paymentStatus: { type: String, enum: ['None', 'Down Payment', 'Full'], default: 'None' }, 
    totalPrice: { type: Number }, 
    isReturned: { type: Boolean, default: false }, 
    hasDamage: { type: Boolean, default: false } 
});

module.exports = mongoose.model('Reservation', reservationSchema);