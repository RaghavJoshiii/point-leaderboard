const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoute');

app.use(cors({
  origin: [
    'http://localhost:5173',                    // local dev
    'https://point-leaderboard.vercel.app/'    // vercel frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/api', userRoutes);

mongoose.connect('mongodb+srv://raghavjoshi862006:Raghav%402006@cluster0.oorh7fx.mongodb.net/leaderboard')
  

app.listen(3000, () => console.log('Server running on port 3000'));
