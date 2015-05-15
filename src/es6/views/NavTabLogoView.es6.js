'use strict';

import Backbone from '../backbone/Backbone';
import Handlebars from '../handlebars/Handlebars';

var NavTabLogoView = Backbone.View.extend({
    template: Handlebars.compile('<h1><a class="logo" href="/">{{text}}</a></h1>'),
    render: function render(data) {
        return this.template(data);
    }
});

export default NavTabLogoView;