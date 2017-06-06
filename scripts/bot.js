let db = require( __dirname + '/dbDriver' );

let processReport = require( __dirname + '/procReport' );

db.read( 'report', { processed: undefined }, function ( report ) {
	processReport(report);
	report.processed = Date.now();
	report.save();
} )