var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Notice Model
 * ==========
 */

var Notice = new keystone.List('Notice', {
	map: { name: 'title' },
	sortable: true,
});

Notice.add({
	title: { type: String, initial: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' }, default: Date.now },
	image: { type: Types.CloudinaryImage },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
});

Notice.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Notice.defaultColumns = 'title, order, state, author, publishedDate';
Notice.register();
