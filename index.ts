let canvas = (document.getElementById("myCanvas") as HTMLCanvasElement);
let ctx = (document.getElementById("myCanvas") as HTMLCanvasElement).getContext("2d");

var canvasW;
var canvasH;

function init() {
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
    canvasW = canvas.width;
    canvasH = canvas.height;

}
init();

ctx.fillRect(100,10,100,100);

let plotdef = {
    xMin: 0,
    xMax: 50,
    yMin: -3,
    yMax: 3,

    steps: 3000,
    xStart: 0,
    xEnd: 50,

    dotsize: 2,
    colors: ["red", "blue", "green", "black", "orange"],
    enabled: [1, 0, 1]
}



let plottingWidth = plotdef.xEnd - plotdef.xStart;
let stepWidth = plottingWidth / plotdef.steps;

let graphWidth = plotdef.xMax - plotdef.xMin;
let graphHeight = plotdef.yMax - plotdef.yMin;
let datas : number[][] = [];

// Plots X = 0 onwards
function run() {
    let dN = 0;
    for (let d of datas) {

        let dotcolor = plotdef.colors[dN % plotdef.colors.length];
        ctx.fillStyle = dotcolor;
        for (let i = 0; i < plotdef.steps; i++) {
            let cX = plotdef.xStart + (i * stepWidth);
            let x_pct = (cX - plotdef.xMin) / graphWidth;
            let cY = d[i];
            let y_pct = (cY - plotdef.yMin) / graphHeight;

            let p = {
                x: x_pct * canvasW,
                y: (1 - y_pct) * canvasH
            }
            if (plotdef.enabled[dN % plotdef.enabled.length]) {
                ctx.fillRect(p.x, p.y, plotdef.dotsize, plotdef.dotsize);
            }

        }
        dN++;
    }
}


function add_func(fx: (a:number)=>number) {
    let plotting = [];
    for (let i = 0; i < plotdef.steps; i++) {
        let cX = plotdef.xStart + (i * stepWidth);
        plotting.push(fx(cX));
    }
    datas.push(plotting);
}

function xAt(stepN: number):number {
    return plotdef.xStart + (stepN * stepWidth);
}
function iAt(xVal: number):number {
    return (xVal - plotdef.xStart) / stepWidth;
}








type plottable = (a:number)=>number;


// function parameters
let fp = {
    random_width: 1,
    runningavg_width: 5
}



// Easily defined funcs to plot
// The input is NOT the array index, it is arbitrary float 
let plot_funcs : {[name:string]:plottable} = {

    source_true: (i)=>Math.sin(i),

    sensor: (i)=> plot_funcs.source_true(i) + ((Math.random() * fp.random_width) - (fp.random_width / 2)),

}

// Add them all in the end
for (let fname in plot_funcs) {
    add_func(plot_funcs[fname]);
}



let running_avg_data = [];
for (let i = 0; i < plotdef.steps; i++) {

    if (!(i < plotdef.steps - fp.runningavg_width)) { running_avg_data.push(0); continue; }

    let sum = 0;
    for (let i2 = i; i2 < i + fp.runningavg_width; i2++) {
        sum+=datas[1][i2];
    }
    running_avg_data.push(sum/fp.runningavg_width);
}
datas.push(running_avg_data);




run();


