import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import '../../css/courseDetails/courseDetails.css';

import * as actions from '../../actions';
import AppTitle from '../AppTitle';

class CourseDetails extends React.Component {
	state = { bookmarked: false };

	componentDidMount() {
		const { term, subject, catalogNumber } = this.props.match.params;
		this.props.fetchCourseDetails(term, subject, catalogNumber);
	}

	render() {
		console.log(this.props.courseDetails);
		if (this.props.courseDetails) {
			return (
				<React.Fragment>
					<AppTitle displayReturn history={this.props.history} />
					<div className='details-root' />
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<AppTitle displayReturn history={this.props.history} />
					<div className='details-root'>
						<div className='h-100 w-100 d-flex justify-content-center align-items-center'>
							<Spinner animation='border' style={{ height: '30px', width: '30px' }} />
						</div>
					</div>
				</React.Fragment>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		courseDetails: state.courseDetails
	};
}

export default connect(mapStateToProps, actions)(CourseDetails);
