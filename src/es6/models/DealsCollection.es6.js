'use strict';

import Backbone from '../backbone/Backbone';
import Deal from './DealModel';
import Collection from './Collection';

var DealsCollection = Collection.extend({

    model: Deal,

    initialize: function (options = {}) {
        if (options.id) {
            this.id = options.id;
        }
    },

    url: function () {
        if (!this.id) {
            throw new Error(`Can't build deals url without id`);
        }
        return '/deals/?filter_id=' + this.id;
    },

    parse: function (json) {
        return json.data;
    }
});

export default DealsCollection;