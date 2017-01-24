var keystone = require('keystone');

var Order = keystone.list('orders');
exports = module.exports = function(req, res) {
	
	if (!req.user) {
		return res.redirect('/signin');
	}
	
 	var view = new keystone.View(req, res);
	var locals = res.locals;

	if(req.session.cart){
        productIds = [];
        req.session.cart.forEach( function (product) {

             productIds.push(product._id);
        });

        var newOrder = Order.model({customer: req.user._id,products: productIds,});
        updater = newOrder.getUpdateHandler(req, res, {
            errorMessage: 'There was an error creating your order:'
        });
        console.log('New Order: ',newOrder._id);
        updater.process(req.body, {
            flashErrors: true,
            logErrors: true,
        }, function(err) {
            if (!err) {
                req.session.cart=[];
                res.redirect('/myorders');
            }                 
        });                       
    }else{
        res.redirect('/');
    }
};