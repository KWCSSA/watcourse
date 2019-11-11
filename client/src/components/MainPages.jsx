import React from 'react';
import { Route, Switch } from 'react-router-dom';

import '../css/mainPages.css';

import NavBar from './NavBar';
import CourseList from './courseList/CourseList';
import AppTitle from './AppTitle';

const Home = () => <h1>Home</h1>;
const BookMarkList = () => <h1>Book Mark List</h1>;
const NotFound404 = () => <h1>404 Not Found</h1>;

class MainPages extends React.Component {
	render() {
		return (
			<div className='app-root'>
				<AppTitle />
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

export default MainPages;
