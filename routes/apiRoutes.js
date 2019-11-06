const axios = require('axios');

module.exports = app => {
	app.get('/api/subjects', (req, res) => {
		var reqOptions = {
			method: 'GET',
			url: 'https://openapi.data.uwaterloo.ca/v3/subjects',
			headers: {
				'X-API-KEY': process.env.UW_API_KEY_V3
			},
			json: true
		};
		axios(reqOptions)
			.then(response => {
				console.log(response.status);
				res.send(response.data);
			})
			.catch(err => {
				console.log(err);
				res.send(err);
			});
	});

	app.get('/api/courses', (req, res) => {
		var reqOptions = {
			method: 'GET',
			url: 'https://openapi.data.uwaterloo.ca/v3/courses',
			headers: {
				'X-API-KEY': process.env.UW_API_KEY_V3
			},
			json: true
		};
		axios(reqOptions)
			.then(response => {
				console.log(response.status);
				res.send(response.data);
			})
			.catch(err => {
				console.log(err);
				res.send(err);
			});
	});
};
