const express = require('express');
const app = express();
const cors = require('cors');
const { connect } = require('mongoose');
const connectDB = require('./Database/db.connection');
require('dotenv').config();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/user', require('./Router/user.router'));

app.listen(process.env.PORT , () => {
  console.log(`server is running on port ${process.env.PORT}`);
})