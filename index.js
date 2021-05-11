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
    yMin: -100,
    yMax: 100,
    steps: 1000,
    xStart: 0,
    xEnd: 100
};
var plottingWidth = plotdef.xEnd - plotdef.xStart;
var stepWidth = plottingWidth / plotdef.steps;
var graphWidth = plotdef.xMax - plotdef.xMin;
var graphHeight = plotdef.yMax - plotdef.yMin;
var datas = [];
// Plots X = 0 onwards
function run() {
    for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
        var d = datas_1[_i];
        for (var i = 0; i < plotdef.steps; i++) {
            var cX = plotdef.xStart + (i * stepWidth);
            var x_pct = (cX - plotdef.xMin) / graphWidth;
            var cY = d[i];
            var y_pct = (cY - plotdef.yMin) / graphHeight;
            var p = {
                x: x_pct * canvasW,
                y: (1 - y_pct) * canvasH
            };
            ctx.fillRect(p.x, p.y, 1, 1);
        }
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
add_func(function (a) {
    return 10 * Math.sin(a);
});
run();
