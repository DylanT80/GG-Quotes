require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConnection');

const app = express();

app.use(express.json());
app.use(require('./middleware/corsHandler'));
app.use('/api/quotes', require('./routers/quotesRouter'));
app.use('/api/users', require('./routers/usersRouter'));
app.use('/api/daredevils', require('./routers/daredevilsRouter'));
app.use(require('./middleware/errorHandler'))

connectDB().then(() => {
    app.listen(process.env.PORT_NUM, () => {
        console.log(`Listening on ${process.env.PORT_NUM}`);
    });
});