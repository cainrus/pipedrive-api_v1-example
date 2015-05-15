import Handlebars from '../handlebars/Handlebars';
import Backbone from '../backbone/Backbone';
import _ from 'underscore';
import $ from 'jquery';

import App from '../app';

var AuthView = Backbone.View.extend({
    template: Handlebars.compile($('#auth-form-template').html()),
    events: {
        'submit': 'authorize'
    },
    initialize: function initialize() {
        this.render = _.once(this.render, this);
    },
    authorize: function authorize() {
        var self = this;
        var $form = $('form', this.$el);
        var data = _.reduce($form.serializeArray(), function (data, item) {
            data[item['name']] = item['value'];
            return data;
        }, {});
        $('[type="password"]', $form).val('');

        App.user.fetch({
            data: data
        }).done(function () {
            App.router.navigate('contacts', {trigger: true});
        }).fail(function (xhr, status) {
            self.showError(status);
        });

        return false;
    },
    showError: function showError(message) {
        if (!message) {
            message = App.i18n.t('unexpectedError');
            message = message.charAt(0).toUpperCase() + message.slice(1);
        }
        $('.error', this.$el).show().text(message);
    },
    render: function render() {
        this.$el.html(this.template({}));
    },

    show: function show() {
        this.render();
        $('body').attr('data-page', 'auth');
        //app.services.provide('overlay').show();
    },
    hide: function hide() {
        $('body[data-page="auth"]').attr('data-page', '');
        //app.services.provide('overlay').hide();
    }
});

export default AuthView;