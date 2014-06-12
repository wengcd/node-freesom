// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade'); 
app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(bodyParser()); 						// pull information from html in POST

var port = process.env.PORT || 8080; 		// set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/freesom');
var Project     = require('./app/models/project');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', function(req, res) {
		Project.find(function(err, projects) {
			if (err)
				res.send(err);
			res.render('index', {
				title: '鄞州自由神工作室',
				projects: projects
			});
		});
});

// more routes for our API will happen here

router.route('/projects')
	// create a project (accessed at POST http://localhost:8080/api/projects)
	.post(function(req, res) {
		
		var project = new Project(); 		// create a new instance of the Project model
		project.title = req.body.title;  // set the projects name (comes from the request)
		project.intro = req.body.intro;
		project.poster = req.body.poster;

		// save the project and check for errors
		project.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Project created!' });
		});
		
	})
	// get all the projects (accessed at GET http://localhost:8080/api/projects)
	.get(function(req, res) {
		Project.find(function(err, projects) {
			if (err)
				res.send(err);

			res.json(projects);
		});
	});
	
// on routes that end in /projects/:project_id
// ----------------------------------------------------
router.route('/projects/:project_id')

	// get the project with that id
	.get(function(req, res) {
		Project.findById(req.params.project_id, function(err, project) {
			if (err)
				res.send(err);
			res.json(project);
		});
	})

	// update the project with this id
	.put(function(req, res) {
		Project.findById(req.params.project_id, function(err, project) {

			if (err)
				res.send(err);

			project.title = req.body.title;
			project.intro = req.body.intro;
			project.poster = req.body.poster;
			project.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Project updated!' });
			});

		});
	})

	// delete the project with this id
	.delete(function(req, res) {
		Project.remove({
			_id: req.params.project_id
		}, function(err, project) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);