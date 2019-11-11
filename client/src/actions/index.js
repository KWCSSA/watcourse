import axios from 'axios';

import * as TYPES from '../TYPES';

const serverAddress = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5678';

export const updateSearchTerm = searchTerm => {
	return { type: TYPES.UPDATE_SEARCH_TERM, payload: { length: searchTerm.length, value: searchTerm } };
};

export const fetchCourseList = term => dispatch => {
	axios.get(`${serverAddress}/api/courses/${term}`).then(response => {
		if (!response.data.error) {
			dispatch({ type: TYPES.FETCH_COURSE_LIST, payload: { term, courses: response.data.data } });
		}
	});
};

export const fetchCourseDetails = (term, subject, catalogNumber) => dispatch => {
	axios.get(`${serverAddress}/api/course/${term}/${subject}/${catalogNumber}`).then(response => {
		if (!response.data.error) {
			dispatch({ type: TYPES.FETCH_COURSE_DETAILS, payload: response.data.data });
		}
	});
};

export const clearCourseDetails = () => {
	return { type: TYPES.FETCH_COURSE_DETAILS, payload: null };
};
