var mongoose = require( 'mongoose' );
var ObjectId = mongoose.Schema.ObjectId;

module.exports = mongoose.Schema( {
	type: String,
	message: String,
	parent_id: ObjectId,
	time: { type: Date, default: Date.now },
	author_id: ObjectId,
	onfirm_by: ObjectId,
	links: [ ObjectId ],
	comments: [ ObjectId ],
	reactions: [ ObjectId ],
	link: String,
	link_name: String,
	link_caption: String,
	link_description: String,
	link_id: ObjectId,
	tags: [ ObjectId ],
	with_tags: [ ObjectId ],
	target_profiles: [ ObjectId ],
	story: String,
	shares: Number,
	place_id: ObjectId,
} );