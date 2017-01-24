var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'shop';
	locals.page.subtitle = 'Shop';
	product = req.params.product;
	locals.data = {
		product: '',
	};

	view.on('init', function (next) {
		
		var q = keystone.list('Product').model.findOne().where('slug', [product]);
		
		q.exec(function (err, results) {
			locals.data.product = results;
			next(err);
		});
	});
		
	// Render the view
	view.render('product');

};
