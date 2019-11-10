import axios from 'axios';

import * as TYPES from '../TYPES';

const serverAddress = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5678';

export const fetchCourseList = term => dispatch => {
	axios.get(`${serverAddress}/api/courses/${term}`).then(response => {
		if (!response.data.error) {
			console.log(response.data.data.length);
			dispatch({ type: TYPES.FETCH_COURSE_LIST, payload: response.data.data });
		}
	});
};
