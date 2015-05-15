import UserModel from './models/UserModel';
import I18n from './libs/i18n';
import Router from './backbone/Router';

var App = {
    Views: {},
    Models: {},
    Collections: {},
    views: {}
};

// instances.
App.i18n = new I18n({translations: window.translations});
App.user = new UserModel({});
App.router = new Router({});

export default App;