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
    xMax: 100,
    yMin: -10,
    yMax: 10,

    steps: 1000,
    xStart: 0,
    xEnd: 100,

    dotsize: 2,
    colors: ["red", "blue", "green", "black", "orange"]

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
            
            ctx.fillRect(p.x, p.y, plotdef.dotsize, plotdef.dotsize);

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

type plottable = (a:number)=>number;


// function parameters
let fp = {
    random_width: 1 
}

let plot_funcs : {[name:string]:plottable} = {

    source_true: (i)=>Math.sin(i),

    measured: (i)=> plot_funcs.source_true(i) + ((Math.random() * fp.random_width) - (fp.random_width / 2)),

}


// Add them all in the end
for (let fname in plot_funcs) {
    add_func(plot_funcs[fname]);
}


run();



