require('total.js');

RESTBuilder.make(function(builder) {
	builder.url('http://localhost:3000/verify');
	builder.json({
		url: 'https://www.facebook.com/vjednotejesila.sk/photos/a.1666881853639381.1073741828.1661484914179075/1798035663857332/?type=3&comment_id=1800640410263524&comment_tracking=%7B%22tn%22%3A%22R%22%7D'
	});
	builder.exec(function(err, response) {
		console.log(err, response);
	});
});