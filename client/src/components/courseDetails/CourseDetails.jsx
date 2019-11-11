import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import '../../css/courseDetails/courseDetails.css';

import * as actions from '../../actions';
import AppTitle from '../AppTitle';
import CourseDetailsSections from './CourseDetailsSections';

class CourseDetails extends React.Component {
	state = { bookmarked: false };

	componentDidMount() {
		const { term, subject, catalogNumber } = this.props.match.params;
		this.props.fetchCourseDetails(term, subject, catalogNumber);
	}

	componentWillUnmount() {
		this.props.clearCourseDetails();
	}

	render() {
		if (this.props.courseDetails) {
			const {
				title,
				subject,
				catalogNumber,
				description,
				prerequisites,
				antirequisites,
				corequisites,
				sections,
				termsOffered
			} = this.props.courseDetails;
			return (
				<React.Fragment>
					<AppTitle displayReturn history={this.props.history} />
					<div className='details-root'>
						<div className='details-code'>
							{subject} {catalogNumber}
						</div>
						<div className='details-title'>{title}</div>
						<div className='details-section-title'>Description (简介)</div>
						<div className='details-section-body'>{description}</div>
						{prerequisites ? <div className='details-section-title'>Prerequisites (选修条件)</div> : ''}
						{prerequisites ? <div className='details-section-body'>{prerequisites}</div> : ''}
						{antirequisites ? <div className='details-section-title'>Antirequisites (与下列课程冲突)</div> : ''}
						{antirequisites ? <div className='details-section-body'>{antirequisites}</div> : ''}
						{corequisites ? <div className='details-section-title'>Corequisites (可共修课程)</div> : ''}
						{corequisites ? <div className='details-section-body'>{corequisites}</div> : ''}
						{termsOffered ? <div className='details-section-title'>Terms Offered (提供此课的学期)</div> : ''}
						{termsOffered ? (
							<div className='details-section-body'>
								{termsOffered
									.map(term => {
										if (term === 'F') return 'Fall';
										if (term === 'W') return 'Winter';
										if (term === 'S') return 'Spring';
										return '';
									})
									.join(', ')}
							</div>
						) : (
							''
						)}
						{sections ? <CourseDetailsSections sections={sections} term={this.props.match.params.term} /> : ''}
					</div>
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
