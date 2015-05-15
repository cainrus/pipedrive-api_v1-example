'use strict';

import Backbone from '../backbone/Backbone';
import sync from '../backbone/Backbone.sync';

var Model = Backbone.Model.extend({
    sync: sync
});

export default Model;