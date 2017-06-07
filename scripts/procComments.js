let db = require( __dirname + '/dbDriver' )
let utils = require( __dirname + '/utils' )

module.exports = function ( postId ) {

	console.log( 'procComments', postId )

	// let d = {}
	//
	// d._id = data.id
	// d.message = data.message
	// d.likes_sum = data.like_count
	// d.parent_id = data.parent
	// d.post_id = data.post_id
	// d.time = data.created_time
	// d.author_id = data.from
	// d.links = utils.getLinksFromText( data.message )
	// d.replies = data.comments
	// d.replies_sum = data.comment_count
	// d.reactions = data.reactions
	// d.attachment = data.attachment
	// d.tags = data.message_tags
	//
	// return db.upsert( 'comment', '_id', d )
}