let mongoose = require( 'mongoose' );
let ObjectId = mongoose.Schema.ObjectId;

module.exports = mongoose.Schema( {
	url: String,
} );