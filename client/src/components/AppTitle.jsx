import React from 'react';
import { Link } from 'react-router-dom';

import '../css/appTitle.css';

function AppTitle(props) {
	return (
		<div className='app-title'>
			<div className='app-title-left'>
				{props.displayReturn ? (
					<i className='material-icons app-title-icon' onClick={() => props.history.goBack()}>
						keyboard_arrow_left
					</i>
				) : (
					''
				)}
				{props.displayGoHome ? (
					<Link to={'/'} className='app-title-left' style={{ color: '#000' }}>
						<i className='material-icons app-title-icon'>keyboard_arrow_left</i>
					</Link>
				) : (
					''
				)}
			</div>
			<div className='app-title-center'>WATCOURSE</div>
			<div className='app-title-right' />
		</div>
	);
}

export default AppTitle;
