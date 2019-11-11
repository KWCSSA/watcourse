const axios = require('axios');
const { getCourseList } = require('../../utils/courseHelper');

module.exports = app => {
	app.get('/api/courses/:term', (req, res) => {
		const { term } = req.params;
		getCourseList(term)
			.then(courses => {
				res.send({ error: false, data: courses });
			})
			.catch(err => {
				res.send({ error: true, data: null });
			});
	});

	app.get('/api/course/:term/:subject/:catalogNumber', (req, res) => {
		const { term, subject, catalogNumber } = req.params;
		axios
			.get(`https://api.uwaterloo.ca/v2/courses/${subject}/${catalogNumber}.json?key=${process.env.UW_API_KEY_V2}`)
			.then(response => {
				if (response.data.meta.status === 200) {
					const {
						title,
						description,
						prerequisites,
						antirequisites,
						corequisites,
						terms_offered,
						notes
					} = response.data.data;
					axios
						.get(
							`https://api.uwaterloo.ca/v2/terms/${term}/${subject}/${catalogNumber}/schedule.json?key=${process.env
								.UW_API_KEY_V2}`
						)
						.then(response => {
							if (response.data.meta.status === 200) {
								const data = {
									title,
									subject,
									catalogNumber,
									description,
									prerequisites,
									antirequisites,
									corequisites,
									termsOffered: terms_offered,
									notes,
									sections: response.data.data.map(sec => {
										const {
											units,
											note,
											class_number,
											section,
											campus,
											enrollment_capacity,
											enrollment_total,
											waiting_capacity,
											waiting_total,
											reserves,
											classes,
											last_updated
										} = sec;
										return {
											units,
											note,
											classNumber: class_number,
											section,
											campus,
											capacity: enrollment_capacity,
											total: enrollment_total,
											waitingCapacity: waiting_capacity,
											waitingTotal: waiting_total,
											reserves,
											classes,
											lastUpdated: last_updated
										};
									})
								};
								res.send({ error: false, data });
							} else {
								res.send({ error: true, data: null });
							}
						})
						.catch(err => {
							res.send({ error: true, data: null });
						});
				} else {
					res.send({ error: true, data: null });
				}
			})
			.catch(err => {
				res.send({ error: true, data: null });
			});
	});
};
