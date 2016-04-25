var express = require('express');

var app = express();
app.set('view engine', 'jade');

app.use('/:str', function(req, res){

	var months = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var ans = {};
	var time = req.params.str;

	if (/^[0-9]/.test(time))
		time = parseInt(time);

	var x = new Date(time);
	var unix;
	var natural;

	if(!isNaN(x.getTime())) {
		unix = x.getTime();
		natural = months[x.getMonth()] + ' ' + x.getDate() + ', ' + x.getFullYear();
	} else {
		unix = null;
		natural = null;
	}

	ans.unix = unix;
	ans.natural = natural;

	res.set({
  		'Content-Type': 'application/json'
	})
	res.statusCode = 200;
	res.end(JSON.stringify(ans));

});


app.use('/', function (req, res) {
	res.render('index', { 
		title: 'Timestamp microservice',
		message: 'API: Timestamp microservice',
		usage: 'Example usage',
		code: 'https://timemicroservice.herokuapp.com/December%2015,%202015' + 
		'<br />' + 'https://timemicroservice.herokuapp.com/1450137600000',
		output: 'Example output',
		exampleoutput: '{ "unix": 1450137600, "natural": "December 15, 2015" }'
	});
});



var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});