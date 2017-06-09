"use strict";

let secrets = require( __dirname + '/../secrets' )
let FB = require( 'fb' )
let async = require( 'neo-async' )

let procPost = require( __dirname + '/procPost' )
// let procComment = require( __dirname + '/procComment' )

FB.setAccessToken( secrets.access_token )

module.exports = function ( reportData ) {

	let parsedLink = parseLink( reportData.link )
	// console.log( 'parsedLink', parsedLink )

	return getIdFromName( parsedLink.profileName )
		.then( function ( res ) {
			return getPostData( res.id, parsedLink.postId )
		} )
		.then( procPost )
		.then( function () {
			console.log( 'report: ' + reportData.link + ' DONE' )
			return Promise.resolve()
		} )

	// if ( parsedLink.commentId )
	// 	getCommentData( postId, parsedLink.commentId )
	// 		.then()
}

function parseLink( link ) {

	// test
	// link='https://www.facebook.com/vjednotejesila.sk/photos/a.1666881853639381.1073741828.1661484914179075/1798035663857332/?type=3&comment_id=1800640410263524&comment_tracking=%7B%22tn%22%3A%22R%22%7D'
	// link='https://www.facebook.com/oskar.dobrovodsky/posts/1576314412427652?comment_id=1576870255705401&comment_tracking=%7B%22tn%22%3A%22R2%22%7D'

	let parsedLink = link.match( /facebook\.com\/([^?]*)\?([^#]*)?/ )
	let path = parsedLink[ 1 ].split( '/' )
	let query = parsedLink[ 2 ].split( '&' )
	let queryObj = {}
	let len = query.length
	let postId

	for ( let i = 0; i < len; i++ ) {
		let splited = query[ i ].split( '=' )
		queryObj[ splited[ 0 ] ] = splited[ 1 ]
	}

	len = path.length

	if ( path[ len - 1 ] )
		postId = path[ len - 1 ]
	else
		postId = path[ len - 2 ]


	// console.log( 'dingdong', {
	// 	profileName: path[ 0 ],
	// 	postId: postId,
	// 	commentId: queryObj.comment_id,
	// } );
	// process.exit()

	return {
		profileName: path[ 0 ],
		postId: postId,
		commentId: queryObj.comment_id,
	}
}

function getIdFromName( profileName ) {

	return new Promise( function ( resolve, reject ) {
		FB.api(
			'/' + profileName,
			'GET',
			{ fields: "id" },
			function ( res ) {
				if ( res.error )
					reject( res.error )
				else
					resolve( res )
			}
		)
	} )
}

function getPostData( profileId, postId ) {

	console.log( 'fbk-api get post id: ', profileId + '_' + postId );

	return new Promise( function ( resolve, reject ) {
		FB.api(
			'/' + profileId + '_' + postId,
			'GET',
			// { fields: "id, type, parent_id, created_time, from, admin_creator, message, link{name, caption, description}, message_tags, with_tags, to, story, shares, place, comments{id, created_time, message, from, comments{id, created_time, message, from, comments}}" },
			{ fields: "id,type,parent_id,created_time,from,admin_creator,message,link{name,caption,description},message_tags,with_tags,to,story,shares,place" },
			// function () {
			// 	console.log( 'API/' + profileId + '_' + postId, arguments )
			// }
			function ( res ) {
				if ( res.error )
					reject( res.error )
				else
					resolve( res )
			}
		)
	} )

}

function getCommentData( postId, commentId ) {

	return new Promise( function ( resolve, reject ) {
		FB.api(
			'/' + postId + '_' + commentId,
			'GET',
			{ fields: "id, message, from" },
			function ( res ) {
				if ( res.error )
					reject( res.error )
				else
					resolve( res )
			}
		)
	} )
}

// notes:

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
// comment kiskovej photo 387389248048526_1329949463751380

// Event 391045274586071

// comment 1798035663857332_1800640410263524/?fields=attachment <-- medium pripojene ku komentu
// 1661484914179075_1798035663857332/attachments <-- media pripojene k postu

// type of object: ?metadata=1
//
// {
// 	"name": "Jakub Lupták",
// 	"id": "1016911229"
// }

// miso janis 10205591363215863

// https://findmyfbid.com

// nefunguje regexp:
// https://www.facebook.com/oskar.dobrovodsky/posts/1576314412427652?comment_id=1576870255705401&comment_tracking=%7B%22tn%22%3A%22R2%22%7D
// https://www.facebook.com/photo.php?fbid=10203463176832880&set=a.1490331691057.65923.1016911229&type=3&comment_id=10208225056916906&comment_tracking=%7B%22tn%22%3A%22R%22%7D
// https://www.facebook.com/photo.php?fbid=10203463176832880&set=a.1490331691057.65923.1016911229&type=3&source=11&referrer_profile_id=1016911229&comment_id=10203478505496087&comment_tracking=%7B%22tn%22%3A%22R0%22%7D