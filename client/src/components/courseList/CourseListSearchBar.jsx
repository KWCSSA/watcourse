import React from 'react';
import { connect } from 'react-redux';

import '../../css/courseList/courseListSearchBar.css';

import { getTermCode, parseTermCode } from '../../utils/termCodeHelper';
class CourseListSearchBar extends React.Component {
	constructor(props) {
		super(props);
		const { currTermCode } = getTermCode();
		this.state = { inputValue: '', selectValue: currTermCode, showClear: false };
	}

	componentDidMount() {
		if (this.props.courseList && this.state.selectValue !== this.props.courseList.term) {
			this.setState({
				selectValue: this.props.courseList.term
			});
		}
	}

	componentDidUpdate() {
		if (this.props.courseList && this.state.selectValue !== this.props.courseList.term) {
			this.setState({
				selectValue: this.props.courseList.term
			});
		}
		if (this.props.searchTerm && this.state.inputValue !== this.props.searchTerm.value) {
			this.setState({
				inputValue: this.props.searchTerm.value
			});
		}
		if (this.state.inputValue.length > 0 && !this.state.showClear) {
			this.setState({
				showClear: true
			});
		}
	}

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
		this.props.onTextUpdate(value);
	}

	handleSelectChange(value) {
		this.setState({
			selectValue: value
		});
		this.props.onTermUpdate(value);
	}

	handleClear() {
		if (this.state.showClear) {
			this.setState({
				inputValue: '',
				showClear: false
			});
			this.props.onTextUpdate('');
		}
	}

	renderTermSelect() {
		const { currTermCode, nextTermCode } = getTermCode();
		return (
			<React.Fragment>
				<select
					className='list-search-term-select'
					onChange={e => this.handleSelectChange(e.target.value)}
					value={this.state.selectValue}
				>
					<option value={currTermCode}>
						{`${parseTermCode(currTermCode).term} ${parseTermCode(currTermCode).year}`}
					</option>
					<option value={nextTermCode}>
						{`${parseTermCode(nextTermCode).term} ${parseTermCode(nextTermCode).year}`}
					</option>
				</select>
			</React.Fragment>
		);
	}

	render() {
		return (
			<div className='list-search-root'>
				<div className='list-search-code'>
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
				</div>
				<div className='list-search-term'>{this.renderTermSelect()}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		courseList: state.courseList,
		searchTerm: state.searchTerm
	};
}

export default connect(mapStateToProps)(CourseListSearchBar);
