/*********************************
 * Darth Buddha Tradovate Script *
 * *******************************
 * Buddha Squeeze
 * Build : 25
 *********************************/
/*  Constant  Variables  */
const predef = require("../tools/predef");
const meta = require("../tools/meta");
const EMA = require("../tools/EMA");
const SMA = require("../tools/SMA");
const trueRange = require("../tools/trueRange");
const StdDev = require("../tools/StdDev");
/*  Initialize  Class  */
class buddhaSqueeze {
    init() {
        this.prices = [];
        this.closeEMA = EMA(this.props.period);
        this.closeSMA = SMA(this.props.period);
        this.atrSMA = SMA(this.props.period);
        this.stdDev = StdDev(this.props.period);
    }
    map(d, i, history) {
        const period = this.props.period;
        if (this.prices.length === period) {
            this.prices.shift();
        }

        const close = d.close();
        const high = d.high();
        const low = d.low();

        // Keltner Channel
        const closeSMA = this.closeSMA(close);
        const atr =
            this.props.kcMultiplier *
            this.atrSMA(trueRange(d, history.prior()));
        const kcUpper = closeSMA + atr;
        const kcLower = closeSMA - atr;

        // Bollinger Band
        const stdev = this.stdDev(close);
        const avg = this.stdDev.avg();
        const halfWidth = stdev * this.props.bbMultiplier;
        const bbUpper = avg + halfWidth;
        const bbLower = avg - halfWidth;

        const isSqueeze = bbUpper < kcUpper && bbLower > kcLower;

        const prices = {
            close,
            high,
            low,
        };
        this.prices.push(prices);

        const { highest, lowest } = this.prices.reduce(
            (result, price) => {
                if (price.high > result.highest) {
                    result.highest = price.high;
                }
                if (price.low < result.lowest) {
                    result.lowest = price.low;
                }
                return result;
            },
            { highest: 0, lowest: Infinity }
        );

        const closeEMA = this.closeEMA(close);
        const value = close - ((highest + lowest) / 2 + closeEMA) / 2;
        prices.value = value;

        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumXX = 0;
        const n = this.prices.length;
        this.prices.forEach((price, i) => {
            const x = i + 1;
            sumY += price.value;
            sumX += x;
            sumXY += price.value * x;
            sumXX += x * x;
        });
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        const regression = intercept + slope * n;
        const Squeeze = close;
        const last = this.last || regression;
        this.last = regression;

        const {
            squeezeOnColor,
            squeezeOffColor,
            upAdvanceColor,
            upDeclineColor,
            downAdvanceColor,
            downDeclineColor,
            isSqueezeColor,
            colorBars,
        } = this.props;

        const squeezeColor = isSqueeze ? squeezeOnColor : squeezeOffColor;
        const histogramColor =
            regression > 0
                ? regression > last
                    ? upAdvanceColor
                    : upDeclineColor
                : regression < last
                ? downDeclineColor
                : downAdvanceColor;
        const candlestickColor = isSqueeze ? isSqueezeColor : histogramColor;
        const candlestick = colorBars
            ? {
                  color: candlestickColor,
              }
            : undefined;

        return {
            squeeze: 0,
            value: regression,
            style: {
                value: {
                    color: histogramColor,
                },
                squeeze: {
                    color: squeezeColor,
                },
            },
            candlestick,
        };
    }
}
/*  Export  Module  */
module.exports = {
    name: "buddhaSqueeze",
    description: "Buddha Squeeze",
    calculator: buddhaSqueeze,
    tags: ["Buddha Indicators"],
    params: {
        period: predef.paramSpecs.period(21),
        kcMultiplier: predef.paramSpecs.number(1.5, 0.1),
        bbMultiplier: predef.paramSpecs.number(2.0, 0.1),
        colorBars: predef.paramSpecs.bool(false),
        squeezeOffColor: predef.paramSpecs.color("#00000000"),
        squeezeOnColor: predef.paramSpecs.color("#F8E71C"),
        upAdvanceColor: predef.paramSpecs.color("#417505"),
        upDeclineColor: predef.paramSpecs.color("#D0021B"),
        downAdvanceColor: predef.paramSpecs.color("#7ED321"),
        downDeclineColor: predef.paramSpecs.color("#780000"),
        isSqueezeColor: predef.paramSpecs.color("#F8E71C"),
    },
    plots: {},
    plotter: [{ type: "histogram" }, { type: "dots", field: "squeeze" }],
    inputType: meta.InputType.BARS,
    areaChoice: meta.AreaChoice.NEW,
    schemeStyles: {
        dark: {
            value: predef.styles.plot({ color: "#00000000", lineWidth: 0 }),
            squeeze: predef.styles.plot({ color: "#F8E71C", lineWidth: 1 }),
        },
    },
};
/*  END  CODE  */
