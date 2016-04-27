(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Translator = (function () {
        // Create root translator
        function Translator(parent, vocabulary) {
            var _this = this;
            this.parent = parent;
            this.vocabulary = vocabulary;
            vocabulary['en'] || (vocabulary['en'] = {});
            this.unknown = {};
            this._t = function (text) { return _this.translate(text); };
        }
        // Create child translator. If it fails, it forward request to parent.
        Translator.prototype.extend = function (vocabulary) {
            return new Translator(this, vocabulary);
        };
        // JSON.stringify( rootTranslator ) in the console will help you to create empty vocabulary
        Translator.prototype.toJSON = function () {
            return this.unknown;
        };
        Translator.prototype.toString = function () {
            return Object.keys(this.unknown).join('; ');
        };
        Translator.prototype.translate = function (text) {
            var lang = Translator.language, translated = this.vocabulary[lang][text];
            if (translated !== void 0)
                return translated;
            if (this.parent)
                return this.parent.translate(text);
            // No translation found. Process.
            if (this.unknown[text] === void 0 && lang !== 'en') {
                this.unknown[text] = '';
                console.warn("[Localization] No translation for \"" + text + "\"");
            }
            return text;
        };
        // Current language  
        Translator.language = 'en';
        return Translator;
    }());
    exports.Translator = Translator;
});
//# sourceMappingURL=index.js.map