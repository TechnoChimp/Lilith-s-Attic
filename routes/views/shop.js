var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'shop';
	locals.page.subtitle = 'Shop';
	locals.data = {
		product: [],
	};

	view.on('init', function (next) {
		
		Product = keystone.list('Product');
 
		Product.paginate({
			page: req.query.page || 1,
			perPage: 9,
			maxPages: 10
		})
		.where('state').in(['published', 'sold'])
		.sort('-publishedDate')
		.exec(function(err, results) {
			locals.data.product = results;
			next(err);
		});
	});
	
	// Render the view
	view.render('shop');
};
