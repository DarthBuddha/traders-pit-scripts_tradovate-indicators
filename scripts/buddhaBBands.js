/**********************************************************************
 *                    Darth Buddha Tradovate Script                   *
 * ****************************************************************** *
 * Name    : Buddha BBands                                            *
 * Version : 01.19.2024                                               *
 ******************************************************************** */
/* ----------------------- Constant  Variables ---------------------- */
const meta = require("./tools/meta");
const predef = require("./tools/predef");
const StdDev = require("./tools/StdDev");
/* --------------------------- START CODE --------------------------- */
class buddhaBBands {
    init() {
        this.stdDev = StdDev(this.props.period);
    }

    map(d) {
        const stdev = this.stdDev(d.value());
        const avg = this.stdDev.avg();
        const halfWidth = stdev * 2;
        const lowerBand = avg - halfWidth;
        return {
            upper: avg + halfWidth,
            middle: avg,
            lower: lowerBand
        };
    }

    filter(d, i) {
        return i > 0 && predef.filters.isNumber(d.upper);
    }
}
/* -------------------------- Module Export ------------------------- */
module.exports = {
    name: "buddhaBBands",
    description: "Buddha Bollinger Bands",
    calculator: buddhaBBands,
    tags: ["Buddha Indicators"],
    params: {
        period: predef.paramSpecs.period(21)
    },
    plots: {
        upper: { title: "BBand.U" },
        lower: { title: "BBand.L" }
    },
    schemeStyles: {
        dark: {
            upper: predef.styles.plot({
                color: "#FFFFFF7B",
                lineStyle: 3,
                lineWidth: 1,
                opacity: 60
            }),
            lower: predef.styles.plot({
                color: "#FFFFFF7B",
                lineStyle: 3,
                lineWidth: 1,
                opacity: 60
            })
        }
    }
};
/* ---------------------------- END CODE ---------------------------- */
