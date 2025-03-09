const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Define a sample route
router.get('/', (req, res) => {
    res.send('Welcome to my Node app!');
});

// User registration route
router.post('/users/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Export the router
module.exports = router;