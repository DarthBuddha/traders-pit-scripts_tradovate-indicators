/*********************************
 * Darth Buddha Tradovate Script *
 * *******************************
 * Buddha SMA Bands
 * Build : 25
 *********************************/
/*  Constant  Variables  */
const predef = require("../tools/predef");
const SMA = require("../tools/SMA");
const { du, op, px, min, max } = require("../tools/graphics");
/*  Initialize  Class  */
class buddhaSmaBands {
    init() {
        this.newSma01 = SMA(this.props.period20);
        this.oldSma01 = SMA(this.props.period20);

        this.newSma02 = SMA(this.props.period21);
        this.oldSma02 = SMA(this.props.period21);

        this.newSma03 = SMA(this.props.period50);
        this.oldSma03 = SMA(this.props.period50);

        this.newSma04 = SMA(this.props.period55);
        this.oldSma04 = SMA(this.props.period55);

        this.newSma05 = SMA(this.props.period200);
        this.oldSma05 = SMA(this.props.period200);

        this.newSma06 = SMA(this.props.period233);
        this.oldSma06 = SMA(this.props.period233);

        this.newSma07 = SMA(this.props.period365);
        this.oldSma07 = SMA(this.props.period365);

        this.newSma08 = SMA(this.props.period377);
        this.oldSma08 = SMA(this.props.period377);
    }

    map(d, i, history) {
        const value = d.value();

        if (i < 1) return {};
        const last = history.back(1);

        const oldSma20 = this.oldSma01(last.value());
        const oldSma21 = this.oldSma02(last.value());
        const oldSma50 = this.oldSma03(last.value());
        const oldSma55 = this.oldSma04(last.value());
        const oldSma200 = this.oldSma05(last.value());
        const oldSma233 = this.oldSma06(last.value());
        const oldSma365 = this.oldSma07(last.value());
        const oldSma377 = this.oldSma08(last.value());

        const newSma20 = this.newSma01(d.value());
        const newSma21 = this.newSma02(d.value());
        const newSma50 = this.newSma03(d.value());
        const newSma55 = this.newSma04(d.value());
        const newSma200 = this.newSma05(d.value());
        const newSma233 = this.newSma06(d.value());
        const newSma365 = this.newSma07(d.value());
        const newSma377 = this.newSma08(d.value());

        return {
            sma20: newSma20,
            sma21: newSma21,
            sma50: newSma50,
            sma55: newSma55,
            sma200: newSma200,
            sma233: newSma233,
            sma365: newSma365,
            sma377: newSma377,
            graphics: {
                items: [
                    {
                        tag: "Shapes",
                        key: "sma20x21Shading",
                        primitives: [
                            {
                                tag: "Polygon",
                                points: [
                                    {
                                        x: du(d.index() - 1),
                                        y: du(oldSma21),
                                    },
                                    {
                                        x: du(d.index()),
                                        y: du(newSma21),
                                    },
                                    {
                                        x: du(d.index()),
                                        y: du(newSma20),
                                    },
                                    {
                                        x: du(d.index() - 1),
                                        y: du(oldSma20),
                                    },
                                ],
                            },
                        ],
                        fillStyle: {
                            opacity: this.props.bandOpacity,
                            color:
                                newSma20 > newSma21
                                    ? this.props.sma20x21BandUp
                                    : this.props.sma20x21BandDown,
                        },
                    },
                    {
                        tag: "Shapes",
                        key: "sma50x55Shading",
                        primitives: [
                            {
                                tag: "Polygon",
                                points: [
                                    {
                                        x: du(d.index() - 1),
                                        y: du(oldSma55),
                                    },
                                    {
                                        x: du(d.index()),
                                        y: du(newSma55),
                                    },
                                    {
                                        x: du(d.index()),
                                        y: du(newSma50),
                                    },
                                    {
                                        x: du(d.index() - 1),
                                        y: du(oldSma50),
                                    },
                                ],
                            },
                        ],
                        fillStyle: {
                            opacity: this.props.bandOpacity,
                            color:
                                newSma50 > newSma55
                                    ? this.props.sma50x55BandUp
                                    : this.props.sma50x55BandDown,
                        },
                    },
                    {
                        tag: "Shapes",
                        key: "sma200x233Shading",
                        primitives: [
                            {
                                tag: "Polygon",
                                points: [
                                    {
                                        x: du(d.index() - 1),
                                        y: du(oldSma233),
                                    },
                                    {
                                        x: du(d.index()),
                                        y: du(newSma233),
                                    },
                                    {
                                        x: du(d.index()),
                                        y: du(newSma200),
                                    },
                                    {
                                        x: du(d.index() - 1),
                                        y: du(oldSma200),
                                    },
                                ],
                            },
                        ],
                        fillStyle: {
                            opacity: this.props.bandOpacity,
                            color:
                                newSma200 > newSma233
                                    ? this.props.sma200x233BandUp
                                    : this.props.sma200x233BandDown,
                        },
                    },
                    {
                        tag: "Shapes",
                        key: "sma365x377Shading",
                        primitives: [
                            {
                                tag: "Polygon",
                                points: [
                                    {
                                        x: du(d.index() - 1),
                                        y: du(oldSma377),
                                    },
                                    {
                                        x: du(d.index()),
                                        y: du(newSma377),
                                    },
                                    {
                                        x: du(d.index()),
                                        y: du(newSma365),
                                    },
                                    {
                                        x: du(d.index() - 1),
                                        y: du(oldSma365),
                                    },
                                ],
                            },
                        ],
                        fillStyle: {
                            opacity: this.props.bandOpacity,
                            color:
                                newSma365 > newSma377
                                    ? this.props.sma365x377BandUp
                                    : this.props.sma365x377BandDown,
                        },
                    },
                ],
            },
        };
    }
    filter(d, i) {
        return i > 0 && predef.filters.isNumber(d.sma20);
        return i > 0 && predef.filters.isNumber(d.sma50);
        return i > 0 && predef.filters.isNumber(d.sma200);
        return i > 0 && predef.filters.isNumber(d.sma365);
    }
}
/*  Export  Module  */
module.exports = {
    name: "buddhaSmaBands",
    description: "Buddha SMA Bands",
    calculator: buddhaSmaBands,
    tags: ["Buddha Indicators"],
    params: {
        period20: predef.paramSpecs.period(20),
        period21: predef.paramSpecs.period(21),
        sma20x21BandUp: predef.paramSpecs.color("#ff0000"),
        sma20x21BandDown: predef.paramSpecs.color("#800000"),

        period50: predef.paramSpecs.period(50),
        period55: predef.paramSpecs.period(55),
        sma50x55BandUp: predef.paramSpecs.color("#00FFFF"),
        sma50x55BandDown: predef.paramSpecs.color("#0000FF"),

        period200: predef.paramSpecs.period(200),
        period233: predef.paramSpecs.period(233),
        sma200x233BandUp: predef.paramSpecs.color("#FFFF00"),
        sma200x233BandDown: predef.paramSpecs.color("#FF7F00"),

        period365: predef.paramSpecs.period(365),
        period377: predef.paramSpecs.period(377),
        sma365x377BandUp: predef.paramSpecs.color("#FF00FF"),
        sma365x377BandDown: predef.paramSpecs.color("#800080"),

        bandOpacity: predef.paramSpecs.number(20, 10, 0),
    },
    plots: {
        sma20: { title: "20 SMA" },
        sma21: { title: "21 SMA" },
        sma50: { title: "50 SMA" },
        sma55: { title: "55 SMA" },
        sma200: { title: "200 SMA" },
        sma233: { title: "233 SMA" },
        sma365: { title: "365 SMA" },
        sma377: { title: "377 SMA" },
    },
    schemeStyles: {
        dark: {
            sma20: {
                color: "#FF0000",
                lineStyle: 1,
                lineWidth: 1,
                opacity: 100,
            },
            sma21: {
                color: "#800000",
                lineStyle: 1,
                lineWidth: 1,
                opacity: 100,
            },
            sma50: {
                color: "#00FFFF",
                lineStyle: 1,
                lineWidth: 1,
                opacity: 100,
            },
            sma55: {
                color: "#0000FF",
                lineStyle: 1,
                lineWidth: 1,
                opacity: 100,
            },
            sma200: {
                color: "#FFFF00",
                lineStyle: 1,
                lineWidth: 1,
                opacity: 100,
            },
            sma233: {
                color: "#FF7F00",
                lineStyle: 1,
                lineWidth: 1,
                opacity: 100,
            },
            sma365: {
                color: "#FF00FF",
                lineStyle: 1,
                lineWidth: 1,
                opacity: 100,
            },
            sma377: {
                color: "#800080",
                lineStyle: 1,
                lineWidth: 1,
                opacity: 100,
            },
        },
    },
};
/*  END  CODE  */
