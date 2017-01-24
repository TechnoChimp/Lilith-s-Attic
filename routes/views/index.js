var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'home';
	locals.page.subtitle = 'Antiques & Oddities';
	locals.data = {
		notices: [],
	};
	
	view.on('init', function (next) {
		
		var q = keystone.list('Notice').model.find().where('state', 'published').sort('sortOrder');
		
		q.exec(function (err, results) {
			locals.data.notices = results;
			next(err);
		});
	});
	
	// Render the view
	view.render('index');
};
