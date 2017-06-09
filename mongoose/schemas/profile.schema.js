let mongoose = require( 'mongoose' );
let ObjectId = mongoose.Schema.ObjectId;

module.exports = mongoose.Schema( {
	_id: String,
	first_name: String,
	last_name: String,
	reports:  [ {
		type: ObjectId,
		ref: 'Report'
	} ],
	age_range: String,
	locale: String,
	gender: String,
	link: {
		type: ObjectId,
		ref: 'Link'
	},
	links: [ {
		type: ObjectId,
		ref: 'Link'
	} ],
	timezone: Number,
	picture: String,
	user_name: String,
	user_names: [ String ],
	description: String,
	type: String,
	members: [ {
		type: String,
		ref: 'Profile'
	} ],
	attending: [ {
		type: String,
		ref: 'Profile'
	} ],
	fan_count: Number,
	is_comunity_page: Boolean,
	location: String,
	verified: Boolean,
	is_verified: Boolean,
	parent_page: {
		type: String,
		ref: 'Profile'
	},
	events: [{
		type: String,
		ref: 'Profile'
	}],
} );