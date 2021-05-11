var canvas = document.getElementById("myCanvas");
var ctx = document.getElementById("myCanvas").getContext("2d");
var canvasW;
var canvasH;
function init() {
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
    canvasW = canvas.width;
    canvasH = canvas.height;
}
init();
ctx.fillRect(100, 10, 100, 100);
var plotdef = {
    xMin: 0,
    xMax: 100,
    yMin: -10,
    yMax: 10,
    steps: 1000,
    xStart: 0,
    xEnd: 100,
    dotsize: 2,
    colors: ["red", "blue", "green", "black", "orange"]
};
var plottingWidth = plotdef.xEnd - plotdef.xStart;
var stepWidth = plottingWidth / plotdef.steps;
var graphWidth = plotdef.xMax - plotdef.xMin;
var graphHeight = plotdef.yMax - plotdef.yMin;
var datas = [];
// Plots X = 0 onwards
function run() {
    var dN = 0;
    for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
        var d = datas_1[_i];
        var dotcolor = plotdef.colors[dN % plotdef.colors.length];
        ctx.fillStyle = dotcolor;
        for (var i = 0; i < plotdef.steps; i++) {
            var cX = plotdef.xStart + (i * stepWidth);
            var x_pct = (cX - plotdef.xMin) / graphWidth;
            var cY = d[i];
            var y_pct = (cY - plotdef.yMin) / graphHeight;
            var p = {
                x: x_pct * canvasW,
                y: (1 - y_pct) * canvasH
            };
            ctx.fillRect(p.x, p.y, plotdef.dotsize, plotdef.dotsize);
        }
        dN++;
    }
}
function add_func(fx) {
    var plotting = [];
    for (var i = 0; i < plotdef.steps; i++) {
        var cX = plotdef.xStart + (i * stepWidth);
        plotting.push(fx(cX));
    }
    datas.push(plotting);
}
// function parameters
var fp = {
    random_width: 1
};
var plot_funcs = {
    source_true: function (i) { return Math.sin(i); },
    measured: function (i) { return plot_funcs.source_true(i) + ((Math.random() * fp.random_width) - (fp.random_width / 2)); }
};
// Add them all in the end
for (var fname in plot_funcs) {
    add_func(plot_funcs[fname]);
}
run();
