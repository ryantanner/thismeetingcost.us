/*global TodoMVC */
'use strict';

Meeting.module('PersonList', function (PersonList, App, Backbone, Marionette, $, _) {
	// Meeting Router
	// ---------------
	//

	// Meeting Controller (Mediator)
	// ------------------------------
	//
	// Control the workflow and logic that exists at the application
	// level, above the implementation detail of views and models
	PersonList.Controller = function () {
		this.personList = new App.Persons.PersonList();
	};

	_.extend(PersonList.Controller.prototype, {
		// Start the app by showing the appropriate views
		// and fetching the list of person items, if there are any
		start: function () {
			this.showHeader(this.personList);
			this.showFooter(this.personList);
			this.showPersonList(this.personList);
			this.personList.fetch();
		},

		showHeader: function (personList) {
			var header = new App.Layout.Header({
				collection: personList 
			});
			App.header.show(header);
		},

		showFooter: function (personList) {
			var footer = new App.Layout.Footer({
				collection: personList 
			});
			App.footer.show(footer);
		},

		showPersonList: function (personList) {
			App.main.show(new PersonList.Views.ListView({
				collection: personList 
			}));
		},

	});

	// PersonList Initializer
	// --------------------
	//
	// Get the PersonList up and running by initializing the mediator
	// when the the application is started, pulling in all of the
	// existing person items and displaying them.
	PersonList.addInitializer(function () {
		var controller = new PersonList.Controller();

		controller.start();
	});
});

