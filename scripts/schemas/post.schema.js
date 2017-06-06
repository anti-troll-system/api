let mongoose = require( 'mongoose' );
let ObjectId = mongoose.Schema.ObjectId;

module.exports = mongoose.Schema( {
	_id: String,
	type: String,
	message: String,
	parent_id: {
		type: String,
		ref: 'Profile'
	},
	time: Date,
	processed: { type: Date, default: Date.now },
	author_id: {
		type: String,
		ref: 'Profile'
	},
	confirm_by: {
		type: String,
		ref: 'Profile'
	},
	links: [ {
		type: ObjectId,
		ref: 'Link'
	} ],
	comments: [ {
		type: String,
		ref: 'Comment'
	} ],
	reactions: [ {
		type: ObjectId,
		ref: 'Reaction'
	} ],
	link: String,
	link_name: String,
	link_caption: String,
	link_description: String,
	link_id: {
		type: ObjectId,
		ref: 'Link'
	},
	tags: [ {
		type: ObjectId,
		ref: 'Tag'
	} ],
	with_tags: [ {
		type: String,
		ref: 'Profile'
	} ],
	target_profiles: [ {
		type: String,
		ref: 'Profile'
	} ],
	story: String,
	shares: Number,
	place_id: {
		type: String,
		ref: 'Profile'
	},
} );

// module.exports = mongoose.Schema( {
// 	_id: String,
// 	type: String,
// 	message: String,
// 	parent_id: {
// 		type: String,
// 		ref: 'Profile'
// 	},
// 	time: Date,
// 	processed: { type: Date, default: Date.now },
// 	author_id: {
// 		type: String,
// 		ref: 'Profile'
// 	},
// 	confirm_by: {
// 		type: String,
// 		ref: 'Profile'
// 	},
// 	links: {
// 		type: [ String ],
// 		ref: 'Link'
// 	},
// 	comments: {
// 		type: [ String ],
// 		ref: 'Comment'
// 	},
// 	reactions: {
// 		type: [ String ],
// 		ref: 'Profile'
// 	},
// 	link: String,
// 	link_name: String,
// 	link_caption: String,
// 	link_description: String,
// 	link_id: {
// 		type: String,
// 		ref: 'Link'
// 	},
// 	tags: {
// 		type: [ String ],
// 		ref: 'Tag'
// 	},
// 	with_tags: {
// 		type: [ String ],
// 		ref: 'Profile'
// 	},
// 	target_profiles: {
// 		type: [ String ],
// 		ref: 'Profile'
// 	},
// 	story: String,
// 	shares: Number,
// 	place_id: {
// 		type: String,
// 		ref: 'Profile'
// 	},
// } );

// module.exports = mongoose.Schema( {
// 	_id: ObjectId,
// 	type: String,
// 	message: String,
// 	parent_id: {
// 		type: ObjectId,
// 		ref: 'Profile'
// 	},
// 	time: Date,
// 	processed: { type: Date, default: Date.now },
// 	author_id: {
// 		type: ObjectId,
// 		ref: 'Profile'
// 	},
// 	confirm_by: {
// 		type: ObjectId,
// 		ref: 'Profile'
// 	},
// 	links: {
// 		type: [ ObjectId ],
// 		ref: 'Link'
// 	},
// 	comments: {
// 		type: [ ObjectId ],
// 		ref: 'Comment'
// 	},
// 	reactions: {
// 		type: [ ObjectId ],
// 		ref: 'Profile'
// 	},
// 	link: String,
// 	link_name: String,
// 	link_caption: String,
// 	link_description: String,
// 	link_id: {
// 		type: ObjectId,
// 		ref: 'Link'
// 	},
// 	tags: {
// 		type: [ ObjectId ],
// 		ref: 'Tag'
// 	},
// 	with_tags: {
// 		type: [ ObjectId ],
// 		ref: 'Profile'
// 	},
// 	target_profiles: {
// 		type: [ ObjectId ],
// 		ref: 'Profile'
// 	},
// 	story: String,
// 	shares: Number,
// 	place_id: {
// 		type: ObjectId,
// 		ref: 'Profile'
// 	},
// } );