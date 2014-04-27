/*global Backbone */
'use strict';

var Meeting = new Backbone.Marionette.Application();

Meeting.addRegions({
	header: '#header',
	main: '#main',
	footer: '#footer'
});

Meeting.on('initialize:after', function () {
	Backbone.history.start();
});

