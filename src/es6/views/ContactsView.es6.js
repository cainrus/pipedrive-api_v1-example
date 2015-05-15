'use strict';

import Handlebars from '../handlebars/Handlebars';
import Backbone from '../backbone/Backbone';
import _ from 'underscore';
import $ from 'jquery';

import ContactsListView from './ContactsListView';
import ContactsContactView from './ContactsContactView';
import ContactsContactDealsView from './ContactsContactDealsView';

import ContactsCollection from '../models/ContactsCollection';

import App from '../app';

var ContactsView = Backbone.View.extend({
    template: Handlebars.compile($('#contacts-page-template').html()),

    views: {},

    render: function (data = {}) {
        var showOptions = {
            list: Boolean(data.list),
            contact: Boolean(data.contact),
            deals: Boolean(data.contact && data.contact.deals && data.contact.deals.size())
        };

        if (this.$el.is(':empty')) {
            this.$el.html(this.template(showOptions));
        }

        if (showOptions.list) {
            if (!this.views.list) {
                this.views.list = new ContactsListView({el: $('#contacts-list', this.$el)});
            }
            this.views.list.show(data.list);
        } else if (this.views.list) {
            this.views.list.hide();
        }

        if (showOptions.contact) {
            if (!this.views.contact) {
                this.views.contact = new ContactsContactView({el: $('#contact-contact', this.$el)});
            }
            this.views.contact.show(data.contact);

            if (showOptions.deals) {

                if (!this.views.deals) {
                    this.views.deals = new ContactsContactDealsView({el: $('#contact-deals', this.$el)});
                }

                this.views.deals.show(data.contact.deals);
            } else if (this.views.deals) {
                this.views.deals.hide();
            }
        } else if (this.views.contact) {
            this.views.contact.hide();
        }
    },

    show: function (id) {

        id = Number(id);

        $('body').attr('data-page', 'contacts');
        this.contacts = new ContactsCollection({});
        this.contacts.fetch().done((function () {
            this.contacts.unselect();
            if (id) {
                this.contact = this.contacts.findWhere({id: id});
                if (this.contact) {
                    this.contacts.select(this.contact);
                    this.contact.deals.fetch().done((function () {
                        this.render({list: this.contacts, deals: this.deals, contact: this.contact});
                        $('article .title-name', this.$el).text(this.contact.get('name'));
                        $('article', this.$el).show();
                    }).bind(this)).fail((function () {
                        // deals aren't ready
                        console.error(`can't load deals`);
                    }).bind(this));

                } else {
                    console.error('contact was not loaded');
                    $('article', this.$el).hide();
                }
            } else {
                this.render({list: this.contacts, deals: '', contact: ''});
                $('article', this.$el).hide();
            }
        }).bind(this)).fail((function () {
            console.error(`can't load contacts: ${arguments[1]}`);
            this.render({list: '', deals: '', contact: ''});
        }).bind(this));
    },

    hide: function () {
        $('body[data-page="contacts"]').attr('data-page', '');
    }
});

export default ContactsView;