import React from 'react';

import '../../css/home/home.css';

function Home(props) {
	return (
		<div className='home-root'>
			<img className='home-app-logo' src='/images/logo.png' alt='WATCOURSE logo' />
			<h3 style={{ textAlign: 'center' }}>请使用查询页面查看课程详情信息</h3>
		</div>
	);
}

export default Home;
