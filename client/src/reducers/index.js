import { combineReducers } from 'redux';

import courseListReducer from './courseListReducer';
import searchTermReducer from './searchTermReducer';

export default combineReducers({
	courseList: courseListReducer,
	searchTerm: searchTermReducer
});
