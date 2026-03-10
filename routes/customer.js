// routes/customer.js

const express = require('express');
const router = express.Router();
const user = require('../model/user');

router.get('/register', (req, res) => {
    res.render('register');
});

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, number, password } = req.body;

        const newUser = new User({
            name,
            email,
            phone: number,
            password, 
            username: username || email,  // uses email as a fallback 
            role: 'Customer'
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed. Email might already exist." });
    }
});

module.exports = router;