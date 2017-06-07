let db = require( __dirname + '/dbDriver' )
let utils = require( __dirname + '/utils' )
let processLinks = require( __dirname + '/procLinks' )
// let processProfiles = require( __dirname + '/procProfiles' )

module.exports = function ( data ) {

	console.log( 'procPost', data )

	let d = {}
	let profiles = [
		data.from.id,
		data.admin_creator,
	]

	d._id = data.id
	d.type = data.type
	d.message = data.message
	d.parent_id = data.parent_id
	d.time = data.created_time
	d.time_processed = Date.now()
	d.author_id = data.from.id
	d.confirm_by = data.admin_creator
	// d.reactions = data.reactions // edge /reactions
	// d.link_id = data.link
	// d.tags = data.message_tags
	// d.with_tags = data.with_tags
	// d.target_profiles = data.to
	d.story = data.story
	d.shares = data.shares && data.shares.count || 0
	d.place_id = data.place

	Promise.all( [

		processLinks( utils.getLinksFromText( data.message ) )
		// processProfiles(profiles)

	] ).then( function ( results ) {

		let linkIds = results[0]

		if ( linkIds )
			d.links = linkIds;

		db.upsert( 'post', '_id', d ).then( function () {
			console.log( 'finito', arguments )
			process.exit()
		} )
	} )

}