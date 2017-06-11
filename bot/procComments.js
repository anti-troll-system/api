"use strict"

let db = require( __dirname + '/../mongoose/mngDriver' )
let fbk = require( __dirname + '/../nets/fbkDriver' )
let procLinks = require( __dirname + '/procLinks' )
let procProfiles = require( __dirname + '/procProfiles' )
let utils = require( __dirname + '/../utils/utils' )

module.exports = function procComments( postId ) {

	console.log( 'processing comments for post: ', postId );

	return fbk.getCommentsData( postId )
		.then( mapCommentsFbkData )
		.then( function () {
			console.log( 'comments for post: ' + postId + ' DONE' )
			return Promise.resolve()
		} )
}

function mapCommentsFbkData( commentsData ) {

	let promises = []
	let data = commentsData.data
	let len = data.length

	for ( let i = 0; i < len; i++ ) {
		promises.push( mapCommentFbkData( data[ i ] ) )
	}

	if ( data.paging && data.paging.next )
		promises.push( fbk.getCommentsData( commentsData._post_id, data.paging.cursor.after, commentsData._subcomments )
			.then( mapCommentsFbkData ) )

	return Promise.all( promises )
}

function mapCommentFbkData( data ) {

	if ( !data ) return Promise.reject( new Error( 'Error mapCommentsFbkData - no data!' ) )

	// console.log( 'mapCommentsFbkData', data.id );

	let d = {}
	d._id = data.id
	d.message = data.message
	d.likes_sum = data.like_count || 0
	d.parent_id = data.parent && data.parent.id
	d.post_id = data._post_id
	d.time = data.created_time
	d.author_id = data.from.id
	d.replies_sum = data.comment_count || 0
	// d.reactions = /reactions
	d.attachment = data.attachment
	d.tags = data.message_tags

	return Promise.all( [

		procLinks( utils.getLinksFromText( d.message ) )

	] )
		.then( function ( results ) {

			let linkIds = results[ 0 ]

			if ( linkIds )
				d.links = linkIds;


			// profiles = profiles.filter(function(p){return p}); // filter falsy values
			// procProfiles( profiles )

			let promises = [
				procProfiles( [ data.from.id ] )
			]

			if ( data.comment_count )
				promises.push( fbk.getCommentsData( data._post_id, null, data.id )
					.then( mapCommentsFbkData ) )

			return Promise.all( promises )
				.then( function () {
					return saveComment( d )
				} )
		} )
}

function saveComment( d ) {

	if ( !d ) return Promise.reject( new Error( 'Error saveComment - no data!' ) )

	return db.upsert( 'comment', '_id', d )
}