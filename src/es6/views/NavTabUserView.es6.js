'use strict';

import Backbone from '../backbone/Backbone';
import Handlebars from '../handlebars/Handlebars';
import _ from 'underscore';

var NavTabUserView = Backbone.View.extend({
    template: Handlebars.compile(
        '<img src="{{usericon}}"><span class="username">{{username}}</span><span class="company">{{company}}</span>'),
    render: function render(model) {
        return this.template(_.defaults({
            username: model.get('name'),
            company: model.get('company'),
            usericon: model.get('image')
        }, {
            usericon: 'https://static.pipedrive.com/lib/icons/usericon.png'
        }));
    }
});

export default NavTabUserView;