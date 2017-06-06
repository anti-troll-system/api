let mongoose = require( 'mongoose' );
let ObjectId = mongoose.Schema.ObjectId;

module.exports = mongoose.Schema( {
	fbk_id: String,
	type: String,
	message: String,
	likes_sum: Number,
	parent_id: ObjectId,
	post_id: ObjectId,
	time: { type: Date, default: Date.now },
	author_id: ObjectId,
	links: [ ObjectId ],
	replies: [ ObjectId ],
	replies_sum: Number,
	reactions: [ ObjectId ],
	link: String,
	link_name: String,
	link_description: String,
	link_id: ObjectId,
	tags: [ ObjectId ],
} );