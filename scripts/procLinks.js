let async = require( 'neo-async' )
let db = require( __dirname + '/dbDriver' )

var iterator = function ( link, done ) {
	console.log( 'link is: ', link );
	db.upsert( 'link', 'url', { url: link } ).then( function ( res ) {
		console.log( 'dingdong link', arguments )
		done( null, res._id )
	} )
};

module.exports = function ( links ) {
	return new Promise( function ( resolve, reject ) {
		if ( links )
			async.map( links, iterator, function ( err, res ) {
				if ( err ) reject( err )
				else
					resolve( res )
			} )
		else
			resolve()
	} )
}