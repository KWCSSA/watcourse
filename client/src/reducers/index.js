import { combineReducers } from 'redux';

import courseListReducer from './courseListReducer';
import searchTermReducer from './searchTermReducer';
import courseDetailsReducer from './courseDetailsReducer';

export default combineReducers({
	courseList: courseListReducer,
	searchTerm: searchTermReducer,
	courseDetails: courseDetailsReducer
});
