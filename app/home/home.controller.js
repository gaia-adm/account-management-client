export default class HomeController {

    constructor(AuthUser, UserResource) {
        'ngInject';
        this.user = UserResource.get({id: 'self'});
        this.envi = this.prepareEnviDetails();
    };

    prepareEnviDetails() {
        var myEnvi = new Object();
        myEnvi.proto = location.protocol;
        location.hostname.startsWith('acm') ? myEnvi.srv = location.hostname.substring(5) : myEnvi.srv = location.hostname;
        myEnvi.proto === 'https:' ? myEnvi.servicesPort = 444 : myEnvi.servicesPort = 88;
        return myEnvi;
    }
}
