import d3 from "d3";

export default function builder() {
	var margin = {top: 0, right: 0, bottom: 25, left: 0},
		width = 1000,
		height = 500;

	var histogram = d3.layout.histogram(),
		x = d3.scale.ordinal(),
		y = d3.scale.linear(),
		xAxis = d3.svg.axis().scale(x).orient("bottom").tickSize(6, 0);

	function chart(sel) {
		sel.each(function (data) {

			data = histogram(data);

			x.domain(data.map(d => d.x))
				.rangeRoundBands([0, width - margin.left - margin.right], .1);
			y.domain([ 0, d3.max(data, d => d.y) ])
				.range([height - margin.top - margin.bottom, 0]);

			var svg = d3.select(this).selectAll("svg").data([data]);

			var gEnter = svg.enter().append("svg").append("g");
			gEnter.append("g").attr("class", "bars");
			gEnter.append("g").attr("class", "x axis");

			svg.attr("width", width)
				.attr("height", height);

			var g = svg.select("g")
				.attr("transform", `translate(${margin.left}, ${margin.top})`);

			var bar = svg.select(".bars").selectAll(".bar").data(data);
			bar.enter().append("rect");
			bar.exit().remove();
			bar.attr("width", x.rangeBand())
				.attr("x", d => x(d.x))
				.attr("y", d => y(d.y))
				.attr("height", d => y.range()[0] - y(d.y))
				.order();

			g.select(".x.axis")
				.attr("transform", `translate(0, ${y.range()[0]})`)
				.call(xAxis);
		});
	}

	d3.rebind(chart, histogram, "value", "range", "bins");
	d3.rebind(chart, xAxis, "tickFormat");

	return chart;
}