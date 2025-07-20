// require('dotenv').config();
// const mongoose = require('mongoose');
// const app = require('./app');

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(process.env.PORT || 3000, () => {
//       console.log(`Server running on port ${process.env.PORT || 3000}`);
//     });
//   })
//   .catch(err => console.error(err));
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || '';
const PORT: number = parseInt(process.env.PORT || '3000', 10);

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in the environment variables.');
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('MongoDB connection error:', err.message);
    } else {
      console.error('Unknown error:', err);
    }
  });
