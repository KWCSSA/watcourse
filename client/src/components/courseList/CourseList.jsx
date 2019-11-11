import React from 'react';
import { connect } from 'react-redux';
import { List, AutoSizer } from 'react-virtualized';
import { Spinner } from 'react-bootstrap';

import '../../css/courseList/courseList.css';

import * as actions from '../../actions';
import { getTermCode } from '../../utils/termCodeHelper';
import CourseListItem from './CourseListItem';
import CourseListSearchBar from './CourseListSearchBar';

class CourseList extends React.Component {
	state = {
		list: null,
		listToShow: null,
		searchTerm: ''
	};

	componentDidMount() {
		this.setState({
			showTerm: getTermCode().currTermCode,
			availableTerms: getTermCode()
		});
	}

	componentDidUpdate() {
		if (this.props.courseList && JSON.stringify(this.state.list) !== JSON.stringify(this.props.courseList.courses)) {
			this.setState({
				list: this.props.courseList.courses,
				listToShow: this.props.courseList.courses
			});
		}
		if (this.state.list && this.props.searchTerm && this.state.searchTerm !== this.props.searchTerm.value) {
			this.setState({
				searchTerm: this.props.searchTerm.value,
				listToShow:
					this.props.searchTerm.length === 0
						? this.state.list
						: this.state.list
								.filter(course => {
									var targetSubject = this.props.searchTerm.value
										.replace(/[0-9]/g, '')
										.replace(/\s/g, '')
										.toUpperCase();
									var targetCatalogNum = this.props.searchTerm.value.replace(/\D/g, '');
									if (course.subject.includes(targetSubject) && course.catalogNumber.includes(targetCatalogNum)) {
										return true;
									} else {
										return false;
									}
								})
								.sort((courseA, courseB) => {
									if (courseA.subject > courseB.subject) {
										return 1;
									} else if (courseA.subject < courseB.subject) {
										return -1;
									} else {
										return Number(courseA.catalogNumber) - Number(courseB.catalogNumber);
									}
								})
			});
		}
	}

	handleListItemClick(course) {
		this.props.history.push(`/course/${course.term}/${course.subject}/${course.catalogNumber}`);
	}

	renderListItem({ index, style, key, parent }) {
		return (
			<CourseListItem
				style={style}
				key={key}
				parent={parent}
				rowIndex={index}
				handleClick={this.handleListItemClick.bind(this)}
			>
				{this.state.listToShow[index]}
			</CourseListItem>
		);
	}

	handleSearchTextUpdate(value) {
		this.props.updateSearchTerm(value);
	}

	handleSearchTermUpdate(value) {
		this.setState({
			listToShow: null
		});

		this.props.fetchCourseList(value);
	}

	render() {
		if (this.state.listToShow) {
			return (
				<React.Fragment>
					<CourseListSearchBar
						onTextUpdate={this.handleSearchTextUpdate.bind(this)}
						onTermUpdate={this.handleSearchTermUpdate.bind(this)}
					/>
					<div className='list-items'>
						<AutoSizer>
							{({ height, width }) => (
								<List
									height={height}
									width={width}
									rowHeight={45}
									rowCount={this.state.listToShow.length}
									rowRenderer={this.renderListItem.bind(this)}
									scrollToIndex={0}
									style={{ outline: 'none' }}
								/>
							)}
						</AutoSizer>
					</div>
				</React.Fragment>
			);
		} else {
			return (
				<div className='h-100 w-100 d-flex justify-content-center align-items-center'>
					<Spinner animation='border' style={{ height: '30px', width: '30px' }} />
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		courseList: state.courseList,
		searchTerm: state.searchTerm
	};
}

export default connect(mapStateToProps, actions)(CourseList);
