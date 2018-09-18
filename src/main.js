$(document).ready(function () {
    'use strict';
    // console.log('main.js loaded');
    paper.install(window);
    paper.setup(document.getElementById('mainCanvas'));
    var c = Shape.Circle(200, 200, 50);
    c.fillColor = 'green';
    paper.view.draw();
})