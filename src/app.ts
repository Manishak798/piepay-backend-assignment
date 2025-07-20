// const express = require('express');
// const offerRoutes = require('./routes/offerRoutes');

// const app = express();

// app.use(express.json());
// app.use('/api', offerRoutes);

// module.exports = app;

import express, { Application } from 'express';
import offerRoutes from './routes/offer.route';

const app: Application = express();

app.use(express.json());
app.use('/api', offerRoutes);

export default app;
