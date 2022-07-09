const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;
var database;

const connectToDb = () => {
    mongoose.connect(mongoString);
    database = mongoose.connection;
    
    database.on('error', (error) => {
        console.log(error)
    });
    
    database.once('connected', () => {
        console.log('Database Connected');
    });
    
    return database;
}
module.exports = connectToDb;
