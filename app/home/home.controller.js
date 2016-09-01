export default class HomeController {

  constructor(AuthUser, UserResource){
    'ngInject';
    this.user = UserResource.get({id: 'self'});
  };
}
