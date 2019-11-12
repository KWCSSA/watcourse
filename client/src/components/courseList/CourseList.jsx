import React from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
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
		searchTerm: '',
		termUpdated: false
	};

	listRef = React.createRef();

	componentDidMount() {
		this.setState({
			showTerm: getTermCode().currTermCode,
			availableTerms: getTermCode()
		});
	}

	componentDidUpdate() {
		if (
			this.props.courseList &&
			!this.props.courseList.error &&
			JSON.stringify(this.state.list) !== JSON.stringify(this.props.courseList.courses)
		) {
			const sortedCourseList = this.props.courseList.courses.sort((courseA, courseB) => {
				if (courseA.subject > courseB.subject) {
					return 1;
				} else if (courseA.subject < courseB.subject) {
					return -1;
				} else {
					return parseInt(courseA.catalogNumber) - parseInt(courseB.catalogNumber);
				}
			});
			if (this.state.termUpdated) {
				this.props.updateSearchTerm('');
				this.setState({ termUpdated: false });
			}
			this.setState({
				list: sortedCourseList.slice(0),
				listToShow: sortedCourseList.slice(0)
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
										return parseInt(courseA.catalogNumber) - parseInt(courseB.catalogNumber);
									}
								})
			});
		}
	}

	handleListItemClick(course) {
		this.props.history.push(`/course/${course.term}/${course.subject}/${course.catalogNumber}`);
	}

	renderListItem({ index, style }) {
		return (
			<CourseListItem style={style} handleClick={this.handleListItemClick.bind(this)}>
				{this.state.listToShow[index]}
			</CourseListItem>
		);
	}

	handleSearchTextUpdate(value) {
		this.props.updateSearchTerm(value);
		this.listRef.current.scrollToItem(0);
	}

	handleSearchTermUpdate(value) {
		this.setState({
			listToShow: null,
			termUpdated: true
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
									itemSize={45}
									itemCount={this.state.listToShow.length}
									ref={this.listRef}
									style={{ outline: 'none' }}
								>
									{this.renderListItem.bind(this)}
								</List>
							)}
						</AutoSizer>
					</div>
				</React.Fragment>
			);
		} else if (this.props.courseList && this.props.courseList.error) {
			return (
				<div className='h-100 w-100 d-flex justify-content-center align-items-center flex-column'>
					<i className='material-icons' style={{ fontSize: '60px', color: '#ff0000', marginBottom: '10px' }}>
						error
					</i>
					<h5>很抱歉，服务器错误，请检查网络</h5>
				</div>
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
