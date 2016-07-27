const AccountResource = function($resource) {
  var AccountResource = $resource('http://localhost:3000/api/accounts/:id', {
    id: '@id'
  });
  return AccountResource;
};

export default angular.module('services.account', [])
  .factory('AccountResource', AccountResource)
  .name;
