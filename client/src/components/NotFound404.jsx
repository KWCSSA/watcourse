import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function NotFound404(props) {
	return (
		<div className='w-100 h-100 d-flex justify-content-center align-items-center flex-column'>
			<i className='material-icons' style={{ fontSize: '60px', color: '#ff0000', marginBottom: '10px' }}>
				error
			</i>
			<h5 style={{ marginBottom: '15px' }}>很抱歉，访问的页面不存在</h5>
			<Link to='/'>
				<Button style={{ width: '100px' }}>主页</Button>
			</Link>
		</div>
	);
}

export default NotFound404;
