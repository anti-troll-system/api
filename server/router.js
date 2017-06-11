let express = require( 'express' )
let router = express.Router()              // get an instance of the express Router

let utils = require( __dirname + '/../utils/utils' )
let db = require( __dirname + '/../mongoose/mngDriver.js' )
let fbk = require( __dirname + '/../nets/fbkDriver.js' )

// router.use( function ( req, res, next ) {
// 	// do logging
// 	console.log( 'Something is happening.' )
// 	next() // make sure we go to the next routes and don't stop here
// } )

router.get( '/', function ( req, res ) {
	res.send( 'Express is running' );
} );

router.post( '/verify', function ( req, res ) {

	let url = req.body.url

	if ( !url || !utils.isUrl( url ) )
		return res.status( 400 )
			.json( { "error": { "code": 2, "message": "Missing parameter `url` or has not valid URL format." } } )

	let parsedLink = url ? utils.parseLink( url ) : null;


	if ( !parsedLink || !parsedLink.postId || !parsedLink.profileName )
		return res.status( 400 )
			.json( { "error": { "code": 4, "message": "Given URL has not valid form." } } )

	let responseData = {
		"reporter": utils.randomValueFromArray( MOCK_USER_PROFILES ),
		"reported": {
			"url": url,
			"author": {},
			"content": {},
			"inappropriateContent": {}
		}
	};

	( function () {

		if ( parsedLink.commentId )

			return fbk.getCommentData( parsedLink.postId, parsedLink.commentId )

		else

			return fbk.getIdFromName( parsedLink.profileName )
				.then( function ( res ) {
					return fbk.getPostData( res.id, parsedLink.postId )
				} )
	}() )
		.then( function ( postOrCommentData ) {

			let inapContent = responseData.reported.inappropriateContent

			inapContent.id = postOrCommentData.id
			inapContent.message = postOrCommentData.message
			inapContent.date = postOrCommentData.created_time
			inapContent.contributionType = parsedLink.commentId ? 'comment' : 'post'

			return fbk.getProfileData( postOrCommentData.from )
		} )
		.then( function ( profileData ) {

			let author = responseData.reported.author

			author.publicUserId = profileData.id
			author.name = profileData.name
			author.picture = profileData.picture.url
			author.profileLink = profileData.link

			console.log( 'dingdong', responseData );

			res.status( 200 )
				.json( responseData )
		} )
		.catch( function ( err ) {
			console.error( 'error: ', err );
			res.status( 500 )
				.send( err )
		} )

} )

router.post( '/report', function ( req, res ) {

	let url = req.body.url

	if ( !url || !utils.isUrl( url ) )
		return res.status( 400 )
			.json( { "error": { "code": 2, "message": "Missing parameter `url` or has not valid URL format." } } )

	let parsedLink = url ? utils.parseLink( url ) : null;


	if ( !parsedLink || !parsedLink.postId || !parsedLink.profileName )
		return res.status( 400 )
			.json( { "error": { "code": 4, "message": "Given URL has not valid form." } } )

	db.create( 'report', {
		link: url
	} )
		.then( function () {

			res.status( 201 )
				.send()
		} )
		.catch( function ( err ) {
			console.error( 'error: ', err );
			res.status( 500 )
				.send( err )
		} )

} )

router.get( '/search', function ( req, res ) {

	// let searchString = req.query.string

	res.status( 200 )
		.json( [
				utils.randomValueFromArray( MOCK_USER_PROFILES ),
				utils.randomValueFromArray( MOCK_USER_PROFILES ),
				utils.randomValueFromArray( MOCK_USER_PROFILES ),
			]
		)
} )

router.get( '/username/:id', function ( req, res ) {

	// let userId = req.params.id

	res.status( 200 )
		.json( {
				"profileData": utils.randomValueFromArray( MOCK_USER_PROFILES ),
				"contributionStats": {
					"firstContribution": "2015-02-20T15:20:12.422Z",
					"latestContribution": "2017-05-31T15:20:12.422Z",
					"activeDaysCount": utils.getRandomInt( 13, 50 ),
					"averageDailyActivity": Math.random(),
					"reportedCount": utils.getRandomInt( 5, 150 ),
					"reportedByCount": utils.getRandomInt( 0, 10 ),
					"reportedCountPerCategory": [
						{
							"category": "racism",
							"count": utils.getRandomInt( 1, 10 )
						},
						{
							"category": "sarcasm",
							"count": utils.getRandomInt( 1, 50 )
						}
					],
					"contributionCount": utils.getRandomInt( 13, 50 ),
					"postsCount": utils.getRandomInt( 0, 2 ),
					"commentedPostsCount": utils.getRandomInt( 13, 20 ),
					"commentedSourcesCount": utils.getRandomInt( 2, 16 ),
					"conspirationContributionCount": utils.getRandomInt( 0, 5 )
				},
				"reportingStats": {
					"reportCount": utils.getRandomInt( 0, 10 ),
					"reportCountPerCategory": [
						{
							"category": "racism",
							"count": utils.getRandomInt( 1, 50 )
						},
						{
							"category": "sarcasm",
							"count": utils.getRandomInt( 1, 50 )
						}
					],
					"reportContributionCount": utils.getRandomInt( 0, 30 ),
					"reportSourcesCount": utils.getRandomInt( 0, 30 ),
					"voteCount": utils.getRandomInt( 0, 30 ),
					"voteCountPerCategory": [
						{
							"category": "racism",
							"count": utils.getRandomInt( 1, 50 )
						},
						{
							"category": "sarcasm",
							"count": utils.getRandomInt( 1, 50 )
						}
					]
				}
			}
		)
} )

let MOCK_USER_PROFILES = [
	{
		"publicUserId": "facebook/ferko.kalerab",
		"username": "ferko.kalerab",
		"name": "Ferko Kalerab",
		"usernamesHistory": [],
		"namesHistory": [],
		"picture": "https://patroll.org/123456.png",
		"source": "facebook.com",
		"sourceProfileLink": "https://www.facebook.com/ferko.kalerab",
		"profileLink": "https://patroll.org/facebook/ferko.kalerab",
		"description": "Ive got you, you got me, we got all together",
		"profileType": "user",
		"deletedFlag": 0
	},
	{
		"publicUserId": "facebook/jozko.mrkvicka",
		"username": "jozko.mrkvicka",
		"name": "Jožko Mrkvička",
		"picture": "https://patroll.org/123456.png",
		"source": "facebook.com",
		"sourceProfileLink": "https://www.facebook.com/jozko.mrkvicka",
		"profileLink": "https://patroll.org/facebook/jozko.mrkvicka",
		"usernamesHistory": [ "joseph.carrot", "josh_carrot" ],
		"namesHistory": [ "Joseph The Carrot", "J.T.C." ],
		"description": "CEO at Milky Way",
		"profileType": "user",
		"deletedFlag": 0
	},
	{
		"publicUserId": "facebook/petko.smolko",
		"username": "petko.smolko",
		"name": "Petko Smolko",
		"usernamesHistory": [],
		"namesHistory": [],
		"picture": "https://patroll.org/123456.png",
		"source": "facebook.com",
		"sourceProfileLink": "https://www.facebook.com/petko.smolko",
		"profileLink": "https://patroll.org/facebook/petko.smolko",
		"description": "There is always a better way",
		"profileType": "user",
		"deletedFlag": 0
	},
	{
		"publicUserId": "facebook/filipko.krtek",
		"username": "filipko.krtek",
		"name": "Filipko Krtek",
		"usernamesHistory": [],
		"namesHistory": [],
		"picture": "https://patroll.org/123456.png",
		"source": "facebook.com",
		"sourceProfileLink": "https://www.facebook.com/filipko.krtek",
		"profileLink": "https://patroll.org/facebook/filipko.krtek",
		"description": "Master of disaster",
		"profileType": "user",
		"deletedFlag": 0
	},
	{
		"publicUserId": "facebook/andrejko.knoflik",
		"username": "andrejko.knoflik",
		"name": "Andrejko Knoflik",
		"usernamesHistory": [ "andy.knopfel" ],
		"namesHistory": [],
		"picture": "https://patroll.org/123456.png",
		"source": "facebook.com",
		"sourceProfileLink": "https://www.facebook.com/andrejko.knoflik",
		"profileLink": "https://patroll.org/facebook/andrejko.knoflik",
		"description": "Shop assistent at Tesco",
		"profileType": "user",
		"deletedFlag": 0
	},
]

module.exports = router