/**
 * Component is an extended `Backbone.View`. It add features suck as automatic event binding,
 * rendering, lifecycle hooks and events, and more.
 */

var lifecycleHooks     = require('./lifecycleHooks'),
		lifecycleEvents    = require('./lifecycleEvents'),
		bindEvents         = require('./bindEvents'),
		close              = require('./close'),
		render             = require('./render'),
		validateDefinition = require('./validateDefinition'),
		bindEvents         = require ('./bindEvents');

Component = module.exports = Backbone.View.extend();


_.extend(Component.prototype, {

	// Lifecycle Hooks
	beforeRender: function(cb) {
		lifecycleHooks.beforeRender.call(this, cb);
	},
	beforeClose: function(cb) {
		lifecycleHooks.beforeClose.call(this, cb);
	},
	afterRender: function() {
		lifecycleHooks.afterRender.call(this);
	},
	cancelRender: function() {
		lifecycleHooks.cancelRender.call(this);
	},
	cancelClose: function() {
		lifecycleHooks.cancelClose.call(this);
	},

	// Lifecycle Events
	afterChange: function(model, options) {
		lifecycleEvents.afterChange.call(this, model, options);
	},
	afterAdd: function(model, collection, options) {
		lifecycleEvents.afterAdd.call(this, model, collection, options);
	},
	afterRemove: function(model, collection, options) {
		lifecycleEvents.afterRemove.call(this, model, collection, options);
	},
	afterReset: function(collection, options) {
		lifecycleEvents.afterReset.call(this, collection, options);
	},

	// Prototype methods.
	close: function() {
		close.call(this);
	},
	render: function(atIndex) {
		render.call(this, atIndex);
	}
});




Component.prototype.initialize = function(properties) {

	var self = this;

	// Disable or issue warnings about certain properties
	// and methods to avoid confusion
	properties = validateDefinition(properties);

	// Extend instance w/ specified properties and methods
	_.extend(this, properties);

	// Start with empty regions object
	this.regions = {};

	// Bind the events on model/collections and global triggered events.
	bindEvents.collectionEvents.call(this);
	bindEvents.modelEvents.call(this);
	bindEvents.globalTriggers.call(this);

	// Encourage child methods to use the component context
	_.bindAll(this);
};
