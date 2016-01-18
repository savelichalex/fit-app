import React, { Component } from 'react';

export class Timer extends Component {
    constructor(props) {
        super(props);
        this.startX = this.props.width / 2;
        this.startY = this.props.strokeWidth / 2;
        this.radius = this.props.width - this.startY;
        this.time = +this.props.time;

        this.state = {
            time: 0
        };
    }

    componentDidMount() {
        const self = this;
        setTimeout(function update() {
            if (self.state.time === self.time) {
                self.props.queue.put();
            } else {
                self.setState({
                    time: self.state.time + 1
                });
                setTimeout(update, 1000);
            }
        }, 1000);
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
        debugger;
        return [
            'M ',
            this.startX,
            ',',
            this.startY,
            ' A ',
            this.radius,
            ' ',
            this.radius,
            ', 0, ',
            i <= 50 ? '0' : '1',
            ', 1, ',
            coord.x,
            ', ',
            coord.y
        ].join('');
    }

    render() {
        const path = this.getArcPath(this.state.time * this.radius / this.time);

        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height}>
                <path d={path}/>
            </svg>
        )
    }
}