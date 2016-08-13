let _GapiService, _window, _stateParams, _self;

export default class InvitationAcceptanceController {
  /*@ngInject*/
  constructor($window, $stateParams, GapiService, InvitationResource) {
    _self = this;
    _window = $window;
    _GapiService = GapiService;
    _stateParams = $stateParams;

    let uuid = $stateParams.uuid;

    this.invitation = InvitationResource.get({uuid: uuid}, function(invitation) {
      return invitation;
    });

    this.success = null;
    this.message = null;
  }

  onAcceptInvitation() {
    _self.invitation.$validate()
      .then(function(response) {
        _self.message = response.message;
        _self.success = true;
      }).catch(function(response) {
        _self.message = response.message;
        _self.success = false;
      });
  }
}
