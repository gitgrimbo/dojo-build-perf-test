define([
	"./mychart",
	"dojo/date",
	"dijit/Calendar",
	"dojo/domReady!"
], function(mychart, date, Calendar) {
	var chart = mychart();
	chart.render();

	new Calendar({
		value: new Date(),
		isDisabledDate: function(d) {
			d = new Date(d);
			d.setHours(0, 0, 0, 0);
			var today = new Date();
			today.setHours(0, 0, 0, 0);
			return Math.abs(date.difference(d, today, "week")) > 0;
		}
	}, "calendar").startup();
});
