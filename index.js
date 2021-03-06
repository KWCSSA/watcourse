const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const logger = require('./utils/logger');

var app = express();

if (process.env.NODE_ENV === 'production') {
	mongoose.connect(
		`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27017/watcourse?authSource=admin`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}
	);
} else {
	mongoose.connect('mongodb://localhost/watcourse', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	});
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB Connection error:'));
db.once('open', () => {
	logger.log('info', `============================== App started ==============================`);
	logger.log('info', 'DB Connected');
	runApp();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Secure HTTP headers
app.use(helmet());

// Allow cors in development
if (process.env.NODE_ENV !== 'production') {
	app.use(require('cors')());
}

// Initiate mongoose models
require('./models');

// Handle api routes
require('./routes/apiRoutes')(app);

// Serve React Files
app.use(express.static('client/build'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

function runApp() {
	PORT = process.env.PORT || 5678;

	app.listen(PORT, () => {
		logger.log('info', `Listening on Port ${PORT}`);
	});
}
