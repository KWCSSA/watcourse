import React from 'react';

import AppTitle from '../AppTitle';

class CourseDetails extends React.Component {
	state = { bookmarked: false };

	componentDidMount() {}

	render() {
		return (
			<div>
				<AppTitle />
			</div>
		);
	}
}

export default CourseDetails;
