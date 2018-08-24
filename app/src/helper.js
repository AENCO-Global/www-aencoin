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
	},
	roundToOneDecimal: function roundToOneDecimal(value) {
		return Math.round( value * 10 ) / 10;
	},
	daysToSeconds: function(day) {
		return day * 24 * 60 * 60;
	}
}