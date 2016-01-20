import React, { Component } from 'react';

export class Timer extends Component {
	constructor(props) {
		super(props);
		this.startX = this.props.width / 2;
		this.startY = this.props.strokeWidth / 2;
		this.radius = this.startX - this.startY;
		this.time = +this.props.time;

		this.state = {
			time: 0
		};
	}

	componentDidMount() {
		const self = this;
		setTimeout(function update() {
			if(self.state.time === self.time) {
				self.props.queue.put();
			} else {
				self.setState({
					time: Math.ceil((self.state.time + 0.1) * 10)/10
				});
				setTimeout(update, 100);
			}
		}, 100);
	}

	static getCoord(r, deg, x0, y0) {
		var a, b, x, y;

		a = r * Math.sin((deg * 2 / 100) * Math.PI);
		b = r * Math.cos((deg * 2 / 100) * Math.PI);
		x = x0 + a;
		y = y0 + (r - b);

		return {
			x,
			y
		};
	}

	getArcPath(i) {
		const coord = Timer.getCoord(this.radius, i, this.startX, this.startY);
		if(i === 100) {
			return `M ${this.startX}, ${this.startX}
					m -${this.radius}, 0
					a ${this.radius}, ${this.radius} 0 1,0, ${this.radius * 2}, 0
					a ${this.radius}, ${this.radius} 0 1,0, -${this.radius * 2}, 0`;
		} else {
			return `M ${this.startX}, ${this.startY}
					A ${this.radius}, ${this.radius}, 0, ${i <= 50 ? '0' : '1'}, 1, ${coord.x}, ${coord.y}`;
		}
	}

	render() {
		const path = this.getArcPath(this.state.time * 100 / this.time);

		return (
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.width}>
				<path d={path}/>
			</svg>
		)
	}
}