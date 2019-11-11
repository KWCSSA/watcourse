import React from 'react';
import { Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../css/navBar.css';

export default class NavBar extends React.Component {
	state = { activePath: '/' };

	componentDidMount() {
		this.setState({
			activePath: window.location.pathname
		});
	}

	navClick(path) {
		this.setState({
			activePath: path
		});
	}

	renderNavOption(path, text, icon) {
		return this.state.activePath === path ? (
			<Link className='col navbar-option' key={path} to={path} onClick={() => this.navClick(path)}>
				<i className='material-icons navbar-option-icon'>{icon}</i>
				<div className='navbar-option-text'>{text}</div>
			</Link>
		) : (
			<Link className='col navbar-option inactive' key={path} to={path} onClick={() => this.navClick(path)}>
				<i className='material-icons navbar-option-icon'>{icon}</i>
				<div className='navbar-option-text'>{text}</div>
			</Link>
		);
	}

	render() {
		const listOfOptions = [
			{
				path: '/',
				text: '首页',
				icon: 'home'
			},
			{
				path: '/courses',
				text: '查询',
				icon: 'search'
			}
			// {
			// 	path: '/bookmarks',
			// 	text: '收藏',
			// 	icon: 'bookmark'
			// }
		];
		return (
			<Nav>
				<Row id='navbar-row'>{listOfOptions.map(({ path, text, icon }) => this.renderNavOption(path, text, icon))}</Row>
			</Nav>
		);
	}
}
