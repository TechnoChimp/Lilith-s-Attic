var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'about';
	locals.title = "";
	locals.content = "";
	locals.image = {};
	
	view.on('init', function (next) {
		
		var q = keystone.list('Page').model.findOne().where('name', 'about');
		
		q.exec(function (err, results) {
			
			locals.title = results.title;
			locals.content = results.content;
			locals.image = results.image;
			console.log(locals.image);
			next(err);

		});
	});
	
	// Render the view
	view.render('about');
};
