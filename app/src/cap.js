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

function getCapData(cb) {
    $.ajax({
        dataType: "json",
        url: "./api/index.php",
        success: cb
    });
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
        var getCapDataFunc = function() {
            getCapData(function(data){
                const capData = {
                    softcapPercentage: data.sv,
                    hardcapPercentage: data.hv
                };
                that.triggerUpdate(capData);
            });
        }
        getCapDataFunc();
        this.componentDidMount(props);
        this.render();
        //const interval = 60000;
        const interval = 30000;
        setInterval(function() {
            const now = Date.now();
            getCapDataFunc();
        }, interval);
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
        this.props = {
            language: props.language,
            softcapPercentage: 0,
            hardcapPercentage: 0
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
        let {
            language = "en",
            softcapPercentage = 0,
            hardcapPercentage = 0
        } = props;
        var classSelector = $(".contribution-bar");
        const softcapText = getTranslatedText(language, "text0257");
        const hardcapText = getTranslatedText(language, "text0258");
        const usdText = getTranslatedText(language, "text0259");
        const contributionText = getTranslatedText(language, "text0268");
        const softcapRemarkText = getTranslatedText(language, "text0269");
        const midcapRemarkText = getTranslatedText(language, "text0270");
        const hardcapRemarkText = getTranslatedText(language, "text0271");
        var dom = "";
        //softcapPercentage = 150;
        //hardcapPercentage = 100;
        //const isSingleBar = softcapPercentage >= 100;
        const isSingleBar = true;
        const singleBarDomClass = isSingleBar ? "combine-softcap" : "";
        const gradientPercentage = 25 / hardcapPercentage * 100;
        var singleBarDom = `
        <div class="single-bar-container">
            <div class="tb-col hardcap-info ${singleBarDomClass}">
                <div class="item-name">
                    <div class="f3">${contributionText}</div>
                </div>
                <div class="item-graph">
                    <div class="bar-graph">
                        <div class="bar-container">
                            <div class="bar-background"></div>
                            <div class="value-bar dflex" style="width:${hardcapPercentage}%; background: linear-gradient(to right, #00b7ce ${gradientPercentage}%, #a1c043 ${gradientPercentage}%, #a1c043 100%);">
                                <div class="gradientBar"></div>
                                <div class="current-cap-value">
                                    <h6>${hardcapPercentage}%</h6>
                                </div>
                            </div>
                        </div>
                        <div class="bar-desc">
                            <div class="text-total-value f6">${hardcapRemarkText}</div>
                        </div>
                        <div class="clear"></div>
                        <div class="softcap-indicator-container">
                            <div class="bar-indicator-container">
                                <div class="bar-indicator" style="width:25%"></div>
                            </div>
                            <div class="txt-current-cap-container">
                                <div class="txt-current-cap"><span class="f6">${softcapRemarkText}</span></div>
                            </div>
                        </div>
                        <div class="midcap-indicator-container">
                            <div class="bar-indicator-container">
                                <div class="bar-indicator" style="width:37%"></div>
                            </div>
                            <div class="txt-current-cap-container">
                                <div class="txt-current-cap"><span class="f6">${midcapRemarkText}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="empty-row"></div>
            </div>
        </div>`;
        /*var singleBarDom = `<div class="tb-col hardcap-info ${singleBarDomClass}">
                                <div class="item-name">
                                    <h6>${hardcapText}</h6>
                                </div>
                                <div class="item-graph">
                                    <div class="bar-graph">
                                        <div class="bar-container">
                                            <div class="bar-background"></div>
                                            <div class="value-bar dflex" style="width:${hardcapPercentage}%; background: linear-gradient(to right, #00b7ce ${gradientPercentage}%, #a1c043 ${gradientPercentage}%, #a1c043 100%);">
                                                <div class="gradientBar"></div>
                                            </div>
                                        </div>
                                        <div class="bar-indicator-container">
                                            <div class="bar-indicator"></div>
                                        </div>
                                        <div class="bar-desc">
                                            <span class="text-total-value f6">${usdText}60M</span>
                                        </div>
                                        <div class="clear"></div>
                                        <div class="txt-current-cap-container">
                                            <div class="txt-current-cap" style="width:${hardcapPercentage}%"><h6>${hardcapPercentage}%</h6></div>
                                        </div>
                                        <div class="txt-soft-cap-container">
                                            <div class="txt-soft-cap"><h6>Soft Cap<br/>US$15M</h6></div>
                                        </div>
                                    </div>    
                                </div>
                            </div>`;*/
        
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
                                    <span class="text-total-value f6">${usdText}15M</span>
                                </div>
                                <div class="clear"></div>
                                <div class="txt-current-cap-container">
                                    <div class="txt-current-cap" style="width:${hardcapPercentage}%"><h6>${hardcapPercentage}%</h6></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
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