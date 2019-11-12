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
		if (this.props.courseDetails && !this.props.courseDetails.error) {
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
						<div className='details-part-title'>Description (简介)</div>
						<div className='details-part-body'>{description}</div>
						{prerequisites ? <div className='details-part-title'>Prerequisites (选修条件)</div> : ''}
						{prerequisites ? <div className='details-part-body'>{prerequisites}</div> : ''}
						{antirequisites ? <div className='details-part-title'>Antirequisites (与下列课程冲突)</div> : ''}
						{antirequisites ? <div className='details-part-body'>{antirequisites}</div> : ''}
						{corequisites ? <div className='details-part-title'>Corequisites (可共修课程)</div> : ''}
						{corequisites ? <div className='details-part-body'>{corequisites}</div> : ''}
						{termsOffered && termsOffered.length > 0 ? (
							<div className='details-part-title'>Terms Offered (提供此课的学期)</div>
						) : (
							''
						)}
						{termsOffered && termsOffered.length > 0 ? (
							<div className='details-part-body'>
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
		} else if (this.props.courseDetails && this.props.courseDetails.error) {
			return (
				<React.Fragment>
					<AppTitle displayReturn history={this.props.history} />
					<div className='details-root'>
						<div className='h-100 w-100 d-flex justify-content-center align-items-center flex-column'>
							<i className='material-icons' style={{ fontSize: '60px', color: '#ff0000', marginBottom: '10px' }}>
								error
							</i>
							<h5>很抱歉，查找的课程信息不存在</h5>
						</div>
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
