'use strict';

const BaseComponent = require('base-components').BaseComponent;
const Renderer = require('base-frame-server/Renderer');

class Rufie extends BaseComponent {
    constructor(mediator) {
        super(mediator);
    }

    slots() {
        return {
            global: {
                'on@request:rufie': this.onIndex
            }
        }
    }

    onIndex(data) {
        Renderer.parse(__dirname + '/views/rufie-index.html', {}, data.res);
    }
}

module.exports = Rufie;
