import { combineReducers } from 'redux';

import courseListReducer from './courseListReducer';

export default combineReducers({
	courseList: courseListReducer
});
