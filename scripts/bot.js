"use strict"

let db = require( __dirname + '/dbDriver' )
let processReport = require( __dirname + '/procReport' )

db.onConnection( function () {
	// we're connected!

	loadTestReportToDb()
		.then( processFirstUnprocessedLink )
		.then( function () {
			console.log( 'ALL DONE!!!' );
			process.exit()
		} )
		.catch( handleError )

} )

function loadTestReportToDb() {
	return db.create( 'report', {
		link: 'https://www.facebook.com/vjednotejesila.sk/photos/a.1666881853639381.1073741828.1661484914179075/1798035663857332/?type=3&comment_id=1800640410263524&comment_tracking=%7B%22tn%22%3A%22R%22%7D',
		ip_address: '123.124.125.126'
	} )
}

function handleError( error ) {
	console.error( 'error:', error );
	process.exit( 1 )
}

function processFirstUnprocessedLink() {
	return db.readOne( 'report', { processed: undefined } )
		.then( handleReport )
}

function handleReport( report ) {
	return processReport( report )
		.then( function () {
			report.processed = Date.now()
			report.save()
		} )
		.catch( function ( error ) {
			console.error( 'error', error )
			process.exit( 1 )
		} )
}