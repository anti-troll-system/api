let db = require( __dirname + '/../mongoose/driver' )
let utils = require( __dirname + '/../utils' )
let procLinks = require( __dirname + '/procLinks' )
let procProfiles = require( __dirname + '/procProfiles' )
let procComments = require( __dirname + '/procComments' )

module.exports = function ( data ) {

	console.log( 'processing post:', data.id )

	let d = {}
	let profiles = [
		data.from.id,
		data.admin_creator && data.admin_creator.id
	]

	d._id = data.id
	d.type = data.type
	d.message = data.message
	d.parent_id = data.parent_id
	d.time = data.created_time
	d.time_processed = Date.now()
	d.author_id = data.from.id
	d.confirm_by = data.admin_creator && data.admin_creator.id
	// d.reactions = data.reactions // edge /reactions
	// d.link_id = data.link
	// d.tags = data.message_tags
	// d.with_tags = data.with_tags
	// d.target_profiles = data.to
	d.story = data.story
	d.shares = data.shares && data.shares.count || 0
	d.place_id = data.place

	return Promise.all( [

		procLinks( utils.getLinksFromText( data.message ) )

	] )
		.then( function ( results ) {

			let linkIds = results[ 0 ]

			if ( linkIds )
				d.links = linkIds;

			profiles = profiles.filter( function ( p ) {
				// filter falsy values
				return p
			} );

			// console.log('profiles', profiles);

			return Promise.all( [
				procProfiles( profiles ),
				procComments( d._id ),
				savePost( d )
			] )

		} )
		.then( function () {
			console.log( 'post: ' + d._id + ' DONE' )
			return Promise.resolve()
		} )
}

function savePost( d ) {

	return db.upsert( 'post', '_id', d )
}