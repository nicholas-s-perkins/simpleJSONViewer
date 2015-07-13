'use strict';
(function () {
    var containerDiv = document.getElementById('jsonView');
    var runBtn = document.getElementById('run');
    var textArea = document.getElementById('text');
    var showAllBtn = document.getElementById('showAll');
    var collapseAllBtn = document.getElementById('collapseAll');
    var demoBtn = document.getElementById('runDemo');


    showAllBtn.addEventListener('click', function () {
        var hidden = document.querySelectorAll('.collapse');
        for (var k = 0; k < hidden.length; ++k) {
            hidden[k].classList.remove('collapse');
        }

    }, false);

    collapseAllBtn.addEventListener('click', function () {
        var collapsed = document.querySelectorAll('.Array,.Object');
        for (var j = 0; j < collapsed.length; ++j) {
            collapsed[j].classList.add('collapse');
        }
    }, false);


    function doCollapse(e) {
        e.stopPropagation();
        var item;
        //detect if it's the object from the dblclick, or the prop/bracket from the single click
        if(this.classList.contains('Array') || this.classList.contains('Object')){
            item = this;
        }else{
            item = this.parentElement;
        }

        if(item.classList.contains('collapse')){
            //if child is opened, open all of the parents as well
            while(item.id !== 'jsonView'){
                if(item.tagName === 'LI'){
                    item.classList.remove('collapse');
                }
                item = item.parentElement;
            }
        }else{
            //if parent is collapsed, collapse all of the children as well
            var childQ = [];
            childQ.push(item);
            while(childQ.length !== 0){
                var node = childQ.shift();
                var children = node.childNodes;
                for(var i = 0; i < children.length; ++i){
                    if(children[i].tagName === 'UL' || children[i].tagName === 'OL' || children[i].tagName === 'LI'){
                        childQ.push(children[i]);
                    }
                }
                if(node.classList.contains('Array') || node.classList.contains('Object')){
                    node.classList.add('collapse');
                }
            }
        }


    }


    runBtn.addEventListener('click', function(){
        containerDiv.innerHTML = sjViewer.render(textArea.value);
        var collapsible1 = document.querySelectorAll('.Array > .propName, .Array > .bracket, .Object > .propName, .Object > .bracket');
        var doubleClickCollapse = document.querySelectorAll('.Array, .Object');
        var j;
        for (j = 0; j < collapsible1.length; ++j) {
            collapsible1[j].addEventListener('click', doCollapse, false);
        }
        for (j = 0; j < doubleClickCollapse.length; ++j) {
            doubleClickCollapse[j].addEventListener('dblclick', doCollapse, false);
        }
    }, false);

    demoBtn.addEventListener('click',function(){
        textArea.value = DEMO_CODE;
        runBtn.click();
    },false);


})();

