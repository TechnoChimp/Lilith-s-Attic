var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	auth: importRoutes('./auth'),
	payment: importRoutes('./payment'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	
	// Website
	app.get('/', routes.views.index);
	app.get('/about', routes.views.about);
	app.all('/contact', routes.views.contact);
	app.get('/cartadd', routes.views.cartadd);
	app.get('/cartdel', routes.views.cartdel);
	app.get('/mycart', routes.views.mycart);
	app.get('/order/:order_id?', routes.views.order);
	app.get('/product/:product', routes.views.product);
	app.get('/purchase', routes.views.purchase);
	app.get('/shop', routes.views.shop);
	
	// Session
	app.all('/join', routes.views.session.join);
	app.all('/signin', routes.views.session.signin);
	app.get('/signout', routes.views.session.signout);
	//app.all('/forgot-password', routes.views.session['forgot-password']);
	//app.all('/reset-password/:key', routes.views.session['reset-password']);
	
	// Authentication
	app.all('/auth/confirm', routes.auth.confirm);
	app.all('/auth/app', routes.auth.app);
	app.all('/auth/:service', routes.auth.service);
	
	// Payment
	app.post('/payment/notify', routes.payment.notify);
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
