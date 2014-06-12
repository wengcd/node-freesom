angular.module('freesom.services', ['ngResource'])

.factory('Projects', function($http, $resource) {
	return $resource('/api/projects/:projectId', 
		{}, {
		query: {
			method: 'GET',
			isArray: true
		},
		save: {
			method: 'POST'
		},
		remove: {
			method: 'DELETE'
		}
	})
});