// index.js
const express = require('express');
const admin = require('firebase-admin');

const app = express();
const port = 3000;

app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./.firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://api-v2-34fa9.firebaseio.com"
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



app.get('/api/test', (req, res)=>{
    res.send('This is a test');
})

// A protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, this is a protected route!` });
});



app.post('/api/createUser', async (req, res) => {
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



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
