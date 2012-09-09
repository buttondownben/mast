// Extend Backbone structures
Mast.Pattern = Mast.View.extend(Mast.Pattern);
Mast.Component = Mast.Pattern.extend(Mast.Component);
Mast.Table = Mast.Component.extend(Mast.Table);
Mast.Tree = Mast.Component.extend(Mast.Tree);


// Define registration methods (required to extend other components/models in the app)
Mast._registerQueue = [];
var registerFn = function(entityType) {
	return function (entityName,definition) {
		Mast._registerQueue.push({
			name:		entityName,
			type:		entityType,
			definition:	_.extend({_class:entityName},definition)
		});
	}
}
Mast.registerComponent	= registerFn('component');
Mast.registerTable		= registerFn('table');
Mast.registerTree		= registerFn('tree');

Mast.registerModel		= registerFn('model');
Mast.registerCollection = registerFn('collection');