
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve static frontend
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', authRoutes);


const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)
     .then(() => {
         console.log('MongoDB connected');
         app.listen(PORT, () => {
             console.log(`Server running on http://localhost:${PORT}`);
         });
     })
     .catch(err => {
        console.error('DB connection error:', err);
     });
// Connect to MongoDB and start server
//mongoose.connect(process.env.MONGO_URI, {
//useNewUrlParser: true,
//useUnifiedTopology: true
//}).then(() => {
//console.log('MongoDB connected');
//app.listen(PORT, () => {
//console.log(`Server running on http://localhost:${PORT}`);
//});
//}).catch(err => console.error('DB connection error:', err));
