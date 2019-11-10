import React from 'react';
import { connect } from 'react-redux';
import { List, AutoSizer } from 'react-virtualized';

import '../../css/courseList/courseList.css';

import { getTermCode } from '../../utils/termCodeHelper';
import CourseListItem from './CourseListItem';
import CourseListSearchBar from './CourseListSearchBar';

class CourseList extends React.Component {
	state = {
		list: null,
		listToShow: [
			{ subject: 'CS', catalogNumber: '136', title: 'Computational Methods for Partial Differential Equations' },
			{ subject: 'CS', catalogNumber: '136', title: 'Computational Methods for Partial Differential Equations' }
		]
	};

	componentDidMount() {
		this.setState({
			showTerm: getTermCode().currTermCode,
			availableTerms: getTermCode()
		});
	}

	componentDidUpdate() {
		if (JSON.stringify(this.state.list) !== JSON.stringify(this.props.courseList)) {
			this.setState({
				list: this.props.courseList,
				listToShow: this.props.courseList
			});
		}
	}

	handleListItemClick(course) {
		console.log(course);
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

	handleSearchUpdate(value) {
		this.setState({
			listToShow: this.state.list
				.filter(course => {
					var targetSubject = value.replace(/[0-9]/g, '').replace(/\s/g, '').toUpperCase();
					var targetCatalogNum = value.replace(/\D/g, '');
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

	render() {
		if (this.state.listToShow) {
			return (
				<React.Fragment>
					<div className='list-search'>
						<CourseListSearchBar onUpdate={this.handleSearchUpdate.bind(this)} />
					</div>
					<div className='list-items'>
						<AutoSizer>
							{({ height, width }) => (
								<List
									height={height}
									width={width}
									rowHeight={40}
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
			return <div>Loading...</div>;
		}
	}
}

function mapStateToProps(state) {
	return {
		courseList: state.courseList
	};
}

export default connect(mapStateToProps)(CourseList);
