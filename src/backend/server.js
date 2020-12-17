const express = require('express');
const menuRouter = require('./routes/menuitems');
const drinkRouter = require('./routes/drinks');

const app = express();
const port = 8000;

app.use('/menuitems', menuRouter);
app.use('/drinkitems', drinkRouter);

app.listen(port, () => console.log(`Express server started on port ${port}`));

module.exports = app;
