let express = require( 'express' )
let path = require( 'path' )
let favicon = require( 'serve-favicon' )
let logger = require( 'morgan' )
let cookieParser = require( 'cookie-parser' )
let bodyParser = require( 'body-parser' )

let router = require( __dirname + '/router' )

let app = express()


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use( logger( 'dev' ) )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( cookieParser() )


app.use('/', router);

app.listen(3000);

// // IMPORTANT 1:
// app.listen(+process.argv[2]);
//
// // IMPORTANT 2 (`total` word has to be in the process title):
// process.title = 'total: express';

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
	let err = new Error( 'Not Found' )
	err.status = 404
	next( err )
} )

// // error handler
// app.use( function ( err, req, res, next ) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message
// 	res.locals.error = req.app.get( 'env' ) === 'development' ? err : {}
//
// 	// render the error page
// 	res.status( err.status || 500 )
// 	res.render( 'error' )
// } )

module.exports = app
