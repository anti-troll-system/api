var mongoose = require( 'mongoose' );
var co = require( 'co' );
var env = require( __dirname + '/env' );
var models = {
	post: mongoose.model( 'post', require( __dirname + '/schemas/post.schema' ) ),
	comment: mongoose.model( 'comment', require( __dirname + '/schemas/comment.schema' ) ),
	profile: mongoose.model( 'profile', require( __dirname + '/schemas/profile.schema' ) ),
	report: mongoose.model( 'report', require( __dirname + '/schemas/report.schema' ) ),
};

mongoose.Promise = global.Promise;
mongoose.connect( env.mongoUrl );

// Connection URL 
var db = mongoose.connection;
var layer = {
	update: function ( model, id, data, cb ) {
		// https://stackoverflow.com/questions/25285232/bulk-upsert-in-mongodb-using-mongoose
		return models[ model ].update( { _id: id }, data, { upsert: true, setDefaultsOnInsert: true }, cb );
	},
	create: function ( model, data, cb ) {
		// return models[ model ].collection.insert( data, cb );
		var model = new models[ model ]( data );
		return model.save( cb );
	},
	read: function ( model, query, cb ) {

		// const cursor = models[ model ].find(query).cursor();
		// cursor.on('data', cb);

		// http://thecodebarbarian.com/cursors-in-mongoose-45
		co( function*() {
			const cursor = models[ model ].find( query ).cursor();
			for ( let doc = yield cursor.next(); doc != null; doc = yield cursor.next() ) {
				cb( doc );
			}
		} );
		return this;
	},
	close: function () {
		db.close();
	},
	onConnection: function ( fn ) {
		db.once( 'open', fn );
	}
};

db.on( 'error', console.error.bind( console, 'connection error:' ) );

module.exports = layer;