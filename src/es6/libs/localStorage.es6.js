'use strict';

var localstorage, i = 0, mod = 'localStorageCheckKey', fail = false;

try {
    localstorage = window.localStorage;
    while (localstorage.getItem(mod + i++)) {
    }
    mod += i;
    localstorage.setItem(mod, mod);
    if (localstorage.getItem(mod) !== mod) {
        fail = true;
    } else {
        localstorage.removeItem(mod);
    }
} catch (e) {
    fail = true;
}

var logError = function (msg) {
        var message = 'localStorage is disabled. ' + (msg ? msg : '');
        console.error(message);
    },
    call = function (cb) {
        try {
            return cb();
        } catch (e) {
            logError(e);
        }
    };


if (fail) {
    localstorage = {
        removeItem: logError,
        setItem: logError,
        getItem: logError,
        clear: logError
    };
} else {

    localstorage = {
        setItem: function (key, value) {
            return call(function () {
                return window.localStorage.setItem(key, value);
            });
        },
        getItem: function (key) {
            return call(function () {
                return window.localStorage.getItem(key);
            });
        },
        removeItem: function (key) {
            return call(function () {
                return window.localStorage.removeItem(key);
            });
        },
        clear: function () {
            return call(function () {
                return window.localStorage.clear();
            });
        },
        key: function (key) {
            return call(function () {
                return window.localStorage.key(key);
            });
        }
    };
}

export default localstorage;