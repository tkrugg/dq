import angular from 'angular';
import builder from './builder';

function histogram() {
	return {
		restrict: 'E',
		scope: {
			name: '=',
			nbOfBins: '@',
			data: '='
		},
		template: '<div></div>',
		link: function (scope, elem, attrs) {

			scope.$watch("nbOfBins", () => generate(scope.data, +scope.nbOfBins));
			scope.$watch("data", () => generate(scope.data, +scope.nbOfBins));

			function generate(data, bins) {
				if (data.length && bins > 0) {
					const max = Math.max.apply(Math, data);
					const scale = d3.scale.linear().domain([0, bins]).range([0, max]);
					const ticks = d3.range(bins + 1).map(scale);

					d3.select(elem[0])
						.html("")
						.datum(data)
						.call(builder().bins(ticks)
						.tickFormat(d3.format(".02f")));
				} else {
					d3.select(elem[0])
						.html("");
				}
			}
		}

	}
}

export default angular.module('directives.histogram', [])
	.directive('histogram', histogram)
	.name;
