'use strict';

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
    updateValue: function() {
        var now = Date.now();
        for(let i = 0; i < values.length; i++) {
            let dateTimeBefore = Date.parse(values[i].dateTimeBefore);
            if(now > dateTimeBefore) {
                //SET VALUE
                const softcapPercent = `${values[i].softcap}%`;
                const hardcapPercent = `${values[i].hardcap}%`;
                $(".softcap-info .txt-current-cap").html(softcapPercent);
                $(".softcap-info .txt-current-cap").css({"left": `calc(${softcapPercent} - 7%)`});
                $(".softcap-info .value-bar").css({"width":softcapPercent});
                $(".softcap-info .value-indicator").css({"width":softcapPercent});
                $(".hardcap-info .txt-current-cap").html(hardcapPercent);
                $(".hardcap-info .txt-current-cap").css({"left": `calc(${hardcapPercent} - 7%)`});
                $(".hardcap-info .value-bar").css({"width":hardcapPercent});
                $(".hardcap-info .value-indicator").css({"width":hardcapPercent});
                return;
            }
        }
    }
};

module.exports = cap;