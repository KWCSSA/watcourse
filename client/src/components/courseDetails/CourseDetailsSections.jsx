import React from 'react';

import '../../css/courseDetails/courseDetailsSections.css';

import { parseTermCode } from '../../utils/termCodeHelper';

function CourseDetailsSections(props) {
	function renderLastUpdated(time) {
		const date = new Date(Date.parse(time));
		return (
			[ date.getFullYear(), date.getMonth() + 1, date.getDate() ]
				.map(n => (n.toString()[1] ? n.toString() : `0${n.toString()}`))
				.join('-') +
			' ' +
			[ date.getHours(), date.getMinutes() ].map(n => (n.toString()[1] ? n.toString() : `0${n.toString()}`)).join(':')
		);
	}

	function renderTotalCap(total, cap) {
		if (cap === total) {
			return (
				<span style={{ color: '#979797' }}>
					{total} / {cap}
				</span>
			);
		} else if (cap - total < 10 && cap !== 0) {
			return (
				<span style={{ color: '#ff0000' }}>
					{total} / {cap}
				</span>
			);
		} else {
			return (
				<span style={{ color: '#008000' }}>
					{total} / {cap}
				</span>
			);
		}
	}

	function renderClass(timeSlot, index) {
		function parseDayStyles(weekdays) {
			var days = [
				{ width: '20%', textAlign: 'center', color: '#d3d3d3', border: '1px solid #d3d3d3' },
				{ width: '20%', textAlign: 'center', color: '#d3d3d3', border: '1px solid #d3d3d3', borderLeft: 'none' },
				{ width: '20%', textAlign: 'center', color: '#d3d3d3', border: '1px solid #d3d3d3', borderLeft: 'none' },
				{ width: '20%', textAlign: 'center', color: '#d3d3d3', border: '1px solid #d3d3d3', borderLeft: 'none' },
				{ width: '20%', textAlign: 'center', color: '#d3d3d3', border: '1px solid #d3d3d3', borderLeft: 'none' }
			];
			var weekdaysArray = weekdays.split('');
			for (let i = 0; i < weekdaysArray.length; ++i) {
				switch (weekdaysArray[i]) {
					case 'M': {
						days[0].color = '#000';
						days[0].borderWidth = '1.5px';
						days[0].borderColor = '#000';
						break;
					}
					case 'T': {
						if (weekdaysArray[i + 1] && weekdaysArray[i + 1] === 'h') {
							days[3].color = '#000';
							days[3].borderWidth = '1.5px';
							days[3].borderColor = '#000';
							days[3].borderLeft = '1px solid #000';
							days[2].borderRight = 'none';
							i += 1;
						} else {
							days[1].color = '#000';
							days[1].borderWidth = '1.5px';
							days[1].borderColor = '#000';
							days[1].borderLeft = '1px solid #000';
							days[0].borderRight = 'none';
						}
						break;
					}
					case 'W': {
						days[2].color = '#000';
						days[2].borderWidth = '1.5px';
						days[2].borderColor = '#000';
						days[2].borderLeft = '1px solid #000';
						days[1].borderRight = 'none';
						break;
					}
					case 'F': {
						days[4].color = '#000';
						days[4].borderWidth = '1.5px';
						days[4].borderColor = '#000';
						days[4].borderLeft = '1px solid #000';
						days[3].borderRight = 'none';
						break;
					}
					default:
						break;
				}
			}
			return days;
		}

		const { instructors, location, date } = timeSlot;
		if (!date.is_tba && date.weekdays) {
			var weekdayStyles = parseDayStyles(date.weekdays);
		}
		return (
			<div className='details-sections-timeslot-root' key={index}>
				<div className='details-sections-row'>
					<div className='details-sections-col-l'>Instructor (讲师)</div>
					<div className='details-sections-col-rest'>{instructors.length > 0 ? instructors[0] : '待定'}</div>
				</div>
				<div className='details-sections-row'>
					<div className='details-sections-col-l'>Location (地点)</div>
					<div className='details-sections-col-rest'>
						{location.building && location.room ? `${location.building} ${location.room}` : '待定'}
					</div>
				</div>
				<div className='details-sections-row'>
					<div className='details-sections-col-l'>Time (时间)</div>
					<div className='details-sections-col-rest'>
						{!date.is_tba && date.end_time && date.start_time ? `${date.start_time} - ${date.end_time}` : '待定'}
					</div>
				</div>
				{!date.is_tba && date.weekdays ? (
					<div className='details-sections-row'>
						<div style={weekdayStyles[0]}>周一</div>
						<div style={weekdayStyles[1]}>周二</div>
						<div style={weekdayStyles[2]}>周三</div>
						<div style={weekdayStyles[3]}>周四</div>
						<div style={weekdayStyles[4]}>周五</div>
					</div>
				) : (
					''
				)}
			</div>
		);
	}

	function renderReserve(reserve, index) {
		const { reserve_group, enrollment_total, enrollment_capacity } = reserve;
		return (
			<div className='details-sections-row' key={index}>
				<div className='details-sections-col-l'>{reserve_group}</div>
				<div className='details-sections-col-rest'>{renderTotalCap(enrollment_total, enrollment_capacity)}</div>
			</div>
		);
	}

	function renderSection(classSection, index) {
		const {
			classNumber,
			section,
			capacity,
			total,
			reserves,
			waitingCapacity,
			waitingTotal,
			classes,
			units,
			note,
			lastUpdated
		} = classSection;
		var style = {};
		if (capacity === total) {
			style.border = '1px solid #d3d3d3';
		} else if (capacity - total < 10 && capacity !== 0) {
			style.border = '1px solid #ffa2a2';
		} else {
			style.border = '1px solid #a2d0a2';
		}
		return (
			<div key={index} className='details-sections-root' style={style}>
				<div className='details-sections-row'>
					<div className='details-sections-col-l'>Class Number (班次编号)</div>
					<div className='details-sections-col-m'>{classNumber}</div>
					<div className='details-sections-col-r'>
						{/* <i className='material-icons details-sections-star'>star</i> */}
					</div>
				</div>
				<div className='details-sections-row'>
					<div className='details-sections-col-l'>Section Name (班次名称)</div>
					<div className='details-sections-col-rest'>{section}</div>
				</div>
				<div className='details-sections-row'>
					<div className='details-sections-col-l'>Units (学分)</div>
					<div className='details-sections-col-rest'>{units}</div>
				</div>
				<div className='details-sections-row'>
					<div className='details-sections-col-l'>Enrollment (已选人数)</div>
					<div className='details-sections-col-rest'>{renderTotalCap(total, capacity)}</div>
				</div>
				{reserves.length > 0 ? <div className='details-sections-row'>Reserves (预留)</div> : ''}
				{reserves.length > 0 ? (
					<div className='details-sections-list'>{reserves.map((reserve, index) => renderReserve(reserve, index))}</div>
				) : (
					''
				)}
				{waitingCapacity > 0 ? (
					<div className='details-sections-row'>
						<div className='details-sections-col-l'>Waiting (候选人数)</div>
						<div className='details-sections-col-rest'>{renderTotalCap(waitingTotal, waitingCapacity)}</div>
					</div>
				) : (
					''
				)}
				<div className='details-sections-row'>Time slots (课程时间)</div>
				<div className='details-sections-list'>{classes.map((timeSlot, index) => renderClass(timeSlot, index))}</div>
				{note ? <div className='details-sections-row'>Note (备注): {note}</div> : ''}
				<div className='details-sections-row' style={{ fontSize: '13px', color: '#808080' }}>
					Last Updated (更新时间): {renderLastUpdated(lastUpdated)}
				</div>
			</div>
		);
	}

	const { term, year } = parseTermCode(props.term);
	return (
		<React.Fragment>
			<div className='details-part-title'>
				{term} {year} Sections (课程班次)
			</div>
			<div className='details-part-body'>{props.sections.map((section, index) => renderSection(section, index))}</div>
		</React.Fragment>
	);
}

export default CourseDetailsSections;
