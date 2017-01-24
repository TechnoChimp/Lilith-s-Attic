var _ = require('lodash');
var keystone = require('keystone');


/**
	Initialises the standard view locals

*/

exports.initLocals = function (req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: 'Shop', key: 'shop', href: '/shop' },
		{ label: 'About', key: 'about', href: '/about' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	
	locals.user = req.user;
	locals.session = req.session;
	
	locals.page = {
		title: "Lilith's Attic",
		path: req.url.split("?")[0]
	};
	
	if (req.cookies.target && req.cookies.target == locals.page.path) res.clearCookie('target');
	
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/signin');
	} else {
		next();
	}
};
