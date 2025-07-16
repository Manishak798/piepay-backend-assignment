const express = require('express');
const offerRoutes = require('./routes/offerRoutes');

const app = express();

app.use(express.json());
app.use('/api', offerRoutes);

module.exports = app;
