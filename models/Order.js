var keystone = require('keystone');
var Types = keystone.Field.Types;

var Order = new keystone.List('Order', {
	nocreate: true,
	noedit: true
});

Order.add({
	customer: { type: Types.Relationship, ref: 'User', many: false, index: true, required: true, initial:true },
	createdAt: { type: Types.Datetime, default: Date.now, required: true, initial:true },
	products: { type: Types.Relationship, ref: 'Product', many: true, index: true , required: true, initial:true},
});

Order.defaultSort = '-createdAt';
Order.defaultColumns = 'customer, products';
Order.register();
