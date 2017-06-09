let utils = {}

// https://stackoverflow.com/a/9284473/861615
// let urlRegex = /(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/gi

// http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without
let urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=+$,\w]+@)?[A-Za-z0-9.\-]+|(?:www\.|[\-;:&=+$,\w]+@)[A-Za-z0-9.\-]+)((?:\/[+~%\/.\w\-_]*)?\??(?:[\-+=&;%@.\w_]*)#?(?:[.!\/\\\w]*))?)/gi

let urlOnlyRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=+$,\w]+@)?[A-Za-z0-9.\-]+|(?:www\.|[\-;:&=+$,\w]+@)[A-Za-z0-9.\-]+)((?:\/[+~%\/.\w\-_]*)?\??(?:[\-+=&;%@.\w_]*)#?(?:[.!\/\\\w]*))?)$/i

utils.getLinksFromText = function ( text ) {

	if ( !text ) return null
	return text.match( urlRegex )
}

utils.isUrl = function ( url ) {

	return url.match( urlOnlyRegex )
}

utils.parseLink = function( link ) {

	// test
	// link='https://www.facebook.com/vjednotejesila.sk/photos/a.1666881853639381.1073741828.1661484914179075/1798035663857332/?type=3&comment_id=1800640410263524&comment_tracking=%7B%22tn%22%3A%22R%22%7D'
	// link='https://www.facebook.com/oskar.dobrovodsky/posts/1576314412427652?comment_id=1576870255705401&comment_tracking=%7B%22tn%22%3A%22R2%22%7D'

	let parsedLink = link.match( /facebook\.com\/([^?]*)\?([^#]*)?/ )
	let path = parsedLink[ 1 ].split( '/' )
	let query = parsedLink[ 2 ].split( '&' )
	let queryObj = {}
	let len = query.length
	let postId

	for ( let i = 0; i < len; i++ ) {
		let splited = query[ i ].split( '=' )
		queryObj[ splited[ 0 ] ] = splited[ 1 ]
	}

	len = path.length

	if ( path[ len - 1 ] )
		postId = path[ len - 1 ]
	else
		postId = path[ len - 2 ]


	// console.log( 'dingdong', {
	// 	profileName: path[ 0 ],
	// 	postId: postId,
	// 	commentId: queryObj.comment_id,
	// } );
	// process.exit()

	return {
		profileName: path[ 0 ],
		postId: postId,
		commentId: queryObj.comment_id,
	}
}

module.exports = utils