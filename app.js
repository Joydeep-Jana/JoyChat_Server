require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//routes
const mainRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

//connection string
const DB_CONNECTION = require('./config/keys').MongoURI;

//connect
mongoose.connect(DB_CONNECTION, {useNewUrlParser: true})
.then(() => 
{
    console.log('Connected to the database')
}).catch(err => console.log(err));

//set body parser
app.use(express.json({extended: false}));

//set routes
app.use('/', mainRoutes);
app.use('/user', userRoutes);
const PORT = process.env.PORT;

app.listen(PORT, ()=> {console.log(`server started at port: ${PORT}`)});