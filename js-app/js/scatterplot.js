var margin = { top: 100, right: 115, bottom: 40, left: 25 },
	width = 800 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var parseYear = d3.timeParse("%Y"),
	parseDate = d3.timeParse("%Y%m"),
	parseMonth = d3.timeParse("%m-%Y"),
	numberFormat = d3.format(",.0f"),
	numberFormatDetailed = d3.format(",.1f");

var x = d3.scaleLinear()
	.range([0, width]);

var y = d3.scaleLinear()
	.range([height, 0]);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom")
//     .tickFormat(numberFormatDetailed);

var xAxis = d3.axisBottom(x)
	.tickFormat(numberFormatDetailed);

// var yAxis = d3.svg.axis()
// 	.scale(y)
// 	.orient("left")
// 	.tickFormat(numberFormatDetailed)
// 	.tickSize(-width);

var yAxis = d3.axisLeft(y)
	.tickFormat(numberFormatDetailed)
	.tickSize(-width);

var svg = d3.select("#chart").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

var group;
var selectedGDP;
var selectedCO2pc;
var selectedCO2;
var selectedGDP2;
var selectedCO2pc2;



var selectedClass;
var duration = 250;
var year = 1980;
var count = 0;
var timerWidth = 200;
var timerHeight = 5;
var timerMargin = 2;
var radius = 7;
var buffer = 12;
var increment = (timerWidth - 2 * timerMargin - 5) / 30;

var slidersvg = d3.select("#slider").append("svg")
	.attr("width", 250)
	.attr("height", 23);

var rect = slidersvg.append("rect")
	.attr("width", timerWidth)
	.attr("height", timerHeight)
	.attr("x", buffer - 5)
	.attr("y", buffer);

var timerCircle = slidersvg.append("circle")
	.attr("class", "timerCircle")
	.attr("cx", buffer + (count * increment) + timerMargin)
	.attr("cy", buffer + timerMargin)
	.attr("r", radius);


d3.select("#play").on("click", function () {
	setup();
});


function setup() {
	d3.select("#play")
		.html("Play<span class='fa fa-caret-right'></span>")
		.on('click', null);
	year = 1980;
	count = 0;
	updateScatter();
	startTimer();
};



function startTimer() {

	if (year == 2010) {
		d3.select("#play").on("click", function () {
			setup();
		});

		setTimeout(function () {
			d3.select("#play").html("Replay<span class='fa fa-repeat'></span>");
		}, 500);

	} else {

		setTimeout(updateKnob, duration);
		setTimeout(updateScatter, duration);
		setTimeout(startTimer, duration);

		year = year + 1;
		count = count + 1;

	}
}



function updateKnob() {
	timerCircle
		.transition()
		.duration(duration)
		.ease(d3.easeLinear)
		.attr("cx", buffer + (count * increment) + timerMargin - 5);
}


d3.csv("data/data_scatterplot.csv").then(function (data) {
	selectedCO2 = "co2" + year;
	selectedGDP = "loggdppc" + year;
	selectedCO2pc = "logco2pc" + year;
	selectedGDP2 = "gdppc" + year;
	selectedCO2pc2 = "co2pc" + year;

	data.forEach(function (d) {
		d.loggdppc1980 = +d.loggdppc1980;
		d.logco2pc1980 = +d.logco2pc1980;
	});

	x.domain([5.3, 11.5]);
	y.domain([-1.3, 4.3]);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.append("text")
		.attr("dy", "2.8em")
		.attr("dx", width / 1.6)
		.style("text-anchor", "end")
		.attr("class", "xlabel")
		.text("GDP per capita, log");

	svg.append("g")
		.attr("class", "left axis")
		.call(yAxis);

	svg.append("text")
		.attr("id", "year")
		.attr("dy", height - 20)
		.attr("dx", width / 2 - 20)
		.text("1980");

	svg.append("text")
		.attr("class", "left label")
		.text("Metric tons CO2 emissions per capita, log")
		.attr("x", -margin.left + 5)
		.attr("y", -12);

	group = svg.selectAll(".group")
		.data(data)
		.enter().append("g")
		.attr("class", "group");

	group.append("circle")
		.attr("class", function (d) { return d.region; })
		.classed("scatter", true)
		.attr("id", function (d) { return d.country; })
		.attr("r", function (d) { return 20 * (Math.pow((d.co21980 / 1000000 / 3.14), 0.5)); })
		.attr("cx", function (d) { return x(d.loggdppc1980); })
		.attr("cy", function (d) { return y(d.logco2pc1980); });

	var legend = svg.append("g")
		.attr("class", "legend")
		.attr("transform", "translate(" + (width - 50) + "," + (height - 20) + ")")
		.selectAll("g")
		.data([1e6, 5e6, 1e7])
		.enter().append("g");

	legend.append("circle")
		.attr("cy", function (d) { return -20 * (Math.pow(((d) / 1000000 / 3.14), 0.5)); })
		.attr("r", function (d) { return 20 * (Math.pow(((d) / 1000000 / 3.14), 0.5)); });

	legend.append("text")
		.attr("y", function (d) { return -40 * (Math.pow(((d) / 1000000 / 3.14), 0.5)); })
		.attr("dy", "1.3em")
		.text(d3.format(".1s"));

	legend.append("text")
		.attr("dy", "-80px")
		.text("Total emissions");

	d3.selectAll(".scatter")
		.on("mouseover", function (event, d) {
			d3.select(this)
				.style("fill", "#006E9B")
				.style("opacity", 1);

			tooltip
				.html(
					"<p><strong>" + d.country + ", " + year + "</strong></p>" +
					"<p>CO<sub>2</sub> emissions: <strong>" + numberFormatDetailed(d[selectedCO2] / 1000000) + " million kilotons</strong></p>" +
					"<p>GDP per capita: <strong>$" + numberFormat(d[selectedGDP2]) + "</strong></p>" +
					"<p>CO<sub>2</sub> per capita: <strong>" + numberFormatDetailed(d[selectedCO2pc2]) + " metric tons</strong></p>"
				)
				.style("left", (event.pageX - 15) + "px")
				.style("top", (event.pageY - 100) + "px")
				.transition()
				.duration(250)
				.style("opacity", 1);
		})
		.on("mouseout", function (d) {
			tooltip
				.transition()
				.duration(250)
				.style("opacity", 0);

			d3.selectAll(".scatter")
				.style("fill", "#00a1ce")
				.style("opacity", 0.6);

		});



	d3.selectAll("#countrybuttons .button").on("click", function () {

		selectedClass = d3.select(this).attr("id");

		if (d3.select(this).classed("selected")) {
			d3.select(this).classed("selected", false);

			d3.selectAll("." + selectedClass)
				.style("opacity", 0)
				.style("display", "none");
		} else {
			d3.select(this).classed("selected", true);
			d3.selectAll("." + selectedClass)
				.style("opacity", 0.6)
				.style("display", "inline");
		}

	});


});



function updateScatter() {

	selectedCO2 = "co2" + year;
	selectedGDP = "loggdppc" + year;
	selectedCO2pc = "logco2pc" + year;
	selectedGDP2 = "gdppc" + year;
	selectedCO2pc2 = "co2pc" + year;

	d3.selectAll(".scatter")
		.transition()
		.duration(duration)
		.ease(d3.easeLinear)
		.attr("r", function (d) { return 20 * (Math.pow((d[selectedCO2] / 1000000 / 3.14), 0.5)); })
		.attr("cx", function (d) { return x(d[selectedGDP]); })
		.attr("cy", function (d) { return y(d[selectedCO2pc]); });

	d3.select("#year")
		.text(year);



	d3.selectAll(".scatter")
		.on("mouseover", function (event, d) {
			d3.select(this)
				.style("fill", "#006E9B")
				.style("opacity", 1);

			tooltip
				.html(
					"<p><strong>" + d.country + ", " + year + "</strong></p>" +
					"<p>CO<sub>2</sub> emissions: <strong>" + numberFormatDetailed(d[selectedCO2] / 1000000) + " million kilotons</strong></p>" +
					"<p>GDP per capita: <strong>$" + numberFormat(d[selectedGDP2]) + "</strong></p>" +
					"<p>CO<sub>2</sub> per capita: <strong>" + numberFormatDetailed(d[selectedCO2pc2]) + " metric tons</strong></p>"
				)
				.style("left", (event.pageX - 15) + "px")
				.style("top", (event.pageY - 100) + "px")
				.transition()
				.duration(250)
				.style("opacity", 1);
		})
		.on("mouseout", function (d) {
			tooltip
				.transition()
				.duration(250)
				.style("opacity", 0);

			d3.selectAll(".scatter")
				.style("fill", "#00a1ce")
				.style("opacity", 0.6);

		});


}

d3.select(self.frameElement).style("height", "625px");