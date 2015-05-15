'use strict';

import Backbone from '../backbone/Backbone';
import Handlebars from '../handlebars/Handlebars';
import _ from 'underscore';

var NavTabActivitiesView = Backbone.View.extend({
    template: Handlebars.compile('<span class="day">{{date}}</span><a>{{text}}</a>'),
    render: function render(data) {
        return this.template(_.extend({date: ('0' + new Date().getDate()).substr(-2)}, data));
    }
});

export default NavTabActivitiesView;