/*********************************
 * Darth Buddha Tradovate Script *
 * *******************************
 * Buddha STOCH RSI
 * Build : 25
*********************************/
/*  Constant  Variables  */
const predef = require("./tools/predef");
const meta = require("./tools/meta");
const MovingHigh = require("./tools/MovingHigh");
const MovingLow = require("./tools/MovingLow");
const SMA = require("./tools/SMA");
const EMA = require('./tools/EMA');
const WMA = require('./tools/WMA');
const MMA = require('./tools/MMA');

const ma = {
    sma: SMA,
    ema: EMA,
    wma: WMA,
    mma: MMA
};
/*  Initialize  Class  */
class buddhaStochRsi {
    init() {
        this.highest = MovingHigh(this.props.kPeriod);
        this.lowest = MovingLow(this.props.kPeriod);
        this.kMA = ma[this.props.type](this.props.smoothPeriod);
        this.dMA = ma[this.props.type](this.props.dPeriod);
    }

    map(d) {
        const high = d.high();
        const low = d.low();
        const close = d.close();
        const hh = this.highest(high);
        const ll = this.lowest(low);
        const c1 = close - ll;
        const c2 = hh - ll;
        const fastK = c2 !== 0 ? c1 / c2 * 100 : 0;
        const K = this.kMA(fastK);
        const D = this.dMA(K);
        return { 
            K, 
            D, 
            overBought: this.props.overBought,
            overSold: this.props.overSold,
            lineTop: this.props.lineTop,
            lineBottom: this.props.lineBottom,
        };
    }

    filter(d) {
        return predef.filters.isNumber(d.D);
    }
}
/*  Export  Module  */
module.exports = {
    name: "buddhaStochRsi",
    title: "Buddha Stoch RSI",
    description: "Buddha Stoch RSI",
    calculator: buddhaStochRsi,
    tags: ['Buddha Indicators'],
    params: {
        kPeriod: predef.paramSpecs.period(14),
        dPeriod: predef.paramSpecs.period(3),
        smoothPeriod: predef.paramSpecs.period(1),
        overBought: predef.paramSpecs.period(80),
        overSold: predef.paramSpecs.period(20),
        lineTop: predef.paramSpecs.period(110),
        lineBottom: predef.paramSpecs.period(-10),
        type: predef.paramSpecs.enum({
            sma: 'Simple',
            ema: 'Exponential',
            wma: 'Weighted',
            mma: 'Modified'
        }, 'sma')
    },
    validate(obj) {
        if (obj.period < 1) {
            return meta.error("kPeriod", "K Period should be a positive number");
        }
        if (obj.period < 1) {
            return meta.error("dPeriod", "D Period should be a positive number");
        }
        if (obj.smoothPeriod < 2) {
            return meta.error("smoothPeriod", "Smooth period should be greater than 1");
        }
        return undefined;
    },
    inputType: meta.InputType.BARS,
    areaChoice: meta.AreaChoice.NEW,
    plots: {
        K: { title: "%K" },
        D: { title: "%D" },
        overBought: { title: "Over Bought" },
        overSold: { title: "Over Sold" },
        lineTop: { title: "Top Line" },
        lineBottom: { title: "Bottom Line"},
    },
    schemeStyles: {
        dark: {
            K: predef.styles.plot({
                color: "green",
                lineWidth: 2
            }),
            D: predef.styles.plot({
                color: "red",
                lineWidth: 1
            }),
            overBought: predef.styles.plot({
                color: "white",
                lineStyle: 3
            }),
            overSold: predef.styles.plot({
                color: "white",
                lineStyle: 3
            }),
            lineTop: predef.styles.plot({
                color: "#000000",
                lineStyle: 1
            }),
            lineBottom: predef.styles.plot({
                color: "#000000",
                lineStyle: 1
            })
        }
    }
};
/*  END  CODE  */