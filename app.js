const express = require('express');
require('dotenv').config();

const cors = require('cors');
const connectDb = require('./db/connectDb');

const app = express();

// connect db
connectDb().catch( err => console.log(err)).then( () => { console.log(' > DB connectada'); });

// middlewares
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.static('public')); //Static files


// Routers
const imageRouter = require('./routers/imageRouter');
app.use('/images',imageRouter);


app.listen(process.env.PORT, () => {
    console.log(`-----------------`);
    console.log(`Servidor iniciado`);
    console.log(`-----------------`);
});