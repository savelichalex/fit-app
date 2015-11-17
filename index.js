var db = require( './models/index' );
var Exercises = db.Exercises;

Exercises
    .create( { title: 'squats' } )
    .then(function ( arguments ) {
        console.log( arguments );
    });