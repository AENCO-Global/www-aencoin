'use strict';

var getTranslatedText = require('./helper').getTranslatedText;

const values = [
    {
        dateTimeBefore: '2018-08-03T00:00:00.000Z',
        softcap: 89.4,
        hardcap: 22.4
    },
    {
        dateTimeBefore: '2018-08-02T00:00:00.000Z',
        softcap: 74.6,
        hardcap: 18.7
    },
    {
        dateTimeBefore: '2018-08-01T00:00:00.000Z',
        softcap: 70.7,
        hardcap: 17.7
    },
    {
        dateTimeBefore: '2018-07-31T00:00:00.000Z',
        softcap: 56.7,
        hardcap: 14.2
    },
    {
        dateTimeBefore: '2018-07-30T00:00:00.000Z',
        softcap: 49.4,
        hardcap: 12.4
    }
];

const cap = {
    render: function(props) {
        var that = this;
        const language = props.language || "en";
        var classSelector = $(".contribution-bar");
        const softcapText = getTranslatedText(language, "text0257");
        const hardcapText = getTranslatedText(language, "text0258");
        const usdText = getTranslatedText(language, "text0259");
        const capValue = this.getValue();
        const {
            softcapPercentage = 0,
            hardcapPercentage = 0
        } = capValue;
        var dom =   `<div class="tb-col softcap-info">
                        <div class="item-name">
                            <h6>${softcapText}</h6>
                        </div>
                        <div class="item-graph">
                            <div class="bar-graph">
                                <div class="bar-container">
                                    <div class="bar-background"></div>
                                    <div class="value-bar dflex" style="width:${softcapPercentage}%">
                                        <div class="gradientBar"></div>
                                    </div>
                                </div>
                                <div class="bar-desc">
                                    <span class="text-total-value f6">${usdText}15M</span>
                                </div>
                                <div class="clear"></div>
                                <div class="txt-current-cap-container">
                                    <div class="txt-current-cap" style="width:${softcapPercentage}%"><h6>${softcapPercentage}%</h6></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tb-col hardcap-info">
                        <div class="item-name">
                            <h6>${hardcapText}</h6>
                        </div>
                        <div class="item-graph">
                            <div class="bar-graph">
                                <div class="bar-container">
                                    <div class="bar-background"></div>
                                    <div class="value-bar dflex" style="width:${hardcapPercentage}%">
                                        <div class="gradientBar"></div>
                                    </div>
                                </div>
                                <div class="bar-desc">
                                    <span class="text-total-value f6">${usdText}60M</span>
                                </div>
                                <div class="clear"></div>
                                <div class="txt-current-cap-container">
                                    <div class="txt-current-cap" style="width:${hardcapPercentage}%"><h6>${hardcapPercentage}%</h6></div>
                                </div>
                            </div>    
                        </div>
                    </div>`;
        classSelector.html(dom);
    },
    getValue: function() {
        var now = Date.now();
        for(let i = 0; i < values.length; i++) {
            let dateTimeBefore = Date.parse(values[i].dateTimeBefore);
            if(now > dateTimeBefore) {
                return {
                    softcapPercentage: values[i].softcap,
                    hardcapPercentage: values[i].hardcap
                };
            }
        }
        return {
            softcapPercentage: 0,
            hardcapPercentage: 0
        }
    }
};

module.exports = cap;