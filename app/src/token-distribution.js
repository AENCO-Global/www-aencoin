'use strict';

var getTranslatedText = require('./helper').getTranslatedText;

var tokenAllocationData = [
    {
        label: 'text0111',
        value: 50
    },
    {
        label: 'text0113',
        value: 21
    },
    {
        label: 'text0115',
        value: 15
    },
    {
        label: 'text0117',
        value: 14
    }
];
var useOfProceedsData = [
    {
        label: 'text0122',
        value: 40
    },
    {
        label: 'text0124',
        value: 30
    },
    {
        label: 'text0126',
        value: 24
    },
    {
        label: 'text0128',
        value: 3
    },
    {
        label: 'text0130',
        value: 3
    }
];

var colors = ['#b1d349', '#95cb74', '#87c786', '#66c0a5', '#076f7d', '#0d8596', '#15b8ce'];

function toRadians(degree) {
    return degree * Math.PI / 180;
}

function checkPoint(radius, x, y, startAngle, endAngle) {
    var polarradius = Math.sqrt(x * x + y * y);
    var angle = Math.atan2(y, x) * 180 / Math.PI;
    if (angle < 0) {
        angle = 360 + angle;
    }
    if (angle >= startAngle && angle <= endAngle && polarradius <= radius) {
        return true;
    } else {
        return false;
    }
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color, isShowText, textX, textY, text){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    if (isShowText) {
        ctx.font = '24px Teko';
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(text, textX, textY);
    }
}

module.exports = {
    charts: [],
    updateTable: function updateTable(lang) {
        let html = "";
        let label = "";
        for(let i = 0; i < tokenAllocationData.length; i++) {
            label = getTranslatedText(lang, tokenAllocationData[i].label);
            html += `<div class="row item${i}">
                        <div class="col col-2"><h5>${tokenAllocationData[i].value}%</h5></div>
                        <div class="col"><h5>${label}</h5></div>
                    </div>`;
        }
        $("#token-allocation").html(html);

        html = "";
        for(let i = 0; i < useOfProceedsData.length; i++) {
            label = getTranslatedText(lang, useOfProceedsData[i].label);
            html += `<div class="row item${i}">
                        <div class="col col-2"><h5>${useOfProceedsData[i].value}%</h5></div>
                        <div class="col"><h5>${label}</h5></div>
                    </div>`;
        }
        $("#use-of-proceeds").html(html);
    },
    getPieChart: function() {
        return {
            state: {
                selectedSegment: -1
            },
            props: {},
            setState: function setState(state) {
                if (state.selectedSegment !== this.state.selectedSegment) {
                    this.state.selectedSegment = state.selectedSegment;
                    this.render(this.props);
                }
            },
            getState: function getState() {
                return this.state;
            },
            getSegment: function getSegment(props, x, y) {
                var offset = props.offset;
                var width = props.width;
                var height = props.height;
                var startAngle = 0;
                var endAngle = 0;
                var data = props.data;
                var startAngles = [];
                var endAngles = [];
                for(let i = 0; i < data.length; i++) {
                    var angle = data[i] / 100 * 360;
                    startAngles.push(startAngle);
                    endAngle = startAngle + angle;
                    endAngles.push(endAngle);
                    startAngle = endAngle;
                }
                var map = [];
                var cols = [];
                var radius = width / 2;
                var centerX = width / 2;
                var centerY = width / 2;
                var isSet = false;
            
                var ptX = x - centerX;
                var ptY = y - centerY;
                for(let k = 0; k < startAngles.length; k++) {
                    if (checkPoint(radius, ptX, ptY, startAngles[k], endAngles[k])) {
                        return k;
                    }
                }
                return -1;
            },
            render: function(props) {
                var that = this;
                that.props = props;
                var state = that.state;
                var canvas = document.getElementById(props.selector);
                var onMouseMoveCallback = props.onMouseMoveCallback;
                var onMouseOutCallback = props.onMouseOutCallback;
                var data = props.data;
                var offset = props.offset;
                var width = props.width;
                var height = props.height;
                canvas.addEventListener("mousemove", function(e) {
                    var ptX = e.offsetX;
                    var ptY = e.offsetY;
                    var segment = that.getSegment(props, ptX, ptY);
                    that.setState({
                        selectedSegment: segment
                    });
                    if (onMouseMoveCallback) {
                        onMouseMoveCallback(segment);
                    }
                });
                canvas.addEventListener("mouseout", function() {
                    that.setState({
                        selectedSegment: -1
                    });
                    if (onMouseOutCallback) {
                        onMouseOutCallback();
                    }
                });
                canvas.width = width;
                canvas.height = height;
            
                var ctx = canvas.getContext('2d');
                var startAngle = 0;
                var endAngleDegree = 0;
                var newRadius = 0;
                var radius = (width - offset * 4) / 2;
                var centerX = width / 2;
                var centerY = width / 2;
                var textX = 0;
                var textY = 0;
                var text = "";
                var isShowText = false;
                var midAngleRadian = 0;
                var midAngle =0;
                for(var i = 0; i < data.length; i++) {
                    endAngleDegree = startAngle + data[i] / 100 * 360;
                    if (i === state.selectedSegment) {
                        newRadius = radius + offset;
                        midAngle = (startAngle + endAngleDegree) / 2;
                        midAngleRadian = toRadians(midAngle);
                        centerX = centerX + Math.cos(midAngleRadian) * offset;
                        centerY = centerY + Math.sin(midAngleRadian) * offset;
                        textX = centerX + Math.cos(midAngleRadian) * (radius - 30);
                        textY = centerY + Math.sin(midAngleRadian) * (radius - 30);
                        textX -= 15;
                        textY += 8;
                        text = data[i] + "%";
                        isShowText = true;
                    } else {
                        newRadius = radius;
                        centerX = width / 2;
                        centerY = width / 2;
                        isShowText = false;
                    }
                    drawPieSlice(ctx, centerX, centerY, newRadius, toRadians(startAngle), toRadians(endAngleDegree), colors[i], isShowText, textX, textY, text);
                    startAngle = endAngleDegree;
                }
            }
        }
    },
    render: function() {
        var that = this;
        var allocationSelector = $("#token-allocation");
        var useOfProceedsSelector = $("#use-of-proceeds");
        var allocationPieSelector = "allocation-pie";
        var useOfProceedsPieSelector = "use-of-proceeds-pie";
        var allocationValues = [];
        var useOfProceedsValues = [];
        var allocationDom = "";
        var useOfProceedsDom = "";
        var color = "transparent";
        var pieChartSize = 200;
        var pieChartOffset = Math.ceil(pieChartSize * 0.02);

        for(let i = 0; i < tokenAllocationData.length; i++) {
            allocationValues.push(tokenAllocationData[i].value);
        }
        for(let i = 0; i < useOfProceedsData.length; i++) {
            useOfProceedsValues.push(useOfProceedsData[i].value);
        }

        var allocationPieProps = {
            selector: allocationPieSelector,
            data: allocationValues,
            offset: pieChartOffset,
            width: pieChartSize,
            height: pieChartSize,
            onMouseMoveCallback: function(segment) {
                allocationSelector.find(".row").css("background-color", "transparent");
                allocationSelector.find(".row.item" + segment).css("background-color", colors[segment]);
            },
            onMouseOutCallback: function() {
                allocationSelector.find(".row").css("background-color", "transparent");
            }
        };

        var useOfProceedsPieProps = {
            selector: useOfProceedsPieSelector,
            data: useOfProceedsValues,
            offset: pieChartOffset,
            width: pieChartSize,
            height: pieChartSize,
            onMouseMoveCallback: function(segment) {
                useOfProceedsSelector.find(".row").css("background-color", "transparent");
                useOfProceedsSelector.find(".row.item" + segment).css("background-color", colors[segment]);
            },
            onMouseOutCallback: function() {
                useOfProceedsSelector.find(".row").css("background-color", "transparent");
            }
        };

        if (this.charts.length === 0) {
            this.charts.push(this.getPieChart());
            this.charts.push(this.getPieChart());
        }
        this.charts[0].render(allocationPieProps);
        this.charts[1].render(useOfProceedsPieProps);
    }
};