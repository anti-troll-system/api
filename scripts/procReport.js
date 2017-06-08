"use strict";

let secrets = require( __dirname + '/../secrets' )
let FB = require( 'fb' )
let async = require( 'neo-async' )

let processPost = require( __dirname + '/procPost' )
// let processComment = require( __dirname + '/procComment' )

FB.setAccessToken( secrets.access_token )

module.exports = function ( reportData ) {

	let parsedLink = parseLink( reportData.link )
	// console.log( 'parsedLink', parsedLink )

	if ( parsedLink ) { // successfully parsed

		let profileName = parsedLink[ 1 ]
		let postId = parsedLink[ 2 ]
		let commentId = parsedLink[ 4 ]

		return getIdFromName( profileName )
			.then( function ( res ) {
				return getPostData( res.id, postId )
			} )
			.then( processPost )
			.then( function () {
				console.log( 'procReport ' + reportData.link + ' DONE' )
				return Promise.resolve()
			} )

		// if ( commentId )
		// 	getCommentData( postId, commentId )
		// 		.then()
	}
	else
		return Promise.reject( 'Link parsing failed: ' + reportData.link )
}

function parseLink( link ) {

	/*
	 * parsedLink[ 1 ] = profile (page,user...) name where post is situated
	 * parsedLink[ 2 ] = postId
	 * parsedLink[ 3 ] = NO DATA ( helper )
	 * parsedLink[ 4 ] = commentId
	 * */

	return link.match( /www\.facebook\.com\/([\w\-.]*)\/.*\/([0-9]*)\/(\?.*comment_id=([0-9]*))?/ )
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

	console.log( 'geting post id: ', profileId + '_' + postId );

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

// Event 391045274586071

// comment 1798035663857332_1800640410263524/?fields=attachment <-- medium pripojene ku komentu
// 1661484914179075_1798035663857332/attachments <-- media pripojene k postu

// type of object: ?metadata=1