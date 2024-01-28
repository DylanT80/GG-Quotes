require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConnection');

const app = express();

app.use('/api/quotes', require('./routers/quotesRouter'));

connectDB().then(() => {
    app.listen(process.env.PORT_NUM, () => {
        console.log(`Listening on ${process.env.PORT_NUM}`);
    });
});