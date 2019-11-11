import { UPDATE_SEARCH_TERM } from '../TYPES';

export default (state = null, action) => {
	switch (action.type) {
		case UPDATE_SEARCH_TERM: {
			return action.payload || [];
		}
		default: {
			return state;
		}
	}
};
