'use strict';

// Libs
import Handlebars from '../handlebars/Handlebars';
import Backbone from '../backbone/Backbone';
import _ from 'underscore';

// Views
import NavTabDefaultView from './NavTabDefaultView';
import NavTabLogoView from './NavTabLogoView';
import NavTabUserView from './NavTabUserView';
import NavTabActivititesView from './NavTabActivitiesView';

// Instances
import App from '../app';
var user = App.user;
var i18n = App.i18n;


var NavView = Backbone.View.extend({

    template: Handlebars.compile('<ul>{{#each tabs}}<li class="nav-{{id}}">{{{content}}}</li>{{/each}}</ul>'),
    initialize: function () {

        var navTabDefaultView = new NavTabDefaultView({});
        var navTabLogoView = new NavTabLogoView({});
        var navTabActivititesView = new NavTabActivititesView({});
        var navTabUserView = new NavTabUserView({});

        this.tabs = [{
            id: 'logo',
            data: {text: 'Pipedrive'},
            template: navTabLogoView
        }, {
            id: 'deals',
            data: {text: i18n.t('deals')},
            template: navTabDefaultView
        }, {
            id: 'activities',
            data: {text: i18n.t('activities')},
            template: navTabActivititesView

        }, {
            id: 'profile',
            template: navTabDefaultView
        }, {
            id: 'other',
            template: navTabDefaultView
        }, {
            id: 'user',
            template: navTabUserView,
            data: user
        }];
    },

    render: function () {
        var data = this.tabs.map(function (tab) {
            var content = tab.template ? tab.template.render(tab.data) : '';
            return {id: tab.id, content: content};
        });

        var content = this.template({tabs: data});
        this.$el.html(content);
    }
});

export default NavView;