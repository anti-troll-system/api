"use strict"

let db = require( __dirname + '/../mongoose/mngDriver' )
let procReport = require( __dirname + '/procReport' )

db.onConnection( function () {
	// we're connected!

	// test:
	// loadTestReportToDb()
	// 	.then( procFirstUnprocessedLink )
	// 	.then( function () {
	// 		console.log( 'ALL DONE!!!' );
	// 		process.exit()
	// 	} )
	// 	.catch( handleError )

	procUnprocessedLinks()

} )

function loadTestReportToDb() {
	return db.create( 'report', {link: 'https://www.facebook.com/vjednotejesila.sk/photos/a.1666881853639381.1073741828.1661484914179075/1798035663857332/?type=3&comment_id=1800640410263524&comment_tracking=%7B%22tn%22%3A%22R%22%7D',ip_address: '123.124.125.126',processed: Date.now()} )
}

function handleError( error ) {
	console.error( 'error:', error );
	process.exit( 1 )
}

function procUnprocessedLinks() {

	procFirstUnprocessedLink()
		.then( procUnprocessedLinks )
		.catch( function () {
			// update bot mock
			setTimeout( procUnprocessedLinks, 5000 )
		} )
}

function procFirstUnprocessedLink() {
	return db.readOne( 'report', { processed: null } )
		.then( handleReport )
}

function handleReport( report ) {

	if ( report )

		return procReport( report )
			.then( function () {
				report.processed = Date.now()
				report.save()
			} )
			.catch( function ( error ) {
				console.error( 'error', error )
				process.exit( 1 )
			} )

	else
		return Promise.reject( 'no unprocessed reports' )
}