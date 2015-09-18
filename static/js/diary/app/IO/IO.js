import { BaseComponent } from 'base-frame';

import Ajax from './components/Ajax/Ajax';

function IO() {
    this.init();

    this.ajax = new Ajax( this._emitter );
}

IO.prototype = {

    signals: {
        global: {

        },
        local: {

        }
    },

    slots: {
        global: {

        },
        local: {

        }
    }
};

IO.extends( BaseComponent );

export default IO;