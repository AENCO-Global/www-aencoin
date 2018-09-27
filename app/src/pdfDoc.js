'use strict';

var getTranslatedText = require('./helper').getTranslatedText;

var pdfDoc = [
    {
        title: "text0009",
        languages: {
            "en": "./assets/docs/aenco-whitepaper.pdf",
            "zhcn": "./assets/docs/aenco-whitepaper-cn.pdf",
            "kr": "./assets/docs/aenco-whitepaper-kr.pdf"
        }
    },
    {
        title: "text0010",
        languages: {
            "en": "./assets/docs/aenco-token-economics.pdf",
            "zhcn": "./assets/docs/aenco-token-economics-cn.pdf",
            "kr": "./assets/docs/aenco-token-economics-kr.pdf"
        }
    },
    {
        title: "text0011",
        languages: {
            "en": "./assets/docs/aenco-two-pager.pdf",
            "zhcn": "./assets/docs/aenco-two-pager-cn.pdf",
            "kr": "./assets/docs/aenco-two-pager-kr.pdf",
            "jp": "./assets/docs/aenco-two-pager-jp.pdf"
        }
    },
    {
        title: "text0012",
        languages: {
            "en": "./assets/docs/aenco-presentation.pdf",
            "zhcn": "./assets/docs/aenco-presentation-cn.pdf"
        }
    },
    {
        title: "TERMS OF USE",
        languages: {
            "en": "./assets/docs/aenco-terms-conditions.pdf"
        }
    },
    {
        title: "text0185",
        languages: {
            "en": "./assets/docs/disclaimer.pdf"
        }
    },
    {
        title: "text0186",
        languages: {
            "en": "./assets/docs/privacy-policy.pdf"
        }
    },
    {
        title: "text0255",
        languages: {
            "en": "./assets/docs/aenco-position-paper.pdf",
            "zhcn": "./assets/docs/aenco-position-paper-cn.pdf",
            "kr": "./assets/docs/aenco-position-paper-kr.pdf"
        }
    }
];

module.exports = {
    getPdfDoc: function getPdfDoc(id, lang) {
        let doc = pdfDoc[id];
        let path = doc.languages[lang] ? doc.languages[lang] : doc.languages["en"];
        return {
            title: getTranslatedText(lang, doc.title),
            path: path
        };
    }
};