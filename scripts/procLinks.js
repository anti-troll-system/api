"use strict"

let async = require( 'neo-async' )
let db = require( __dirname + '/dbDriver' )

let iterator = function ( link, done ) {

	db.upsert( 'link', 'url', { url: link } ).then( function ( res ) {
		done( null, res._id )
	} )
		.catch( done )
}

module.exports = function ( links ) {

	return new Promise( function ( resolve, reject ) {

		if ( links && links.length )

			async.map( links, iterator, function ( err, res ) {
				if ( err ) reject( err )
				else
					resolve( res )
			} )
		else
			resolve()
	} )
}