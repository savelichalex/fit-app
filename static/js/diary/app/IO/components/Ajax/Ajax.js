import { BaseComponent } from 'base-frame';

import Promise from 'bluebird';

function Ajax( global ) {
    this._globalEmitter = global;

    this.init();
}

Ajax.prototype = {

    signals: {
        global: {

        }
    },

    slots: {
        global: {
            'command@ajax:get': function (url) {
                return this.getRequest(url);
            },
            'command@ajax:post': function ( url, data ) {
                return this.postRequest( url, data );
            }
        }
    },

    getXmlHttp: function(){
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    },

    getRequest: function ( url ) {
        var xhr = this.getXmlHttp();
        xhr.open( 'GET', url, true );
        var p = new Promise( function ( resolve, reject ) {
            xhr.onreadystatechange = function () {
                if ( xhr.readyState === 4 ) {
                    if( xhr.status === 200 ) {
                        resolve( xhr.responseText );
                    } else {
                        reject( xhr.status, xhr.statusText );
                    }
                }
            }
        } );

        xhr.send( null );
        return p;
    },

    postRequest: function ( url, data, contentType ) {
        contentType = contentType === 'text' ? 'text/plain' : ( contentType === 'json' ? 'application/json' : contentType );
        var xhr = this.getXmlHttp();
        xhr.open( 'POST', url, true );
        xmlhttp.setRequestHeader('Content-Type', contentType);
        var p = new Promise( function ( resolve, reject ) {
            xhr.onreadystatechange = function () {
                if ( xhr.readyState === 4 ) {
                    if( xhr.status === 200 ) {
                        resolve( xhr.responseText );
                    } else {
                        reject( xhr.status, xhr.statusText );
                    }
                }
            }
        } );

        xhr.send( data );
        return p;
    }

};

Ajax.extends( BaseComponent );

export default Ajax;