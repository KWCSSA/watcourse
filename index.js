const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle api routes
require('./routes/apiRoutes')(app);

PORT = process.env.PORT || 5678;

app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`);
});
