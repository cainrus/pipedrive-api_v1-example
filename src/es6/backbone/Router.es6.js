'use strict';

import Backbone from './Backbone';
import _ from 'underscore';
import $ from 'jquery';

import App from '../app';


var Router = Backbone.Router.extend({

    start: _.once(function () {
        var options = arguments[0] === undefined ? {} : arguments[0];

        Backbone.history.start(_.defaults(options, {
            pushState: true
        }));
    }),

    routes: {
        'authentication': 'authentication',
        'contacts/:id': 'contact',
        'contacts': 'contacts',
        '*other': 'other'
    },

    disableRoute: function disableRoute(routeName) {
        var index,
            handler,
            handlers = Backbone.history.handlers;
        delete this.routes[routeName];
        for (index in handlers) {
            if (handlers.hasOwnProperty(index)) {
                handler = handlers[index];
                if (handler.route.toString() === Router.prototype._routeToRegExp(routeName).toString()) {
                    handlers.splice(index, 1);
                    break;
                }
            }
        }
    },

    isAllowed: function isAllowed() {

        var d = $.Deferred(),
            isAuthPage = location.pathname === '/authentication';

        App.user.fetch({fromCache: true}).always(function () {
            if (App.user.get('api_token') || isAuthPage) {
                d.resolve();
            } else {
                d.reject();
            }
        });

        return d;
    },

    execute: function (callback = Function, args = []) {
        var self = this;
        this.isAllowed().done(function () {
            callback.apply(self, args);
        }).fail(function () {
            // hack. we must finish previous route handling before make a new one.
            setTimeout(function () {
                self.navigate('authentication', {trigger: true});
            }, 5);
        });
    },

    authentication: function authentication() {
        App.views.auth.show();
    },
    contacts: function contacts() {
        App.views.contacts.show();
    },
    contact: function contact(id) {
        App.views.contacts.show(id);
    },
    // Any unmatched route.
    other: function other() {
        this.navigate('contacts', {trigger: true});
    }
});

export default Router;