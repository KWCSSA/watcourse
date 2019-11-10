import React from 'react';

import '../../css/courseList/courseListItem.css';

const CourseListItem = props => {
	var title = props.children.title;
	if (title.length > 50) {
		title = title.slice(0, 57) + '...';
	}

	return (
		<div style={props.style} className='list-item' onClick={() => props.handleClick(props.children)}>
			<div className='list-item-code'>
				{props.children.subject} {props.children.catalogNumber}
			</div>
			<div className='list-item-title'>{title}</div>
		</div>
	);
};

export default CourseListItem;
