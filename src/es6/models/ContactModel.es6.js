'use strict';

import _ from 'underscore';
import Backbone from '../backbone/Backbone';
import Handlebars from '../handlebars/Handlebars';
import Model from './Model';
import DealsCollection from '../models/DealsCollection';


var dateTemplate = Handlebars.compile('{{month}} {{day}}, {{year}}'),
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var ContactModel = Model.extend({

    initialize: function (options) {
        this.deals = new DealsCollection({id: options.id});
        return Backbone.Model.prototype.initialize.apply(this, arguments);
    },

    'get': function (attr) {
        var attributes = this.attributes;
        try {
            switch (attr) {
                case 'deals':
                    return new Deals({id: attributes.id});
                case 'primary_email':
                    return _.findWhere(attributes.email, {primary: true}).value;
                case 'primary_phone':
                    return _.findWhere(attributes.phone, {primary: true}).value;
                case 'add_time':

                    var add_time;
                    if (!attributes.add_time) {
                        return '';
                    }
                    add_time = new Date(Date.parse(attributes.add_time.split(' ').join('T')));
                    return dateTemplate({
                        month: monthNames[add_time.getMonth()],
                        day: add_time.getDate(),
                        year: add_time.getFullYear()
                    });
                case 'next_activity':
                    if (!attributes.next_activity_date) {
                        return '';
                    }
                    var i18n = app.services.provide('i18n');
                    var day = 1000 * 60 * 60 * 24;

                    var activity_timestamp = Date.parse(attributes.next_activity_date + 'T' + (attributes.next_activity_time || '00:00:00'));
                    var activity_date = new Date(activity_timestamp);

                    var nowDate = new Date();
                    if (activity_timestamp < nowDate.getTime()) {
                        return dateTemplate({
                            month: monthNames[activity_date.getMonth()],
                            day: activity_date.getDate(),
                            year: activity_date.getFullYear()
                        });
                    }
                    var next_activity = nowDate.toString().split(' ').splice(0, 4).join(' ');
                    var tomorrow = {};

                    tomorrow.start = new Date(next_activity).getTime();
                    tomorrow.end = tomorrow.start + day - 1;
                    if (activity_timestamp < tomorrow.start) {
                        next_activity = i18n.t('today');
                    } else if (activity_timestamp < tomorrow.end) {
                        next_activity = i18n.t('tomorrow');
                    }
                    return ' ' + ('0' + activity_date.getHours()).slice(-2) + ':' + ('0' + activity_date.getMinutes()).slice(-2);
            }
        } catch (e) {
            return '';
        }

        return Backbone.Model.prototype.get.apply(this, arguments);
    }
});

export default ContactModel;