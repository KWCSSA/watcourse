import React from 'react';

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
			</div>
			<div className='app-title-center'>WATCOURSE</div>
			<div className='app-title-right' />
		</div>
	);
}

export default AppTitle;
