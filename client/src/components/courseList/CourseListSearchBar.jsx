import React from 'react';

import '../../css/courseList/courseListSearchBar.css';

class CourseListSearchBar extends React.Component {
	state = { inputValue: '', showClear: false };

	handleInputChange(value) {
		this.setState({
			inputValue: value
		});
		if (value === '') {
			this.setState({
				showClear: false
			});
		} else if (value !== '' && this.state.showClear !== true) {
			this.setState({
				showClear: true
			});
		}
		this.props.onUpdate(value);
	}

	handleClear() {
		if (this.state.showClear) {
			this.setState({
				inputValue: '',
				showClear: false
			});
			this.props.onUpdate('');
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className='list-search-icon'>
					<i className='material-icons'>search</i>
				</div>
				<div className='list-search-area'>
					<input
						className='list-search-input'
						placeholder='查找课程 (例: CS 135)'
						onChange={e => this.handleInputChange(e.target.value)}
						value={this.state.inputValue}
					/>
				</div>
				<div className='list-search-clear' onClick={this.handleClear.bind(this)}>
					{this.state.showClear ? (
						<i className='material-icons' style={{ fontSize: '20px' }}>
							cancel
						</i>
					) : (
						''
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default CourseListSearchBar;
