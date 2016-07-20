import angular from 'angular';

function accountList() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      accounts: '='
    },
    template: require('./accountList.html')
  }
}

export default angular.module('directives.accountList', [])
  .directive('accountList', accountList)
  .name;
