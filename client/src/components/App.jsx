import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { getTermCode } from '../utils/termCodeHelper';
import MainPages from './MainPages';
import CourseDetails from './courseDetails/CourseDetails';

class App extends React.Component {
	componentDidMount() {
		this.props.fetchCourseList(getTermCode().currTermCode);
	}

	render() {
		return (
			<React.Fragment>
				<BrowserRouter>
					<Switch>
						<Route exact path='/course/:term/:subject/:catalogNumber' component={CourseDetails} />
						<Route path='/' component={MainPages} />
					</Switch>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}

export default connect(null, actions)(App);
