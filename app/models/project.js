// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProjectSchema   = new Schema({
	title: 		String,
	intro: 		String,
	poster: 	String
});

module.exports = mongoose.model('Project', ProjectSchema);