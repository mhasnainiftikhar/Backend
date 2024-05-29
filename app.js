
// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); 
const authRoutes = require('./routes/auth');
const { authenticateToken } = require('./middleware/authController');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Protect the user routes with the middleware
app.use('/api/users', authenticateToken, userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
