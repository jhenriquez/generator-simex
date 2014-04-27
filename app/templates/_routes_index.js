
// initialize with the express application framework
module.exports = function (app) {
	// Define your application controller routes.
	app.get('/', function(rq, rs) {
		rs.render('index');
	})
}