function Queue( cb, context ) {
    if( !cb ) {
        throw new Error( 'You must specified callback');
    }
    this._cb = cb;
    this._context = context || null;
}

Queue.prototype = {
    constructor: Queue,

    put: function () {
        var len = arguments.length;
        var args;
        switch( len ) {
            case 0: this._putZero(); break;
            case 1: this._putOne( arguments[ 0 ] ); break;
            case 2: this._putTwo( arguments[ 0 ], arguments[ 1 ] ); break;
            case 3: this._putThree( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ] ); break;
            default:
                args = new Array( len ? len - 1 : 0 );
                for ( let i = 0 ; i < len; i++ ) {
                    args[ i ] = arguments[ i ];
                }
                this._putMany( args );
        }
    },

    _putZero: function () {
        this._cb.call( this._context );
    },

    _putOne: function ( f ) {
        this._cb.call( this._context, f );
    },

    _putTwo: function( f, s ) {
        this._cb.call( this._context, f, s );
    },

    _putThree: function( f, s, t ) {
        this._cb.call( this._context, f, s, t );
    },

    _putMany: function( args ) {
        this._cb.apply( this._context, args );
    }
};

module.exports.Queue = Queue;