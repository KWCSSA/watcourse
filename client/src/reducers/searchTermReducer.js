import { UPDATE_SEARCH_TERM } from '../TYPES';

export default (state = {}, action) => {
	switch (action.type) {
		case UPDATE_SEARCH_TERM: {
			return action.payload || [];
		}
		default: {
			return { length: 0, value: '' };
		}
	}
};
