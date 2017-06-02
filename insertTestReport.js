var db = require( __dirname + '/dbDriver' );
var env = require( __dirname + '/env' );
var report = require( __dirname + '/schemas/report.schema' );


db.open = function () {
	// we're connected!
	db.create( 'report', {
		link: 'https://www.facebook.com/vjednotejesila.sk/photos/a.1666881853639381.1073741828.1661484914179075/1798035663857332/?type=3&comment_id=1800640410263524&comment_tracking=%7B%22tn%22%3A%22R%22%7D',
		ip_address: '123.124.125.126'
	}, function () {
		console.log( 'done', arguments );
	} )
};