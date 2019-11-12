import React from 'react';
import { Carousel } from 'react-bootstrap';

import '../css/addToHome.css';

import AppTitle from './AppTitle';

class AddToHome extends React.Component {
	render() {
		console.log(this.props);
		return (
			<React.Fragment>
				<AppTitle
					displayReturn={this.props.history ? true : false}
					displayGoHome={!this.props.history ? true : false}
					history={this.props.history}
				/>
				<div className='d-flex' style={{ height: '100vh', width: '100vw', paddingTop: '47px', background: '#000' }}>
					<Carousel interval={null} className='h-100 w-100'>
						{this.props.imgSources.map((imgSrc, index) => (
							<Carousel.Item key={index} className='h-100 w-100'>
								<img src={imgSrc} style={{ maxHeight: '100%' }} />
							</Carousel.Item>
						))}
					</Carousel>
				</div>
			</React.Fragment>
		);
	}
}

export default AddToHome;
