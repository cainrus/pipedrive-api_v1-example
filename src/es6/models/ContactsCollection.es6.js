'use strict';

import _ from 'underscore';
import Backbone from '../backbone/Backbone';
import Handlebars from '../handlebars/Handlebars';
import ContactModel from './ContactModel';
import Collection from './Collection';

var ContactsCollection = Collection.extend({
    model: ContactModel,
    url: '/persons',
    parse: function (resp) {
        return resp.data;
    },
    select: function (newModel) {
        this.unselect();
        newModel.set('selected', true);
    },
    unselect: function () {
        var prevModel = this.findWhere({selected: true});
        if (prevModel) {
            prevModel.set('selected', false);
        }
    }
});

export default ContactsCollection;