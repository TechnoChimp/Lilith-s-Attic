var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page', {
	autokey: { path: 'slug', from: 'name', unique: true },
	track: true,
});

Page.add({
	name: { type: String, initial: true, required: true },
	title: { type: String, initial: true, required: true },
	image: { type: Types.CloudinaryImage },
	content: {type: Types.Html, initial: true, required: true, wysiwyg: true, height: 1000 },
});

Page.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Page.defaultColumns = 'title, content';
Page.register();
