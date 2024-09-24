// index.js
const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = 3000;

// Initialize Firebase Admin SDK
const serviceAccount = require('./path-to-your-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware to verify Firebase Token
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

// A protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, this is a protected route!` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
