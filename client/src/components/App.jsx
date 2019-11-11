import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPages from './MainPages';
import CourseDetails from './courseDetails/CourseDetails';

class App extends React.Component {
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

export default App;
