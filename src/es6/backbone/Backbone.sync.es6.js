'use strict';

import $ from 'jquery';
import Backbone from './Backbone';
import _ from 'underscore';
import webStorage from '../libs/localStorage';

var sync = function (method, model, options = {}) {

    if (method !== 'read') {
        throw new Error('method "' + method + '" is not implemented.');
    }

    var baseUrl = 'https://api.pipedrive.com/v1';
    var urlMap = {
        '/authorizations': {
            method: 'post',
            cacheSupport: true
        },
        '/persons': {
            method: 'get'
        },
        '/deals\\/\\?filter_id=\\d+': {
            method: 'get'
        }
    };

    options.error = options.error || Function;

    var urlKey = _.result(model, 'url');
    if (!urlKey) {
        throw new Error('Unable to read models url param.');
    }

    // Get url from model.
    var api = _.extend({}, _.filter(urlMap, function (item, key) {
        return Boolean(key === urlKey || urlKey.match(new RegExp(key)));
    })[0]);

    if (!api.method) {
        throw new Error('Unable to process api request');
    }

    // Default JSON-request options.
    var params = {
        url: baseUrl + urlKey,
        type: api.method,
        dataType: 'json'
    };

    var storageKey = '' + api.method + ':' + urlKey;
    var d = $.Deferred();
    d.done(options.success).fail(options.error);

    if (api.cacheSupport) {

        var cachedResp;
        try {
            cachedResp = JSON.parse(webStorage.getItem(storageKey));
        } catch (e) {
            var message;
            switch (true) {
                case e instanceof ReferenceError:
                    message = 'Storage is not available';
                    break;
                case e instanceof SyntaxError:
                    message = 'Storage data is corrupted';
                    break;
                case e instanceof DOMException:
                    message = 'Storage is not available';
                    break;
                default:
                    message = 'Unable to get data';
            }
            console.error(message, e);
            // if local data is required, then fail, otherwise xhr fallback.
        }

        if (cachedResp) {
            return d.resolve(cachedResp);
        } else if (options.fromCache) {
            return d.reject();
        }
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhrOptions = _.extend(params, options);

    // Hook xhr options before request.
    Backbone.trigger('beforeSync', xhrOptions, model);

    var xhr = options.xhr = Backbone.ajax(xhrOptions).fail(function (xhr, status, message) {
        var errorMessage = xhr && xhr.responseJSON && xhr.responseJSON.error || 'API Response is not successful';
        return d.reject.apply(d, [xhr, '' + message + ': ' + errorMessage]);
    }).done(function (json, status, xhr) {
        try {
            if (api.cacheSupport) {
                webStorage.setItem(storageKey, JSON.stringify(json));
            }
        } catch (e) {
        }
        var isSuccess = typeof json === 'object' && json.success;
        if (isSuccess) {
            return d.resolve.apply(d, arguments);
        } else {
            var errorMessage = json && json.responseJSON && json.responseJSON.error || 'API Response is not successful';
            return d.reject.apply(d, [arguments[2], errorMessage]);
        }
    });

    model.trigger('request', model, xhr, options);

    return d;
};

export default sync;