'use strict';

import Handlebars from '../handlebars/Handlebars';
import Backbone from '../backbone/Backbone';
import $ from 'jquery';


var ContactsContactView = Backbone.View.extend({

    template: Handlebars.compile($('#contacts-contact-template').html()),
    monthTemplate: Handlebars.compile('{{month}} {{day}}, {{year}}'),
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

    show: function (contact) {
        this.render(contact);
        this.$el.show();
    },


    hide: function () {
        this.$el.hide();
    },


    render: function (model) {
        var content = this.template({
            name: model.attributes.name,
            email: model.get('primary_email'),
            phone: model.get('primary_phone'),
            add_time: model.get('add_time'),
            open_deals: model.attributes.open_deals_count,
            next_activity: model.get('next_activity')
        });
        this.$el.html(content);
    }
});

export default ContactsContactView;