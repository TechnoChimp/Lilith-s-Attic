var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var product = req.query.product_id;
	
	if (!req.session.cart) {
		res.status(400).end();
	};
	var cart = req.session.cart;
	
	for (var i = 0; i < cart.length; i++) {
		if (cart[i]._id == product) {
			cart.splice(i, 1);
		}
	}

	res.redirect(req.get('referer'));
	
};