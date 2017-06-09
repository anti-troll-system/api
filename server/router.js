let express = require( 'express' )
let router = express.Router()              // get an instance of the express Router

let utils = require( __dirname + '/../utils' )

router.use( function ( req, res, next ) {
	// do logging
	console.log( 'Something is happening.' )
	next() // make sure we go to the next routes and don't stop here
} )


router.get('/', function(req, res){
	res.send('running');
});

router.post( '/verify', function ( req, res ) {

	if ( !req.body.url || utils.isUrl( req.body.url ) )
		return res.status( 400 )
			.json( { "error": { "code": 2, "message": "Missing parameter `url` or has not valid URL format." } } )

	let parsed = req.body.url ? utils.parseLink( req.body.url ) : null;


	if ( !parsed || !parsed.postId || !parsed.profileName )
		return res.status( 400 )
			.json( { "error": { "code": 4, "message": "Given URL has not valid form." } } )

	res.status( 200 )
		.json( {
				"reporter": {
					"publicUserId": "facebook/jozko.mrkvicka",
					"name": "Jožko Mrkvička",
					"picture": "https://patroll.org/123456.png",
					"profileLink": "https://patroll.org/facebook/jozko.mrkvicka"
				},
				"reported": {
					"url": "https://facebook.com/posts/18197?comment_id=181784...",
					"author": {
						"publicUserId": "facebook/arian18",
						"name": "White Pride",
						"picture": "https://patroll.org/654321.png",
						"profileLink": "https://patroll.org/whiteľľľ",
						"location": "Sillicon Valley",
						"reportedCount": 19,
						"reportedByCount": 4,
						"contributionCount": 40
					},
					"inappropriateContent": {
						"contributionType": "comment",
						"message": "Lorem ipsum HATE HATE HATE"
					}
				}
			}
		)
} )

router.post( '/report', function ( req, res ) {

	res.status( 201 )
} )

router.get( '/search', function ( req, res ) {

	// let searchString = req.query.string

	res.status( 200 )
		.json( [
				{
					"publicUserId": "facebook/jozko.mrkvicka",
					"username": "jozko.mrkvicka",
					"name": "Jožko Mrkvička",
					"usernamesHistory": [],
					"namesHistory": [ "Joseph The Carrot", "J.T.C." ],
					"picture": "https://patroll.org/123456.png",
					"source": "facebook.com",
					"sourceProfileLink": "https://www.facebook.com/jozko.mrkvicka",
					"profileLink": "https://patroll.org/facebook/jozko.mrkvicka",
					"description": "CEO at Milky Way",
					"location": "Sillicon Valley",
					"profileType": "user",
					"deletedFlag": 0
				},
				{
					"publicUserId": "facebook/jozko.kalerab",
					"username": "jozko.kalerab",
					"name": "Jožko Kalerab",
					"usernamesHistory": [],
					"namesHistory": [ "Joseph The Carrot", "J.T.C." ],
					"picture": "https://patroll.org/123456.png",
					"source": "facebook.com",
					"sourceProfileLink": "https://www.facebook.com/jozko.kalerab",
					"profileLink": "https://patroll.org/facebook/jozko.kalerab",
					"description": "CEO at Milky Way",
					"location": "Sillicon Valley",
					"profileType": "user",
					"deletedFlag": 0
				}
			]
		)
} )

router.get( '/username/:id', function ( req, res ) {

	// let userId = req.params.id

	res.status( 200 )
		.json( {
				"profileData": {
					"publicUserId": "facebook/jozko.mrkvicka",
					"username": "jozko.mrkvicka",
					"name": "Jožko Mrkvička",
					"picture": "https://patroll.org/123456.png",
					"source": "facebook.com",
					"sourceProfileLink": "https://www.facebook.com/jozko.mrkvicka",
					"profileLink": "https://patroll.org/facebook/jozko.mrkvicka",
					"usernamesHistory": [],
					"namesHistory": [ "Joseph The Carrot", "J.T.C." ],
					"description": "CEO at Milky Way",
					"location": "Sillicon Valley",
					"profileType": "user",
					"deletedFlag": 0
				},
				"contributionStats": {
					"firstContribution": "2015-02-20T15:20:12.422Z",
					"latestContribution": "2017-05-31T15:20:12.422Z",
					"activeDaysCount": 11,
					"averageDailyActivity": 0.54,
					"reportedCount": 19,
					"reportedByCount": 5,
					"reportedCountPerCategory": [ {
						"category": "racism",
						"count": 4
					},
						{
							"category": "sarcasm",
							"count": 13
						}
					],
					"contributionCount": 19,
					"postsCount": 2,
					"commentedPostsCount": 15,
					"commentedSourcesCount": 7,
					"conspirationContributionCount": 2
				},
				"reportingStats": {
					"reportCount": 0,
					"reportCountPerCategory": [ {
						"category": "racism",
						"count": 4
					},
						{
							"category": "sarcasm",
							"count": 13
						}
					],
					"reportContributionCount": 0,
					"reportSourcesCount": 0,
					"voteCount": 0,
					"voteCountPerCategory": [ {
						"category": "racism",
						"count": 4
					},
						{
							"category": "sarcasm",
							"count": 13
						}
					]
				}
			}
		)
} )

module.exports = router