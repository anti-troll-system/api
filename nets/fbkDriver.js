"use strict"

let FB = require( 'fb' )

let driver = {}
let secrets = require( __dirname + '/../secrets' )

FB.setAccessToken( secrets.access_token )

// NOTE: can be used /utils/fbkFieldsHelper.js
let fields = {
	default: 'id, name, picture, link',
	event: 'id, description, name, timezone',
	page: 'id, about, bio, company_overview, description, fan_count, general_info, is_verified, link, location, mission, name, parent_page, personal_info, personal_interests',
	group: 'id, description, link, name',
}

driver.getCommentData = function ( postId, commentId ) {

	console.log( 'api fbk get comment data for: ', postId + '_' + commentId );

	return new Promise( function ( resolve, reject ) {
		FB.api(
			'/' + postId + '_' + commentId,
			'GET',
			{ fields: "id, message, like_count, parent, created_time, from, comment_count, attachment, message_tags" },
			function ( res ) {
				if ( res.error )
					reject( res.error )
				else
					resolve( res )
			}
		)
	} )
}

driver.getCommentsData = function ( postId, cursor, subcomments ) {

	console.log( 'api fbk get bulk of comments data for: ', postId, cursor, subcomments );

	return new Promise( function ( resolve, reject ) {

		FB.api(
			'/' + ( subcomments ? subcomments : postId ) + '/comments',
			'GET',
			{
				fields: "id, message, like_count, parent, created_time, from, comment_count, attachment, message_tags",
				after: cursor || 0
			},
			function ( res ) {

				// 	console.log( 'API/' + profileId, arguments )
				// 	process.exit()

				res._post_id = postId
				res._subcomments = subcomments

				if ( res.error )
					reject( res.error )
				else
					resolve( res )
			}
		)
	} )

}

driver.getPostData = function ( profileId, postId ) {

	console.log( 'fbk-api get post id: ', profileId + '_' + postId );

	return new Promise( function ( resolve, reject ) {
		FB.api(
			'/' + profileId + '_' + postId,
			'GET',
			// { fields: "id, type, parent_id, created_time, from, admin_creator, message, link{name, caption, description}, message_tags, with_tags, to, story, shares, place, comments{id, created_time, message, from, comments{id, created_time, message, from, comments}}" },
			{ fields: "id,type,parent_id,created_time,from,admin_creator,message,link{name,caption,description},message_tags,with_tags,to,story,shares,place" },
			// function () {
			// 	console.log( 'API/' + profileId + '_' + postId, arguments )
			// }
			function ( res ) {
				if ( res.error )
					reject( res.error )
				else
					resolve( res )
			}
		)
	} )

}

driver.getIdFromName = function ( profileName ) {

	return new Promise( function ( resolve, reject ) {
		FB.api(
			'/' + profileName,
			'GET',
			{ fields: "id" },
			function ( res ) {
				if ( res.error )
					reject( res.error )
				else
					resolve( res )
			}
		)
	} )
}

driver.getProfileData = function ( profile ) {

	if ( !profile.metadata )
		profile.metadata = {}

	console.log( 'fbk api get profile: ', profile.id, profile.metadata.type );

	return new Promise( function ( resolve, reject ) {

		FB.api(
			'/' + profile.id,
			'GET',
			{
				fields: fields[ profile.metadata.type || 'default' ]
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

driver.getProfileMetaData = function ( profileId ) {

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

module.exports = driver

// notes:

// sme.sk 38050018641
// vjednotejesila.sk 1661484914179075
// OSEL.cz 147605783965
// ctiborlaky 354128978096002
// photo post 1661484914179075_1798035663857332
// photo sharing post 1661484914179075_1806727202988178
// link sharing post 1661484914179075_1794648724196026
// link sharing post osel 147605783965_10155373835458966
// video post 38050018641_10155304706238642
// comment 1798035663857332_1800640410263524
// subcomment 1798035663857332_1802279196766312
// comment kiskovej photo 387389248048526_1329949463751380

// Event 391045274586071

// comment 1798035663857332_1800640410263524/?fields=attachment <-- medium pripojene ku komentu
// 1661484914179075_1798035663857332/attachments <-- media pripojene k postu

// type of object: ?metadata=1
//
// {
// 	"name": "Jakub Lupták",
// 	"id": "1016911229"
// }

// miso janis 10205591363215863

// https://findmyfbid.com

// nefunguje regexp:
// https://www.facebook.com/oskar.dobrovodsky/posts/1576314412427652?comment_id=1576870255705401&comment_tracking=%7B%22tn%22%3A%22R2%22%7D
// https://www.facebook.com/photo.php?fbid=10203463176832880&set=a.1490331691057.65923.1016911229&type=3&comment_id=10208225056916906&comment_tracking=%7B%22tn%22%3A%22R%22%7D
// https://www.facebook.com/photo.php?fbid=10203463176832880&set=a.1490331691057.65923.1016911229&type=3&source=11&referrer_profile_id=1016911229&comment_id=10203478505496087&comment_tracking=%7B%22tn%22%3A%22R0%22%7D