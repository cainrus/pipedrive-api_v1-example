'use strict';

import Handlebars from '../handlebars/Handlebars';
import Backbone from '../backbone/Backbone';
import _ from 'underscore';
import $ from 'jquery';

import App from '../app';

var ContactsListView = Backbone.View.extend({

    template: Handlebars.compile($('#contacts-list-template').html()),


    render: function render(collection) {

        var contacts = collection.toJSON();

        var content = this.template({contacts: contacts});
        this.$el.html(content);
    },

    show: function (collection) {
        this.render(collection);
        this.$el.show();
    },
    hide: function () {
        this.$el.hide();
    }

});

export default ContactsListView;