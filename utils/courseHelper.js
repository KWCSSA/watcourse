const axios = require('axios');
const mongoose = require('mongoose');

const Course = mongoose.model('course');
const getTermCode = require('./termCodeHelper');
const logger = require('./logger');

const updateCourseList = term => {
	return new Promise((resolve, reject) => {
		axios
			.get(`https://api.uwaterloo.ca/v2/terms/${term}/courses.json?key=${process.env.UW_API_KEY_V2}`)
			.then(response => {
				if (response.data.meta.status === 200) {
					Course.deleteMany({ term }).then(() => {
						const courseList = response.data.data;
						const lastUpdated = Date.now();
						Promise.all(
							courseList.map(courseEntry => {
								var course = new Course({
									subject: courseEntry.subject,
									catalogNumber: courseEntry.catalog_number,
									title: courseEntry.title,
									term,
									lastUpdated
								});
								return course.save();
							})
						).then(courses => {
							logger.log('info', `Course list updated for term: ${term}`);
							resolve(courses);
						});
					});
				} else {
					reject('Invalid response');
				}
			})
			.catch(err => {
				console.log(err);
				reject(err);
			});
	});
};

const cleanCourseLists = () => {
	const { currTermCode, nextTermCode } = getTermCode();
	Course.deleteMany({
		$and: [ { term: { $ne: currTermCode } }, { term: { $ne: nextTermCode } } ]
	}).then(res => {
		logger.log('info', `Course lists cleaned, total number of course delete: ${res.deletedCount}`);
	});
};

exports.getCourseList = term => {
	return new Promise((resolve, reject) => {
		Course.find({ term })
			.then(courses => {
				if (courses.length === 0) {
					logger.log('info', `New course list requested for term: ${term}`);
					cleanCourseLists();
					updateCourseList(term)
						.then(courses => {
							resolve(courses);
						})
						.catch(err => {
							reject(err);
						});
				} else {
					var timeElapsed = Date.now() - courses[0].lastUpdated;
					var timeToLive = 15 * 24 * 60 * 60 * 1000;
					if (timeElapsed > timeToLive) {
						logger.log('info', `Course list for term: ${term} is expired`);
						updateCourseList(term);
					}
					resolve(courses);
				}
			})
			.catch(err => reject(err));
	});
};
