const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/books', bookRoutes);

app.listen(PORT,async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to MongoDB');
        console.log(`Server running on port ${PORT}`)
        
    } catch (error) {
        console.log(error)
    }
})