$(document).ready(function () {
    'use strict';
    // console.log('main.js loaded');
    paper.install(window);
    paper.setup(document.getElementById('mainCanvas'));
    var c;
    for (let x = 25; x < 400; x += 50) {
        for (let y = 25; y < 400; y += 50) {
            c = Shape.Circle(x, y, 20);
            c.fillColor = 'green';
        }
    }
})