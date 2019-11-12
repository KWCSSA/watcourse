import React from 'react';
import { Route, Switch } from 'react-router-dom';

import '../css/mainPages.css';

import NavBar from './NavBar';
import Home from './home/Home';
import CourseList from './courseList/CourseList';
import AppTitle from './AppTitle';
import NotFound404 from './NotFound404';

class MainPages extends React.Component {
	render() {
		return (
			<div className='app-root'>
				<AppTitle />
				<div className='app-area'>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/courses' component={CourseList} />
						{/* <Route exact path='/bookmarks' component={BookMarkList} /> */}
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
