import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { getTermCode } from '../utils/termCodeHelper';
import MainPages from './MainPages';
import CourseDetails from './courseDetails/CourseDetails';
import AddToHome from './AddToHome';

class App extends React.Component {
	componentDidMount() {
		this.props.fetchCourseList(getTermCode().currTermCode);
	}

	render() {
		const iosImgSources = [ '/images/iosAddToHome/1.jpg', '/images/iosAddToHome/2.jpg', '/images/iosAddToHome/3.jpg' ];
		const chromeImgSources = [
			'/images/chromeAddToHome/1.jpg',
			'/images/chromeAddToHome/2.jpg',
			'/images/chromeAddToHome/3.jpg',
			'/images/chromeAddToHome/4.jpg'
		];
		return (
			<React.Fragment>
				<BrowserRouter>
					<Switch>
						<Route exact path='/course/:term/:subject/:catalogNumber' component={CourseDetails} />
						<Route exact path='/addtohome/ios' render={() => <AddToHome imgSources={iosImgSources} />} />
						<Route exact path='/addtohome/chrome' render={() => <AddToHome imgSources={chromeImgSources} />} />
						<Route path='/' component={MainPages} />
					</Switch>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}

export default connect(null, actions)(App);
