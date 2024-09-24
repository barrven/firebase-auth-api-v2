const admin = require('../config/firebase');

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('Authorization token missing');
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(403).send('Unauthorized');
    }
};

module.exports = authenticateToken;