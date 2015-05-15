'use strict';

import Backbone from '../backbone/Backbone';
import Handlebars from '../handlebars/Handlebars';

var NavTabDefaultView = Backbone.View.extend({
    template: Handlebars.compile('<a href="#">{{text}}</a>'),
    render: function render(data) {
        return this.template(data);
    }
});

export default NavTabDefaultView;