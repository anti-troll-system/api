var MongoClient = require( 'mongodb' ).MongoClient
	, env = require( __dirname + '/env' )
	, assert = require( 'assert' );

// Connection URL 
var url = env.mongoUrl;

// Use connect method to connect to the Server 
MongoClient.connect( url, function ( err, db ) {
	if ( err ) return console.log( 'error', err );

	console.log( "Connected correctly to mongodb server" );

	db.close();
} );