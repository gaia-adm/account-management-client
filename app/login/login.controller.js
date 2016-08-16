let _UserResource, _AuthService, _state;

export default class LoginController {
  /*@ngInject*/
  constructor($window, UserResource, AuthService, $state) {
    _UserResource = UserResource;
    _AuthService = AuthService;
    _state = $state;
    let gapi = $window.gapi;
    gapi.signin2.render('gaia-google-sign-in', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': false,
      'theme': 'dark',
      'onsuccess': this.onSignIn,
      'prompt': 'select_account',
      // 'onfailure': onFailure
    });
  };

  onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    _UserResource.login(id_token)
      .then(function(response) {
        console.info('logged in', response);
        _state.go('authenticated.home');
      })
  };

}
