// routes/reservations.js
const express = require('express');
const router = express.Router();

const reservation = require('../model/reservation');

// GET: Show the Manage Reservations admin page
router.get('/manage-reservations', async (req, res) => {
    try {
        const allReservations = await reservation.find({});
        // Renders the view/manage-reservations.hbs file
        res.render('manage-reservations', { reservations: allReservations });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading reservations.");
    }
});

// POST: Update a reservation status (e.g., Approve or Cancel)
router.post('/reservation', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ error: "Please log in first." });
        }

        const { carId, date, time } = req.body;

        const newRes = new reservation({
            customer: req.session.userId,
            vehicle: carId,
            date,
            time
        });

        await newRes.save();
        res.status(201).json({ message: "Success" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save reservation." });
    }
});

router.get('/reservations', async (req, res) => {
    try {

        if (!req.session.userId) {
            return res.redirect('/login');
        }

        const allMyBookings = await reservation.find({ customer: req.session.userId })
                                                .populate('vehicle');

        const processing = allMyBookings.filter(b => b.status === 'Pending');
        const ongoing = allMyBookings.filter(b => b.status === 'Approved');
        const completed = allMyBookings.filter(b => b.status === 'Completed');

        res.render('reservations', { 
            processing, 
            ongoing, 
            completed 
        });
    } catch (err) {
        console.error("Error fetching reservations:", err);
        res.status(500).send("Error loading your reservations.");
    }
});

router.post('/cancel', async (req, res) => {
    try {
        const { reservationId } = req.body;

        // Verify the user is actually logged in
        if (!req.session.userId) {
            return res.status(401).json({ error: "Please log in first." });
        }

        // Find the reservation and update status to 'Cancelled'
        const result = await reservation.findOneAndUpdate(
            { _id: reservationId, customer: req.session.userId },
            { status: 'Cancelled' },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ error: "Reservation not found or unauthorized." });
        }

        res.status(200).json({ message: "Successfully cancelled." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during cancellation." });
    }
});

module.exports = router;