import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import '../css/mainPages.css';

import * as actions from '../actions';
import { getTermCode } from '../utils/termCodeHelper';
import NavBar from './NavBar';
import CourseList from './courseList/CourseList';

const Home = () => <h1>Home</h1>;
const BookMarkList = () => <h1>Book Mark List</h1>;
const NotFound404 = () => <h1>404 Not Found</h1>;

class MainPages extends React.Component {
	componentDidMount() {
		this.props.fetchCourseList(getTermCode().currTermCode);
	}

	render() {
		return (
			<div className='app-root'>
				<div className='app-title'>WATCOURSE</div>
				<div className='app-area'>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/courses' component={CourseList} />
						<Route exact path='/bookmarks' component={BookMarkList} />
						<Route component={NotFound404} />
					</Switch>
				</div>
				<div className='app-navs'>
					<NavBar />
				</div>
			</div>
		);
	}
}

export default connect(null, actions)(MainPages);
