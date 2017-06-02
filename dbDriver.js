var mongoose = require( 'mongoose' );
var env = require( __dirname + '/env' );
var models = {
	post: mongoose.model( 'post', require( __dirname + '/schemas/post.schema' ) ),
	comment: mongoose.model( 'comment', require( __dirname + '/schemas/comment.schema' ) ),
	profile: mongoose.model( 'profile', require( __dirname + '/schemas/profile.schema' ) ),
	report: mongoose.model( 'report', require( __dirname + '/schemas/report.schema' ) ),
};

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
		return models[ model ].insert( data, cb );
	},
	close: function () {
		db.close();
	},
	open: function () {
	},
};

db.on( 'error', console.error.bind( console, 'connection error:' ) );
db.once( 'open', function () {
	layer.open();
} );

module.exports = layer;