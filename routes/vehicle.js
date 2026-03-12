// routes/vehicles.js
const express = require('express');
const router = express.Router();

const vehicle = require('../model/vehicle');
const reservation = require('../model/reservation');

// GET: Show the Manage Vehicles admin page
router.get('/manage-vehicles', async (req, res) => {
    try {
        const allVehicles = await vehicle.find({});
        // Renders the view/manage-vehicles.hbs file
        res.render('manage-vehicles', { vehicles: allVehicles });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading vehicles.");
    }
});

// POST: Add a new vehicle to the database
router.post('/add-vehicle', async (req, res) => {
    // put the MongoDB save logic here later
    res.send("Vehicle added! (Logic coming soon)");
});


// GET: Show the public Cars page
router.get('/cars', async (req, res) => {
    try {
        const allVehicles = await vehicle.find({});
        
        res.render('cars', { vehicles: allVehicles });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading vehicles.");
    }
});

router.get('/search', (req, res) => {
    res.render('search');
});

router.post('/search', async (req, res) => {
    try {
        const { filterfromdate, filtertodate, capacity } = req.body;

        const startDate = new Date(filterfromdate);
        const endDate = new Date(filtertodate);

        const conflictingReservations = await reservation.find({
            startDate: { $lte: endDate },
            endDate: { $gte: startDate }
        });

        const unavailableIds =
            conflictingReservations.map(r => r.vehicleId);

        let query = {
            _id: { $nin: unavailableIds }
        };

        if (capacity) {
            query.capacity = Number(capacity);
        }

        const filteredVehicles = await vehicle.find(query);

        res.render('cars', {
            vehicles: filteredVehicles
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Search failed.");
    }
});

module.exports = router;