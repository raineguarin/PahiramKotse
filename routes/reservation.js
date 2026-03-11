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

module.exports = router;