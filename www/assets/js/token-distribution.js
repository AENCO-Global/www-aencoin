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

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

var colors = ['#b1d349', '#95cb74', '#87c786', '#66c0a5', '#076f7d', '#0d8596', '#15b8ce'];

var getPieChart = function() {
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
            var radius = (width - offset * 2) / 2;
            var centerX = width / 2;
            var centerY = width / 2;
            for(var i = 0; i < data.length; i++) {
                endAngleDegree = startAngle + data[i] / 100 * 360;
                if (i === state.selectedSegment) {
                    newRadius = radius + offset;
                } else {
                    newRadius = radius;
                }
                drawPieSlice(ctx, centerX, centerY, newRadius, toRadians(startAngle), toRadians(endAngleDegree), colors[i]);
                startAngle = endAngleDegree;
            }
        }
    }
};

var tokenAllocationData = [
    {
        label: 'Mining Rewards',
        value: 50
    },
    {
        label: 'Retained by Company and Team',
        value: 21
    },
    {
        label: 'Token Sale (excl. bonus allocations)',
        value: 15
    },
    {
        label: 'Bonus Allocations (on token sale) & Incentive Programs',
        value: 14
    }
];
var useOfProceedsData = [
    {
        label: 'Sponsorship and Financial Solutions Platform form HealthTech Partners',
        value: 40
    },
    {
        label: 'Research, Technology Development and Roll Out, and Collaboration Research',
        value: 30
    },
    {
        label: 'General Working Capital and Infrastructure Setup Capital Requirements',
        value: 24
    },
    {
        label: 'Marketing and Distribution',
        value: 3
    },
    {
        label: 'Legal and Compliance',
        value: 3
    }
];
var charts = [];
var tokenDistribution = {
    getDom: function(percent, text, selector) {
        return `<div class="row ${selector}">
            <div class="col col-2"><h5>${percent}%</h5></div>
            <div class="col"><h5>${text}</h5></div>
        </div>`;
    },
    render: function(props) {
        var that = this;
        that.props = props;
        var state = that.state;
        var allocationSelector = $(props.allocationSelector);
        var allocationData = props.allocationData;
        var useOfProceedsSelector = $(props.useOfProceedsSelector);
        var useOfProceedsData = props.useOfProceedsData;
        var allocationPieSelector = $(props.allocationPieSelector);
        var useOfProceedsPieSelector = $(props.useOfProceedsPieSelector);
        var allocationValues = [];
        var useOfProceedsValues = [];
        var allocationDom = "";
        var useOfProceedsDom = "";
        var color = "transparent";
        var pieChartSize = 290;
        var pieChartOffset = Math.ceil(pieChartSize * 0.05);

        for(let i = 0; i < allocationData.length; i++) {
            allocationDom += that.getDom(allocationData[i].value, allocationData[i].label, "item" + i);
            allocationValues.push(allocationData[i].value);
        }
        allocationSelector.html(allocationDom);
        for(let i = 0; i < useOfProceedsData.length; i++) {
            useOfProceedsDom += that.getDom(useOfProceedsData[i].value, useOfProceedsData[i].label, "item" + i);
            useOfProceedsValues.push(useOfProceedsData[i].value);
        }
        useOfProceedsSelector.html(useOfProceedsDom);

        var allocationPieProps = {
            selector: props.allocationPieSelector,
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
            selector: props.useOfProceedsPieSelector,
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

        if (charts.length === 0) {
            charts.push(getPieChart());
            charts.push(getPieChart());
        }
        charts[0].render(allocationPieProps);
        charts[1].render(useOfProceedsPieProps);
    }
};

function render(width, height) {
    var props = {
        width: width,
        height: height,
        allocationSelector: "#token-allocation",
        allocationData: tokenAllocationData,
        useOfProceedsSelector: "#use-of-proceeds",
        useOfProceedsData: useOfProceedsData,
        allocationPieSelector: "allocation-pie",
        useOfProceedsPieSelector: "use-of-proceeds-pie"
    };
    tokenDistribution.render(props);
}