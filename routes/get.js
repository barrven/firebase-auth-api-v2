const express = require('express');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// A protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hello ${req.user.email}, this is a protected route!` });
});

router.get('/test2', (req, res) => {
    res.json({ message: `Hello, this is test2` });
});

module.exports = router;