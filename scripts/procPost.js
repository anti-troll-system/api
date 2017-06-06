let db = require( __dirname + '/dbDriver' )

// https://stackoverflow.com/a/9284473/861615
// let urlRegex = /(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/gi

// http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without
let urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=+$,\w]+@)?[A-Za-z0-9.\-]+|(?:www\.|[\-;:&=+$,\w]+@)[A-Za-z0-9.\-]+)((?:\/[+~%\/.\w\-_]*)?\??(?:[\-+=&;%@.\w_]*)#?(?:[.!\/\\\w]*))?)/gi

module.exports = function ( data ) {

	console.log('procPost', data)

	let d = {}

	d._id = data.id
	d.type = data.type
	d.message = data.message
	d.parent_id = data.parent_id
	d.time = data.created_time
	d.time_processed = Date.now()
	d.author_id = data.from.id
	d.confirm_by = data.admin_creator
	d.links = getLinksFromText( data.message )
	// d.comments = [ ObjectId ]
	// d.reactions = [ ObjectId ]
	d.link = data.link
	d.link_name = data.link_name
	d.link_caption = data.link_caption
	d.link_description = data.link_description
	// d.link_id = ObjectId
	// d.tags = [ ObjectId ]
	// d.with_tags = [ ObjectId ]
	// d.target_profiles = [ ObjectId ]
	d.story = data.story
	d.shares = data.shares || 0
	d.place_id = data.place


	db.upsert( 'post', '_id', d ).then(function () {
		console.log('finito', arguments)
		process.exit()
	})
}

function getLinksFromText( text ) {
	return text.match( urlRegex )
}