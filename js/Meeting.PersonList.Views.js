/*global Meetng */
'use strict';

Meeting.module('PersonList.Views', function (Views, App, Backbone, Marionette, $) {
	// Person Item View
	// -------------------
	//
	// Display an individual person item, and respond to changes
	// that are made to the item, including marking completed.
	Views.ItemView = Marionette.ItemView.extend({
		tagName: 'tr',
		template: '#template-person',

		ui: {
			editName: '.edit #name',
			editWage: '.edit #wage',
      viewName: '.view.name',
      viewWage: '.view.wage'
		},

		events: {
			'click .destroy': 'destroy',
			'dblclick .editable': 'onEditClick',
			'keydown .edit': 'onEditKeypress',
			'focusout .edit': 'onEditFocusout',
			'click .toggle': 'toggle'
		},

		modelEvents: {
			'change': 'render'
		},

		onRender: function () {
		},

		destroy: function () {
			this.model.destroy();
		},

		toggle: function () {
			this.model.toggle().save();
		},

		onEditClick: function (e) {
			this.$el.addClass('editing');

      if ( e.currentTarget === this.ui.viewName[0] )
        this.ui.editName.focus();
      else if ( e.currentTarget == this.ui.viewWage[0] )
        this.ui.editWage.focus();

			this.ui.editName.val(this.ui.editName.val());
			this.ui.editWage.val(this.ui.editWage.val());
		},

		onEditFocusout: function (e) {
      if ( e.relatedTarget === this.ui.editName[0] ||
           e.relatedTarget === this.ui.editWage[0] ) {
        // do nothing
      } else {
        var nameText = this.ui.editName.val().trim();
        var wageText = this.ui.editWage.val().trim();
        if (nameText) {
          this.model.set('name', nameText).save();
          this.model.set('wage', wageText).save();
          this.$el.removeClass('editing');
        } else {
          this.destroy();
        }
      }
		},

		onEditKeypress: function (e) {
			var ENTER_KEY = 13, ESC_KEY = 27;

			if (e.which === ENTER_KEY) {
				this.onEditFocusout();
				return;
			}

			if (e.which === ESC_KEY) {
				this.ui.editName.val(this.model.get('name'));
				this.ui.editWage.val(this.model.get('wage'));
				this.$el.removeClass('editing');
			}
		}
	});

	// Person List View
	// --------------
	//
	// Controls the rendering of the list of items, including the
	// filtering of activs vs completed items for display.
	Views.ListView = Backbone.Marionette.CompositeView.extend({
		template: '#template-meetingCompositeView',
		itemView: Views.ItemView,
		itemViewContainer: '#person-list',

		ui: {
			toggle: '#toggle-all'
		},

		events: {
			'click #toggle-all': 'onToggleAllClick'
		},

		collectionEvents: {
			'all': 'update'
		},

		onRender: function () {
			this.update();
		},

		update: function () {
			function reduceCompleted(left, right) {
				return left && right.get('completed');
			}

			var allCompleted = this.collection.reduce(reduceCompleted, true);

			this.ui.toggle.prop('checked', allCompleted);
			this.$el.parent().toggle(!!this.collection.length);
		}

	});

});

