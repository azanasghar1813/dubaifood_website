require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Security Middleware
app.use(helmet()); // Set security HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allow images to load from Cloudinary

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://wonderful-kheer-c7f5c8.netlify.app',
  'https://dubaifood.onrender.com'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));

app.get('/', (req, res) => {
  res.send('Dubai Fast Food API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
