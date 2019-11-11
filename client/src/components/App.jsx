import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPages from './MainPages';

const CourseDetail = props => {
	console.log(props.match.params);
	return <div style={{ background: 'red', height: '100vh', width: '100vw' }}>{123}</div>;
};

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<BrowserRouter>
					<Switch>
						<Route exact path='/course/:term/:subject/:catalogNumber' component={CourseDetail} />
						<Route path='/' component={MainPages} />
					</Switch>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}

export default App;
