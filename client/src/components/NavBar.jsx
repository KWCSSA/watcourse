import React from 'react';
import { Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../css/navBar.css';

export default class NavBar extends React.Component {
	state = { activePath: 'home' };

	navClick(path) {
		this.setState({
			activePath: path
		});
	}

	renderNavOption(to, path, text, icon) {
		return this.state.activePath === path ? (
			<Link className='col navbar-option' key={to} to={to} onClick={() => this.navClick(path)}>
				<i className='material-icons navbar-option-icon'>{icon}</i>
				<div className='navbar-option-text'>{text}</div>
			</Link>
		) : (
			<Link className='col navbar-option inactive' key={to} to={to} onClick={() => this.navClick(path)}>
				<i className='material-icons navbar-option-icon'>{icon}</i>
				<div className='navbar-option-text'>{text}</div>
			</Link>
		);
	}

	render() {
		const listOfOptions = [
			{
				to: '/',
				path: 'home',
				text: '首页',
				icon: 'home'
			},
			{
				to: '/courses',
				path: 'courses',
				text: '查询',
				icon: 'search'
			},
			{
				to: '/bookmarks',
				path: 'bookmarks',
				text: '收藏',
				icon: 'bookmark'
			}
		];
		return (
			<Nav className='navbar-root'>
				<Row id='navbar-row'>
					{listOfOptions.map(({ to, path, text, icon }) => this.renderNavOption(to, path, text, icon))}
				</Row>
			</Nav>
		);
	}
}
