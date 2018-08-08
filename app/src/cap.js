'use strict';

var getTranslatedText = require('./helper').getTranslatedText;
var daysToSeconds = require('./helper').daysToSeconds;
var roundToOneDecimal = require('./helper').roundToOneDecimal;

const softcapVolume = 15;
const hardcapVolume = 60;
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

const capData = [
    {
        startTime: '2018-08-08T00:00:00.000Z',
        duration: daysToSeconds(35),
        startPercentageValue: 89.4,
        endPercentageValue: 109.7
    }
];

function getCapData(now) {
    const currentData = null;
    for(let i = capData.length - 1; i >= 0; i--) {
        const startTime = Date.parse(capData[i].startTime);
        if(now >= startTime) {
            return doCapCalculation(capData[i], now);
        }
    }
    return {
        softcapPercentage: 89.4,
        hardcapPercentage: 22.4
    }
}

function doCapCalculation(capData, now) {
    const {
        startTime,
        duration,
        startPercentageValue,
        endPercentageValue
    } = capData;
    const capStartTime = Date.parse(startTime);
    const percentageDiff = endPercentageValue - startPercentageValue;
    const timeDiff = (now - capStartTime) / 1000;
    const ratio = Math.min(timeDiff / duration, 1);
    const addonPercentage =  percentageDiff * ratio;
    let softcapPercentage = roundToOneDecimal(startPercentageValue + addonPercentage);
    let hardcapPercentage = roundToOneDecimal((softcapVolume * softcapPercentage / 100) / hardcapVolume * 100);
    return {
        softcapPercentage: Math.min(100, softcapPercentage),
        hardcapPercentage: Math.min(100, hardcapPercentage)
    };
}

const cap = {
    props: {
        language: "en",
        softcapPercentage: 0,
        hardcapPercentage: 0
    },
    mergeProps: function(props) {
        var oldProps = this.props;
        var obj = {
            softcapPercentage: props.hasOwnProperty('softcapPercentage') ? props.softcapPercentage : oldProps.softcapPercentage,
            hardcapPercentage: props.hasOwnProperty('hardcapPercentage') ? props.hardcapPercentage : oldProps.hardcapPercentage,
            language: props.hasOwnProperty('language') ? props.language : oldProps.language
        };
        return obj;
    },
    init: function(props) {
        var that = this;
        this.componentDidMount(props);
        this.render();

        setInterval(function() {
            const now = Date.now();
            const capData = getCapData(now);
            that.triggerUpdate(capData);
        }, 1000);
    },
    triggerUpdate: function(props) {
        const mergedProps = this.mergeProps(props);
        const isUpdated = this.shouldComponentUpdate(mergedProps);
        this.props = mergedProps;
        if (isUpdated) {
            this.render();
        }
    },
    componentDidMount: function(props) {
        const now = Date.now();
        const capData = getCapData(now);
        this.props = {
            language: props.language,
            softcapPercentage: capData.softcapPercentage,
            hardcapPercentage: capData.hardcapPercentage
        };
    },
    shouldComponentUpdate: function(props) {
        const oldProps = this.props;
        const isUpdated = !(props.softcapPercentage === oldProps.softcapPercentage && props.hardcapPercentage === oldProps.hardcapPercentage);
        return isUpdated;
    },
    render: function() {
        var that = this;
        var props = that.props;
        const {
            language = "en",
            softcapPercentage = 0,
            hardcapPercentage = 0
        } = props;
        var classSelector = $(".contribution-bar");
        const softcapText = getTranslatedText(language, "text0257");
        const hardcapText = getTranslatedText(language, "text0258");
        const usdText = getTranslatedText(language, "text0259");
        var dom = "";
        const isSingleBar = softcapPercentage >= 100;
        const singleBarDomClass = isSingleBar ? "combine-softcap" : "";
        var singleBarDom = `<div class="tb-col hardcap-info ${singleBarDomClass}">
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
        
        if (isSingleBar) {
            dom = singleBarDom;
        } else {
            dom =   `<div class="tb-col softcap-info">
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
                    ${singleBarDom}`;
        }
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