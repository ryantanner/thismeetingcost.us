/*global TodoMVC */
'use strict';

Meeting.module('Layout', function (Layout, App, Backbone) {
	// Layout Header View
	// ------------------
	Layout.Header = Backbone.Marionette.ItemView.extend({
		template: '#template-header',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
			input: '#new-person'
		},

		events: {
			'keypress #new-person': 'onInputKeypress'
		},

		onInputKeypress: function (e) {
			var ENTER_KEY = 13,
			nameText = this.ui.input.val().trim();

			if (e.which === ENTER_KEY && nameText) {
				this.collection.create({
					name: nameText,
          wage: 54000
				});
				this.ui.input.val('');
			}
		}
	});

	// Layout Footer View
	// ------------------
	Layout.Footer = Backbone.Marionette.ItemView.extend({
		template: '#template-footer',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
		},

		events: {
			'click #clear': 'onClearClick'
		},

		collectionEvents: {
			'all': 'render'
		},

		templateHelpers: {
		},

		initialize: function () {
		},

		serializeData: function () {
			var total = this.collection.length;

			return {
				personCount: total
			};
		},

		onRender: function () {
			this.$el.parent().toggle(this.collection.length > 0);
		},

		onClearClick: function () {
			this.collection.each(function (person) {
				person.destroy();
			});
		}
	});
});

