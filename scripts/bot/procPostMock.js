let processPost = require( __dirname + '/procPost' )

processPost( MOCK_RESPONSE() )
	.then( function () {
		console.log( 'MOCK_RESPONSE TEST DONE!!' );
		process.exit()
	} )
	.catch( function ( err ) {
		console.error( 'error', err )
		process.exit( 1 )
	} )


function MOCK_RESPONSE() {
	return {
		"id": "1661484914179075_1798035663857332",
		"type": "photo",
		"created_time": "2017-04-23T18:01:03+0000",
		"from": {
			"name": "VJEDNOTEJESILA",
			"id": "1661484914179075"
		},
		"message": "Ak by vláda ignorovala požiadavky občanov a boli by nutné opakované protesty, ktorý deň v týždni by najviac vyhovoval tebe? Pretože my to nevzdáme! Lajkujte prosím na originálnej stránke VJEDNOTEJESILA, aby sa to napočítalo na jednom mieste. Ďakujeme.",
		"link": "https://www.facebook.com/vjednotejesila.sk/photos/a.1666881853639381.1073741828.1661484914179075/1798035663857332/?type=3",
		"message_tags": [
			{
				"id": "1661484914179075",
				"name": "VJEDNOTEJESILA",
				"type": "page",
				"offset": 188,
				"length": 14
			}
		],
		"to": {
			"data": [
				{
					"id": "1661484914179075",
					"name": "VJEDNOTEJESILA"
				}
			]
		},
		"shares": {
			"count": 10
		}
	}
}