/*global Meeting */
'use strict';

Meeting.module('Persons', function (Persons, App, Backbone) {
	// Todo Model
	// ----------
	Persons.Person = Backbone.Model.extend({
		defaults: {
			name: '',
      wage: 54000,
			created: 0,
      index: 1
		},

		initialize: function () {
			if (this.isNew()) {
				this.set('created', Date.now());
			}
		}

	});

	// Todo Collection
	// ---------------
	Persons.PersonList = Backbone.Collection.extend({
		model: Persons.Person,

		localStorage: new Backbone.LocalStorage('this-meeting-cost-us'),

		comparator: function (person) {
			return person.get('created');
		}

	});
});

