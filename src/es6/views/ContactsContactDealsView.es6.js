'use strict';

import Handlebars from '../handlebars/Handlebars';
import Backbone from '../backbone/Backbone';
import _ from 'underscore';
import $ from 'jquery';


var ContactsContactDealsView = Backbone.View.extend({
    template: Handlebars.compile($('#contacts-deals-template').html()),
    initialize: function () {
        _.bindAll(this, 'render');
    },

    render: function (collection) {
        var content = this.template({deals: collection.toJSON()});
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

export default ContactsContactDealsView;