var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Model
 * ==========
 */

var Product = new keystone.List('Product', {
	autokey: { path: 'slug', from: 'name', unique: true },
	track: true,
});

Product.add({
	name: { type: String, required: true, initial: true },
	state: { type: Types.Select, options: 'draft, published, sold', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' }, default: Date.now },
	categories: { type: Types.Relationship, ref: 'ProductCategory', many: true },
	purchasePrice: { type: Types.Money, required: true, initial: true },
	salePrice: { type: Types.Money, required: true, initial: true },
	shippingCharged: { type: Types.Money, required: true, initial: true },
	shippingPaid: { type: Types.Money },
	image: { type: Types.CloudinaryImage },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	
});

Product.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Product.defaultSort = '-createdAt';
Product.defaultColumns = 'title, purchasePrice, salePrice, shippingCharged, shippingPaid, state, publishedDate';
Product.register();
