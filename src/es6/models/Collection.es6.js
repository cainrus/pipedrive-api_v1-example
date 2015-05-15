'use strict';

import Backbone from '../backbone/Backbone';
import sync from '../backbone/Backbone.sync';

var Collection = Backbone.Collection.extend({
    sync: sync
});

export default Collection;