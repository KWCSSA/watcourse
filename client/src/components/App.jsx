import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../css/app.css';

import NavBar from './NavBar';

const Home = () => <h1>Home</h1>;
const CourseList = () => <h1>Course List</h1>;
const BookMarkList = () => <h1>Book Mark List</h1>;
const NotFound404 = () => <h1>404 Not Found</h1>;

class App extends React.Component {
	render() {
		return (
			<div className='app-root'>
				<div className='app-title'>WATCOURSE</div>
				<BrowserRouter>
					<div className='app-area'>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/courses' component={CourseList} />
							<Route exact path='/bookmarks' component={BookMarkList} />
							<Route component={NotFound404} />
						</Switch>
					</div>
					<NavBar />
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
