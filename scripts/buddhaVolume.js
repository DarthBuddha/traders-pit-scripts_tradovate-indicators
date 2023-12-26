/*********************************
 * Darth Buddha Tradovate Script *
 * *******************************
 * Buddha Volume
 * Build : 25
*********************************/
/*  Constant  Variables  */
const predef = require("../tools/predef");
const meta = require("../tools/meta");
const p = require("../tools/plotting");
const SMA = require("../tools/SMA");

const defaultBearColor      = "#D0021B";
const defaultBullColor      = "#417505";
const defaultVolAvgColor    = "#00FFFF";
const defaultVolAvgPeriod   = 21;
const defaultLineWidthPx    = 3;
/*  Initialize  Class  */
class buddhaVolume {
    init() {
        this.smaAlgo = SMA(this.props.volAvgPeriod);
    }

    map(d) {
        const volume = d.volume();
        const close = d.close();
        const high = d.high();
        const low = d.low();

        const range = high - low;
        const bulls = Math.round(volume * (close - low) / range);
        const bears = Math.round(volume * (high - close) / range);

        // use bid/offer volumes
        //const bulls = d.offerVolume();
        //const bears = d.bidVolume();

        return {
            volume: volume,
            bears: bears,
            bulls: bulls,
            volAvg: this.smaAlgo(volume)
        };
    }
}
/*  Export  Module  */
module.exports = {
    name: "buddhaVolume",
    description: "Buddha Volume",
    calculator: buddhaVolume,
    tags: ["Buddha Indicators"],
    inputType: meta.InputType.BARS,
    areaChoice: meta.AreaChoice.NEW,
    params: {
        volAvgPeriod: predef.paramSpecs.period(defaultVolAvgPeriod),
    },
    plots : {
        volume: {displayOnly:true},
        bears: 'bears',
        bulls: 'bulls',
        volAvg: {title:'VolAvg'},

    },
    plotter: [
        {
            type:'histogram',
            fields: ['volume', 'bears','bulls']
        },
        predef.plotters.singleline("volAvg")
    ],
    schemeStyles: {
        dark: {
            volume: predef.styles.plot({
                color: "#4A4A4A"
            }),
            bears: {color: defaultBearColor},
            bulls: {color: defaultBullColor},
            volAvg: predef.styles.plot({
                color: defaultVolAvgColor,
                lineWidth: 3
            })
        }
    },
};
/*  END  CODE  */
