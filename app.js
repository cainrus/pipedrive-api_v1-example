'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var I18n = require('i18n-2');
var hbs = require('hbs');
var fs = require('fs');
var path = require('path');

var routes = require('./routes/index');


var app = express();

hbs.localsAsTemplateData(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials/contacts');
hbs.registerPartials(__dirname + '/views/partials/auth');

hbs.registerHelper('raw', function (partialName) {
    return hbs.handlebars.partials[partialName];
});
hbs.registerHelper('json', function (context) {
    return JSON.stringify(context);
});


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('BWN2rO4elkyv'));
app.use(express['static'](path.join(__dirname, 'public')));

I18n.expressBind(app, {
    // setup some locales - other locales default to vi silently
    locales: ['ru', 'en'],
    // set the default locale
    defaultLocale: 'en',
    // set the cookie name
    cookieName: 'locale',
    extension: '.json'
});

// set up the middleware
app.use(function (req, res, next) {
    req.i18n.setLocaleFromCookie();
    req.i18n.setLocaleFromQuery();


    var translations = req.app.locals.translations = require('./configs/i18n.js')(req.i18n);
    app.locals.nav = [{
        id: 'deals',
        text: translations.deals,
        href: '#'
    }, {
        id: 'activities',
        text: translations.activities,
        href: '#'
    }, {
        id: 'profile',
        href: '#'
    }, {
        id: 'other',
        href: '#'
    }];
    app.locals.title = 'Pipedrive';

    next();
});

app.use('*', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

//# sourceMappingURL=app.js.map