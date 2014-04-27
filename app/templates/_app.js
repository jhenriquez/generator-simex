var express = require('express'),
	template = require('consolidate'),
	routes = require('./routes'),
	app = express();

// Register and configure a template engine.
app.engine('<%= viewEngine %>', template.<%= viewEngine %>);
app.set('view engine', '<%= viewEngine %>');

// Set up  a folder to serve static files.
app.use(express.static(__dirname + '/public'));

// Configure routes for the application.
routes(app);

// Start Listening and notify the user through the console.
app.listen('3000');
console.log('Listening on port 3000');