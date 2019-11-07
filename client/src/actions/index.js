import axios from 'axios';

import * as TYPES from '../TYPES';

const serverAddress = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5678';

export const fetchCourseList = term => dispatch => {
	axio.get(`${serverAddress}/api/courses/${term}`).then(response => {
		console.log(response.data.length);
		dispatch({ type: TYPES.FETCH_COURSE_LIST, payload: response.data });
	});
};
