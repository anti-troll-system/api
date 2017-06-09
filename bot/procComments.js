"use strict"

let FB = require( 'fb' )

let secrets = require( __dirname + '/../secrets' )
let db = require( __dirname + '/../mongoose/driver' )
let procLinks = require( __dirname + '/procLinks' )
let procProfiles = require( __dirname + '/procProfiles' )
let utils = require( __dirname + '/utils' )

FB.setAccessToken( secrets.access_token )

module.exports = function procComments( postId ) {

	console.log( 'processing comments for post: ', postId );

	return getCommentsData( postId )
		.then( mapFbkData )
		.then( function () {
			console.log( 'comments for post: ' + postId + ' DONE' )
			return Promise.resolve()
		} )
}

function getCommentsData( postId, cursor, subcomments ) {

	console.log( 'api fbk get bulk of comments data for: ', postId, cursor, subcomments );

	return new Promise( function ( resolve, reject ) {

		FB.api(
			'/' + ( subcomments ? subcomments : postId ) + '/comments',
			'GET',
			{
				fields: "id, message, like_count, parent, _post_id, created_time, from, comment_count, attachment, message_tags, comments {id}",
				after: cursor || 0
			},
			function ( res ) {

				// 	console.log( 'API/' + profileId, arguments )
				// 	process.exit()

				res._post_id = postId
				res._subcomments = subcomments

				if ( res.error )
					reject( res.error )
				else
					resolve( res )
			}
		)
	} )

}

function mapFbkData( commentsData ) {

	let promises = []
	let data = commentsData.data
	let len = data.length

	for ( let i = 0; i < len; i++ ) {
		promises.push( mapFbkDataOne( data[ i ] ) )
	}

	if ( data.paging && data.paging.next )
		promises.push( getCommentsData( commentsData._post_id, data.paging.cursor.after, commentsData._subcomments )
			.then( mapFbkData ) )

	return Promise.all( promises )
}

function mapFbkDataOne( data ) {

	if ( !data ) return Promise.reject( new Error( 'Error mapFbkData - no data!' ) )

	// console.log( 'mapFbkData', data.id );

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

			if ( data.comments )
				promises.push( getCommentsData( data._post_id, data.paging && data.paging.cursor.after, data.id )
					.then( mapFbkData ) )

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