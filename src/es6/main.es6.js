'use strict';

import console from './vendors/console-polyfill/index';
import es5shim from './vendors/es5-shim/es5-shim';
import $ from 'jquery';
import App from './app';

import NavView from './views/NavView';
import AuthView from './views/AuthView';
import ContactsView from './views/ContactsView';

App.Views.NavView = NavView;
App.Views.AuthView = AuthView;
App.Views.ContactsView = ContactsView;

var userPromise = App.user.fetch({fromCache: true});

$(document).ready(function () {

    // Init views on dom ready.
    App.views.nav = new App.Views.NavView({el: $('nav')});
    App.views.auth = new App.Views.AuthView({el: $('#authorize-form')});
    App.views.contacts = new App.Views.ContactsView({el: $('#page-content')});


    $('body').on('click', 'a[href]', function () {
        App.router.navigate($(this).attr('href'), {trigger: true});
        return false;
    });

    App.user.once('sync', function () {
        App.views.nav.render();
    });

    userPromise.done(function () {
        App.router.disableRoute('authentication');
        App.router.start();
    }).fail(function () {
        App.views.auth.show();
        App.router.start({silent: true});
        App.router.navigate('authentication');
    });

    window.App = App;


});