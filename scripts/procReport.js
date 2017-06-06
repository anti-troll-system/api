let secrets = require( __dirname + '/../secrets' )
let FB = require( 'fb' )
let async = require( 'neo-async' )

let processPost = require( __dirname + '/procPost' )
// let processComment = require( __dirname + '/procComment' )

FB.setAccessToken( secrets.access_token )

module.exports = function ( report ) {

	/*
	 * parsedLink[ 1 ] = profile (page,user...) name where post is situated
	 * parsedLink[ 2 ] = postId
	 * parsedLink[ 3 ] = NO DATA = optional group
	 * parsedLink[ 4 ] = commentId
	 * */

	let userInput = report.link
	let parsedLink = userInput.match( /www\.facebook\.com\/([\w\-.]*)\/.*\/([0-9]*)\/(\?.*comment_id=([0-9]*))?/ )

	console.log( 'parsedLink', parsedLink )
	// sme.sk 38050018641
	// vjednotejesila.sk 1661484914179075
	// OSEL.cz 147605783965
	// ctiborlaky 354128978096002
	// photo post 1661484914179075_1798035663857332
	// photo sharing post 1661484914179075_1806727202988178
	// link sharing post 1661484914179075_1794648724196026
	// link sharing post osel 147605783965_10155373835458966
	// video post 38050018641_10155304706238642
	// comment 1798035663857332_1800640410263524
	// subcomment 1798035663857332_1802279196766312

	// comment 1798035663857332_1800640410263524/?fields=attachment <-- medium pripojene ku komentu
	// 1661484914179075_1798035663857332/attachments <-- media pripojene k postu

	if ( parsedLink ) {

		let profileName = parsedLink[ 1 ]
		let postId = parsedLink[ 2 ]
		let commentId = parsedLink[ 4 ]

		async.series( [

			getIdFromName.bind( null, profileName )

		], function ( res ) {

			if ( !res || res.error ) {
				console.log( !res ? 'error occurred' : res.error )
				return
			}

			let profileId = res.id

			console.log( 'profileId', profileId )

			getPostData( profileId, postId, function ( res ) {
				if ( !res || res.error ) {
					console.log( !res ? 'error occurred' : res.error );
					return;
				}

				processPost( res )
			} )

			// getCommentData( postId, commentId, function ( res ) {
			// 	if ( !res || res.error ) {
			// 		console.log( !res ? 'error occurred' : res.error );
			// 		return;
			// 	}
			// } )
		} )
	}
	else {
		console.log( 'Link parsing failed', report.link )
		process.exit( 1 )
	}
}

function getIdFromName( profileName, callback ) {

	FB.api(
		'/' + profileName,
		'GET',
		{ fields: "id" },
		callback
	)
}

function getCommentData( postId, commentId, callback ) {

	if ( postId )
		FB.api(
			'/' + postId + '_' + commentId,
			'GET',
			{ fields: "id, message, from" },
			callback
		)
	else
		callback( false )
}

function getPostData( profileId, postId, callback ) {

	console.log( profileId + '_' + postId );

	FB.api(
		'/' + profileId + '_' + postId,
		'GET',
		{ fields: "id,message,created_time,from,comments{id,created_time,message,from,comments{id,created_time,message,from,comments}}" },
		// function () {
		// 	console.log( 'API/' + profileId + '_' + postId, arguments )
		// }
		callback
	)
}