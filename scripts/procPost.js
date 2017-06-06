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
	d.comments = processComments( data.comments )
	// d.reactions = data.reactions // edge /reactions
	// d.link_id = data.link
	// d.tags = data.message_tags
	// d.with_tags = data.with_tags
	// d.target_profiles = data.to
	d.story = data.story
	d.shares = data.shares && data.shares.count || 0
	d.place_id = data.place

	db.upsert( 'post', '_id', d ).then(function () {
		console.log('finito', arguments)
		process.exit()
	})
}

function getLinksFromText( text ) {
	return text.match( urlRegex )
}
function processComments( comments ) {
	if ( !comments) return []

	comments = comments.data
	let len = comments.length
	let result = [];

	for(let i = 0; i< len; i++){
		result.push( comments[i].id )
	}

	return result
}