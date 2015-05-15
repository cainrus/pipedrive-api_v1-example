'use strict';

class I18n {
    /**
     * @constructor
     * @param {{[translations]: object}} options
     */
    constructor(options = {}) {
        if (options.translations) {
            this.load(options.translations)
        }
    }

    load(data) {
        if (typeof data !== 'object') {
            throw new Error('Unable to load translations');
        }
        this.data = data;
    }

    t(key) {
        if (!this.data) {
            throw new Error('Translations are not available');
        }
        if (!this.data[key]) {
            console.error(`Unable to translate key "${key}"`);
            return key;
        }
        return this.data[key];
    }

;
}

export default I18n;