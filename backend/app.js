const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const flightRoutes = require('./routes/flightRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/booking', bookingRoutes);
app.use('/flight', flightRoutes);
app.use('/payment', paymentRoutes);
app.use('/user', userRoutes);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
  })
  .catch((error) => console.error('MongoDB connection error:', error));

module.exports = app;
