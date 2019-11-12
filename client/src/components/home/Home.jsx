import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/home/home.css';

function Home(props) {
	return (
		<div className='home-root'>
			<img className='home-app-logo' src='/images/logo.png' alt='WATCOURSE logo' />
			<h5 style={{ textAlign: 'center', marginBottom: '20px' }}>请使用查询页面查看课程详情信息</h5>
			<h5 style={{ textAlign: 'center', marginBottom: '20px' }}>添加到桌面使用体验更佳</h5>
			<Link to={'/addtohome/ios'} className='home-app-addtohome'>
				<img src='/images/iosAddToHome/safari.svg' alt='Safari' className='home-app-addtohome-icon' /> 添加到桌面
			</Link>
			<Link to={'/addtohome/chrome'} className='home-app-addtohome'>
				<img src='/images/chromeAddToHome/chrome.svg' alt='Chrome' className='home-app-addtohome-icon' /> 添加到桌面
			</Link>
		</div>
	);
}

export default Home;
