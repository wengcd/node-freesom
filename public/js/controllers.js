angular.module('freesom.controllers', [])

.controller('HomeCtrl', function($scope, Projects, $sce) {
	Projects.query({},
		function(res) {
			$scope.works = res;
			console.log(res);
		}, function(error) {
			console.log('错误');
		});
});