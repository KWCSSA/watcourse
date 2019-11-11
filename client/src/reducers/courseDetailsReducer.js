import { FETCH_COURSE_DETAILS } from '../TYPES';

export default (state = null, action) => {
	switch (action.type) {
		case FETCH_COURSE_DETAILS: {
			return action.payload || [];
		}
		default: {
			return state;
		}
	}
};
