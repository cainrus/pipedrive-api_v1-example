'use strict';

import Backbone from '../backbone/Backbone';
import Model from './Model';

var UserModel = Model.extend({
    initialize: function () {
        Backbone.on('beforeSync', function (xhrOptions) {
            var api_token = this.get('api_token');
            if (api_token) {
                xhrOptions.data = xhrOptions.data || {};
                xhrOptions.data.api_token = api_token;
            }
        }, this);
    },
    url: '/authorizations',

    'get': function (attr) {
        var attributes = this.attributes;
        try {
            switch (attr) {
                case 'api_token':
                    return attributes.data[0].api_token;
                    break;
                case 'company':
                    return attributes.data[0].company.info.name;
                    break;
                case 'name':
                    return attributes.additional_data.user.profile.name;
                case 'image':
                    return attributes.additional_data.user.profile.icon_url;
            }
        } catch (e) {
            return '';
        }

        return Backbone.Model.prototype.get.call(this, attr);
    }
});

export default UserModel;