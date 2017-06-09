"use strict"

let async = require( 'neo-async' )
let FB = require( 'fb' )

let secrets = require( __dirname + '/../../secrets' )
let db = require( __dirname + '/../dbDriver' )
let procLinks = require( __dirname + '/procLinks' )
let utils = require( __dirname + '/utils' )

FB.setAccessToken( secrets.access_token )

// NOTE: can be used /scripts/fbkFieldsHelper.js
let fields = {
	event: 'id, description, name, timezone',
	page: 'id, about, bio, company_overview, description, fan_count, general_info, is_verified, link, location, mission, name, parent_page, personal_info, personal_interests',
	group: 'id, description, link, name',
}

let iterator = function ( profileId, done ) {

	console.log( 'processing profile:', profileId );

	getProfileMetaData( profileId )
		.then( getProfileData )
		.then( mapFbkData )
		.then( saveProfile )
		.then( function ( res ) {
			console.log( 'profile: ' + res._id + ' DONE' )
			done( null, res._id )
			return Promise.resolve()
		} )
		.catch( done )
}

module.exports = function procProfiles( profiles ) {

	console.log( 'profiles to process: ', profiles );

	return new Promise( function ( resolve, reject ) {

		if ( profiles && profiles.length )

			async.map( profiles, iterator, function ( err, res ) {
				if ( err ) reject( err )
				else
					resolve( res )
			} )
		else
			resolve()
	} )
}

function getProfileMetaData( profileId ) {

	console.log( 'fbk api get type profile: ', profileId );

	return new Promise( function ( resolve, reject ) {

		FB.api(
			'/' + profileId,
			'GET',
			{
				fields: 'id',
				metadata: true
			},
			function ( res ) {

				// 	console.log( 'API/' + profileId, arguments )
				// 	process.exit()

				if ( res.error )
					reject( res.error )
				else
					resolve( res )
			}
		)
	} )

}

function getProfileData( profile ) {

	console.log( 'fbk api get profile: ', profile.id, profile.metadata.type );

	return new Promise( function ( resolve, reject ) {

		FB.api(
			'/' + profile.id,
			'GET',
			{
				fields: fields[ profile.metadata.type ]
			},
			function ( res ) {

				// console.log( arguments )
				// 	process.exit()

				if ( res.error )
					reject( res.error )
				else
					resolve( res )
			}
		)
	} )

}

function mapFbkData( data ) {

	if ( !data ) return Promise.reject( new Error( 'Error mapFbkData - no data!' ) )

	// console.log( 'mapFbkData', data.id );

	let d = {}
	d._id = data.id
	d.first_name = data.first_name
	d.last_name = data.last_name
	d.age_range = data.age_range
	d.locale = data.locale
	d.gender = data.gender
	// d.link = data.link
	d.timezone = data.timezone || 0
	d.picture = data.picture
	d.user_name = data.name
	d.description = '' + (data.description || '') + (data.about || '') + (data.general_info || '') + (data.bio || '') + (data.company_overview || '') + (data.mission || '') + (data.personal_info || '') + (data.personal_interests || '')
	// members (sum: admins + data.band_members, booking_agent, general_manager, directed_by, owner, /roles, /admins, /members) naviazanych profilov (entita Profile)
	// comments (/comments)
	// d.attending = data.attending
	// d.interested = data.interested
	d.fan_count = data.fan_count || 0
	d.is_comunity_page = data.is_comunity_page || false
	d.location = data.location
	d.verified = data.verified || false
	d.is_verified = data.is_verified || false
	d.parent_page = data.parent_page
	// d.events = data.events

	return Promise.all( [

		procLinks( utils.getLinksFromText( d.description ) )

	] )
		.then( function ( results ) {

			let linkIds = results[ 0 ]

			if ( linkIds )
				d.links = linkIds;


			// profiles = profiles.filter(function(p){return p}); // filter falsy values
			// procProfiles( profiles )

			// console.log( 'returns', d._id );

			return Promise.resolve( d )
		} )
}

function saveProfile( d ) {

	if ( !d ) return Promise.reject( new Error( 'Error saveProfile - no data!' ) )

	return db.upsert( 'profile', '_id', d )
}