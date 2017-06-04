var db = require( __dirname + '/dbDriver' );

db.read( 'report', { processed: undefined }, function ( doc ) {
	doc.processed = Date.now();
	doc.save();
} )