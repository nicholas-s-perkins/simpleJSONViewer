# Simple JSON Viewer
A simple JSON viewer for the browser. No dependencies other than DOM/JSON.  sjViewer.js should work on IE8+, example.html works on IE10+.  

##Example Page
http://nicholas-s-perkins.github.io/simpleJSONViewer/src/example.html

##How to use
At its core, sjViewer.js is a basic library that converts JSON into an HTML representation.  You can include sjViewer.css for a basic styling, or simply use the example.html as a basis of your viewer.

sjViewer.js adds a global object `sjViewer`, and it has one method `sjViewer.render()`.
```javascript
var html = sjViewer.render('{"wat":123}');
```

##Style
sjViewer.css gives a good idea of how to structure styles if you want to change something.  All properties are represented as an `<li>` element and have a class corresponding to their type (Object, Array, Boolean, Number, String, null).  Property names are spans with the class "propName" and values are a span with the class "value".  


##Non-browser platforms
For those interested, sjViewer.js is very simple and can render HTML in both Node.js and Nashorn.  The demos are included in the repo.


