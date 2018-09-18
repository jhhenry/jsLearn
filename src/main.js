$(document).ready(function () {
    'use strict';
    // console.log('main.js loaded');
    paper.install(window);
    paper.setup(document.getElementById('mainCanvas'));

    // let tool = new Tool();
    // tool.onMouseDown = function(event) {
    //     let c = Shape.Circle(event.point.x, event.point.y, 20)
    //     c.fillColor = 'green'
    // }

    var c = Shape.Circle(200, 200, 80);
    c.fillColor = 'black';
    var text = new PointText(200, 200);
    text.justification = 'center';
    text.fillColor = 'white';
    text.fontSize = 20;
    text.content = 'hello world';
})