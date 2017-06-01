var mongoose = require( 'mongoose' );

module.exports = mongoose.Schema( {
	time: { type: Date, default: Date.now },
	link: String,
	ip_address: String,
	reporter_id: ObjectId,
	comment_id: ObjectId,
	post_id: ObjectId,
	author_id: ObjectId,
} );