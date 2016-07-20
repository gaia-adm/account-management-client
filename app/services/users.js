const UserResource = function($resource) {
  var UserResource = $resource('http://localhost:3000/api/users/:id');
  return UserResource;
};

export default angular.module('services.user', [])
  .factory('UserResource', UserResource)
  .name;
