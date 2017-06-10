let mongoose = require( 'mongoose' );
let ObjectId = mongoose.Schema.ObjectId;

module.exports = mongoose.Schema( {
	_id: String,
	type: String,
	message: String,
	likes_sum: Number,
	parent_id: {
		type: String,
		ref: 'Post'
	},
	post_id: {
		type: String,
		ref: 'Post'
	},
	report_id: {
		type: ObjectId,
		ref: 'Report'
	},
	time: { type: Date, default: Date.now },
	author_id: {
		type: String,
		ref: 'Profile'
	},
	links: [ {
		type: ObjectId,
		ref: 'Link'
	} ],
	replies_sum: Number,
	reactions: [ {
		type: ObjectId,
		ref: 'Reaction'
	} ],
	link: {
		type: ObjectId,
		ref: 'Link'
	},
	tags: [ {
		type: ObjectId,
		ref: 'Tag'
	} ],
} );