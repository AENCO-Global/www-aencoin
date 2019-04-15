function toRadians(degree) {
    return degree * Math.PI / 180;
}

function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

function onMouseMove(e) {
    var ptX = e.offsetX;
    var ptY = e.offsetY;
    var segment = getSegment(ptX, ptY);
    createPieChart(segment);
}

function onMouseOut(e) {
    createPieChart(-1);
}

function getSegment(x, y) {
    var offset = 10;
    var width = 500;
    var height = 500;
    var startAngle = 0;
    var endAngle = 0;
    var data = [15, 22, 15, 12, 12, 4, 20];
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
}

function createPieChart(selectedIndex) {

    var id = 'canvas';
    var options = {
        data: [15, 22, 15, 12, 12, 4, 20],
        colors: ['#b1d349', '#95cb74', '#87c786', '#66c0a5', '#076f7d', '#0d8596', '#15b8ce']
    };

    var offset = 10;
    var width = 500;
    var height = 500;
    var data = options.data;
    var color = options.colors;
    var canvas = document.getElementById(id);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseout", onMouseOut);
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
        if (i === selectedIndex) {
            newRadius = radius + offset;
        } else {
            newRadius = radius;
        }
        drawPieSlice(ctx, centerX, centerY, newRadius, toRadians(startAngle), toRadians(endAngleDegree), color[i]);
        startAngle = endAngleDegree;
    }
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
