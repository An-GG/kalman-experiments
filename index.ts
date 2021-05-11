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
    yMin: -100,
    yMax: 100,

    steps: 1000,
    xStart: 0,
    xEnd: 100
}


let plottingWidth = plotdef.xEnd - plotdef.xStart;
let stepWidth = plottingWidth / plotdef.steps;

let graphWidth = plotdef.xMax - plotdef.xMin;
let graphHeight = plotdef.yMax - plotdef.yMin;
let datas : number[][] = [];

// Plots X = 0 onwards
function run() {
    for (let d of datas) {
        for (let i = 0; i < plotdef.steps; i++) {
            let cX = plotdef.xStart + (i * stepWidth);
            let x_pct = (cX - plotdef.xMin) / graphWidth;
            let cY = d[i];
            let y_pct = (cY - plotdef.yMin) / graphHeight;

            let p = {
                x: x_pct * canvasW,
                y: (1 - y_pct) * canvasH
            }
            
            ctx.fillRect(p.x, p.y, 1, 1);

        }
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



add_func((a:number) => {
    return 10*Math.sin(a);
});


run();



