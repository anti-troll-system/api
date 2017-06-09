let mongoose = require( 'mongoose' );
let ObjectId = mongoose.Schema.ObjectId;

module.exports = mongoose.Schema( {
	time: { type: Date, default: Date.now },
	processed: Date,
	link: String,
	ip_address: String,
	reporter_id: {
		type: String,
		ref: 'Profile'
	},
	comment_id: {
		type: String,
		ref: 'Comment'
	},
	post_id: {
		type: String,
		ref: 'Post'
	},
	author_id: {
		type: String,
		ref: 'Profile'
	},
} );