var sjViewer = require('../src/sjViewer.js');
var demo = require('../src/demoCode.js').demoCode;

var html = sjViewer.render(demo);
console.log(html);