import React from 'react';

import '../../css/courseDetails/courseDetails.css';

import AppTitle from '../AppTitle';

class CourseDetails extends React.Component {
	state = { bookmarked: false };

	componentDidMount() {
		console.log(this.props.match);
	}

	render() {
		return (
			<React.Fragment>
				<AppTitle displayReturn history={this.props.history} />
				<div className='details-root'>C</div>
			</React.Fragment>
		);
	}
}

export default CourseDetails;
