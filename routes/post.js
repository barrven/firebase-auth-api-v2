const express = require('express');
const admin = require('../config/firebase');
const router = express.Router();

router.post('/createUser', async (req, res) => {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName
        });

        res.status(201).json({
            message: 'User created successfully',
            user: userRecord
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
});

module.exports = router;