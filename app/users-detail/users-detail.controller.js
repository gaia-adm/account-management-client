"use strict";

let _toastr, _uibModal, _scope, _state;

export default class UsersDetailController {
  /*@ngInject*/
  constructor($scope, $stateParams, $state, UserResource, $uibModal, toastr) {
    this.list = UserResource.query();
    let _self = this;
    _uibModal = $uibModal;
    _toastr   = toastr;
    _scope    = $scope;
    _state    = $state;

    let id = $stateParams.userId;
    this.user = UserResource.get({id: id}, function(user) {
      user.emailField = user.emails.join(', ');
      return user;
    });
  }

  onDone() {
    _state.go('authenticated.users.main');
  }

}
