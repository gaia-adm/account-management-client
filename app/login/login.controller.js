let _UserResource, _AuthService, _state, _toastr;

export default class LoginController {
  constructor($scope, $element, $window, UserResource, AuthService, $state, toastr) {
    _UserResource = UserResource;
    _AuthService = AuthService;
    _state = $state;
    _toastr = toastr;
    let gapi = $window.gapi;
    gapi.signin2.render('gaia-google-sign-in', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': false,
      'theme': 'dark',
      'onsuccess': this.onSignIn
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
      .catch(function(error) {
        console.error('bad luck', error);
        _toastr.error(error);
      });
  };

  signOut() {
    _AuthService.logout();
    // let auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    //   _AuthToken.invalidate();
    // });
  }
}

LoginController.$inject = ['$scope', '$element', '$window', 'UserResource', 'AuthService', '$state', 'toastr'];
