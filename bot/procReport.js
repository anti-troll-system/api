"use strict";

let utils = require( __dirname + '/../utils/utils' )
let fbk = require( __dirname + '/../nets/fbkDriver' )
let procPost = require( __dirname + '/procPost' )
// let procComment = require( __dirname + '/procComment' )

module.exports = function ( reportData ) {

	let parsedLink = utils.parseLink( reportData.link )
	// console.log( 'parsedLink', parsedLink )

	return fbk.getIdFromName( parsedLink.profileName )
		.then( function ( res ) {
			return fbk.getPostData( res.id, parsedLink.postId )
		} )
		.then( procPost )
		.then( function () {
			console.log( 'report: ' + reportData.link + ' DONE' )
			return Promise.resolve()
		} )

	// if ( parsedLink.commentId )
	// 	fbk.getCommentData( postId, parsedLink.commentId )
	// 		.then()
}