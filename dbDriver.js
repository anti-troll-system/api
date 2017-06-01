var mongoose = require('mongoose')
	, env = require( __dirname + '/env' );


mongoose.connect(env.mongoUrl);

// Connection URL 
var db = mongoose.connection;
var layer = {
	save: function ( collection, data ) {
		db.collection(collection).insertOne(data, function(err, res) {
			if (err) throw err;
			console.log("1 record inserted");
		});
	},
	close: function () {
		db.close();
	}
};

db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
// 	// we're connected!
// });

module.exports = layer;