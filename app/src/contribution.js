'use strict';

var getTranslatedText = require('./helper').getTranslatedText;
var strReplace = require('./helper').strReplace;
var getPdfDoc = require('./pdfDoc').getPdfDoc;

const contribution = {
    getContributionSection: function getContributionSection(lang) {
        var contributionContent = this.getContributionsContent(lang);
        return `<section class="section learn-more-area" id="contribution-area">
                    ${contributionContent}
                </section>`;
    },
    getLearnMoreContent: function getLearnMoreContent(lang) {
        var contributionContent = this.getContributionsContent(lang);
        var whitepaper = getPdfDoc(0, lang).path;
        var tokenpaper = getPdfDoc(1, lang).path;
        var terms = getPdfDoc(4, lang).path;
        var text2002 = getTranslatedText(lang, "text2002");
        text2002 = strReplace(text2002, '<a>', '<a target="_blank" href="' + tokenpaper + '">');
        text2002 = strReplace(text2002, '<a>', '<a target="_blank" href="' + terms + '">');
        var text2003 = getTranslatedText(lang, "text2003");
        var text2004 = getTranslatedText(lang, "text2004");
        var text2006 = getTranslatedText(lang, "text2006");
        var text2007 = getTranslatedText(lang, "text2007");
        var text2008 = getTranslatedText(lang, "text2008");
        var text2009 = getTranslatedText(lang, "text2009");
        var text2010 = getTranslatedText(lang, "text2010");
        var text2011 = getTranslatedText(lang, "text2011");
        var text2012 = getTranslatedText(lang, "text2012");
        var text2013 = getTranslatedText(lang, "text2013");
        var text2014 = getTranslatedText(lang, "text2014");
        var text2015 = getTranslatedText(lang, "text2015");
        text2015 = strReplace(text2015, '<a>', '<a target="_blank" href="' + whitepaper + '">');
        text2015 = strReplace(text2015, '<a>', '<a target="_blank" href="' + tokenpaper + '">');
        var text2016 = getTranslatedText(lang, "text2016");
        var text2017 = getTranslatedText(lang, "text2017");
        var text2018 = getTranslatedText(lang, "text2018");
        var text2019 = getTranslatedText(lang, "text2019");
        var text2020 = getTranslatedText(lang, "text2020");
        var text2021 = getTranslatedText(lang, "text2021");
        var text2022 = getTranslatedText(lang, "text2022");
        var terms = getPdfDoc(4, lang).path;
        text2022 = strReplace(text2022, '<a>', '<a target="_blank" href="' + terms +'">');
        var text2023 = getTranslatedText(lang, "text2023");
        text2023 = strReplace(text2023, '<a>', '<a target="_blank" href="https://signup.aencoin.com/register">');
        var text2024 = getTranslatedText(lang, "text2024");
        var text2039 = getTranslatedText(lang, "text2039");
        return `<section class="section learn-more-area" id="token-sale-terms">
                    <div class="container">
                        <!-- Token Sale Terms Summary -->
                        <p>${text2002}</p>
                        <p>${text2003}</p>
                        <div class="sub-section section-private-sale">
                            <h4>${text2004}</h4>
                            <table>
                                <tr>
                                    <td class="w30">${text2006}</td>
                                    <td>${text2007}</td>
                                </tr>
                                <tr>
                                    <td class="w30">${text2008}</td>
                                    <td>${text2009}</td>
                                </tr>
                                <tr>
                                    <td class="w30">${text2010}</td>
                                    <td>${text2011}</td>
                                </tr>
                                <tr>
                                    <td class="w30">${text2012}</td>
                                    <td>${text2013}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="sub-section section-pre-sale">
                            <h4>${text2014}</h4>
                            <p>${text2015}</p>
                            <table>
                                <tr>
                                    <td class="w30">${text2016}</td>
                                    <td>${text2017}</td>
                                </tr>
                                <tr>
                                    <td class="w30">${text2018}</td>
                                    <td>${text2019}</td>
                                </tr>
                                <tr>
                                    <td class="w30">${text2020}</td>
                                    <td>${text2039}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="sub-section section-eligibility">
                            <h4>${text2021}</h4>
                            <ul>
                                <li>${text2022}</li>
                                <li>${text2023}</li>
                                <li>${text2024}</li>
                            </ul>
                        </div>
                        ${contributionContent}
                    </div>
                </section>`;
    },
    getContributionsContent: function getContributionsContent(lang) {
        var text2025 = getTranslatedText(lang, "text2025");
        var text2026 = getTranslatedText(lang, "text2026");
        var text2027 = getTranslatedText(lang, "text2027");
        var text2028 = getTranslatedText(lang, "text2028");
        var text2029 = getTranslatedText(lang, "text2029");
        text2029 = strReplace(text2029, '<a>', '<a target="_blank" href="https://sanctionssearch.ofac.treas.gov/">');
        var text2030 = getTranslatedText(lang, "text2030");
        var text2031 = getTranslatedText(lang, "text2031");
        var text2032 = getTranslatedText(lang, "text2032");
        var text2033 = getTranslatedText(lang, "text2033");
        var text2034 = getTranslatedText(lang, "text2034");
        var text2035 = getTranslatedText(lang, "text2035");
        var text2036 = getTranslatedText(lang, "text2036");
        return `<div class="sub-section">
                    <div class="sub-header">${text2025}</div>
                    <ul>
                        <li>${text2026}</li>
                        <li>${text2027}</li>
                        <li>${text2028}</li>
                        <li>${text2029}</li>
                    </ul>
                </div>
                <div class="sub-section">
                    <div class="sub-header">${text2030}</div>
                    <ul>
                        <li>${text2031}</li>
                        <li>${text2032}</li>
                        <li>${text2033}</li>
                    </ul>
                </div>
                <div class="sub-section">
                    <div class="sub-header">${text2034}</div>
                    <ul>
                        <li>${text2035}</li>
                        <li>${text2036}</li>
                    </ul>
                </div>`;
    }
};

module.exports = contribution;