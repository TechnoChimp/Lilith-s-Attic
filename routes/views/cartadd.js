var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var q = keystone.list('Product').model.findById(req.query.product_id);	
	q.exec(function(err, result) {
		var product = result;
		if (!req.session.cart) {
			req.session.cart = [];
		};
		var cart = req.session.cart;
		var productInCart = function(cart, product) {
			for (var i = 0; i < cart.length; i++) {
				if (cart[i]._id == product._id) {
					return true;
				}
			}
			return false;
		};
		
		if (!productInCart(cart, product)) {
			cart.push(result);
			res.redirect(req.get('referer'));
		}
		res.status(204).end();
	});
	
};