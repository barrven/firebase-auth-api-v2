const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

const postRoutes = require('./routes/post');
const getRoutes = require('./routes/get');

app.use('/api', postRoutes);
app.use('/api', getRoutes);

// can add more routes here if needed
app.get('/api/test', (req, res) => {
    res.send('This is a test');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
