'use strict';

var text = require('./text');

module.exports = {
	getTranslatedText: function getTranslatedText(lang, key) {
		const str = text[lang][key];
		if (str === "") {
			return text["en"][key];
		}
    	return str ? str : key;
	},
	strReplace: function strReplace(str, placeholder, content) {
		return str.replace(placeholder, content);
	}
}