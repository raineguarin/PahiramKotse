// use node app.js in cli to check if connection works
// after use http://localhost:3000/test-cars on a browser to check that the database works

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const vehicle = require('./model/vehicle'); 


mongoose.connect('mongodb+srv://PahiramKoAdmin:Group4Apdev@pahiramkotse.g6rovco.mongodb.net/pahiramKotseDB?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/test-cars', async (req, res) => {
    try {
        const cars = await vehicle.find(); 
        res.json(cars); 
    } catch (err) {
        console.log(err); 
        res.status(500).send("Database Error: " + err.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});