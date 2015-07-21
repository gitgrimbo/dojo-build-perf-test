define([
	"dojox/charting/Chart",
	"dojox/charting/axis2d/Default",
	"dojox/charting/plot2d/StackedAreas",
	"dojox/charting/themes/Wetland"
], function(Chart, Default, StackedAreas, Wetland) {
	function createChart() {
		var c = new Chart("chartOne");
		c.addPlot("default", {
				type: StackedAreas,
				tension: 3
			})
			.addAxis("x", {
				fixLower: "major",
				fixUpper: "major"
			})
			.addAxis("y", {
				vertical: true,
				fixLower: "major",
				fixUpper: "major",
				min: 0
			})
			.setTheme(Wetland)
			.addSeries("Series A", [1, 2, 0.5, 1.5, 1, 2.8, 0.4])
			.addSeries("Series B", [2.6, 1.8, 2, 1, 1.4, 0.7, 2])
			.addSeries("Series C", [6.3, 1.8, 3, 0.5, 4.4, 2.7, 2]);
		return c;
	}
	return createChart;
});
