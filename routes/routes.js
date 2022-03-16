const express = require('express');
const noteRouter = require('./notes');

const app = express();
// use url '.../notes' for the note.js file
app.use('/notes', noteRouter);

module.exports = app;