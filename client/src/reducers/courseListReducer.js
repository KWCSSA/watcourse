import { FETCH_COURSE_LIST } from '../TYPES';

export default (state = null, action) => {
	switch (action.type) {
		case FETCH_COURSE_LIST: {
			return action.payload || [];
		}
		default: {
			return state;
		}
	}
};
