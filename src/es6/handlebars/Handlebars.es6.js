import Handlebars from 'handlebars';
import App from '../app';

Handlebars.registerHelper('t', function () {
    return App.i18n.t.apply(App.i18n, arguments);
});

export default Handlebars;