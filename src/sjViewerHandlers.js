'use strict';
(function () {
    var containerDiv = document.getElementById('jsonView');
    var runBtn = document.getElementById('run');
    var textArea = document.getElementById('text');
    var showAllBtn = document.getElementById('showAll');
    var collapseAllBtn = document.getElementById('collapseAll');
    var demoBtn = document.getElementById('runDemo');
    var urlInput = document.getElementById('url');
    var sortBtn = document.getElementById('sort');
    var hideBtn = document.getElementById('togglevis');

    var urlField = document.getElementById('urlField');
    var jsonField = document.getElementById('jsonField');

    hideBtn.addEventListener('click', function () {
        urlField.classList.toggle('hidden');
        jsonField.classList.toggle('hidden');
        this.innerHTML = this.innerHTML === 'Hide inputs'? 'Show inputs' : 'Hide inputs';
    }, false);

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


    function doCollapse(element) {
        var item;
        //detect if it's the object from the dblclick, or the prop/bracket from the single click
        if(element.classList.contains('Array') || element.classList.contains('Object')){
            item = element;
        }else{
            item = element.parentElement;
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

    function getFromUrl(url,success){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                success(xmlhttp.responseText);
            }else if(xmlhttp.readyState === 4){
                alert("Error in url request");
            }
        };
        var query = 'originator=simpleJsonView';
        if(url.indexOf('?') < 0){
            url+= '?' + query;
        }else{
            url+= '&' + query;
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
        xmlhttp.send();
    }

    function renderJson(jsonText){
        containerDiv.innerHTML = sjViewer.render(jsonText);
        var collapsible1 = document.querySelectorAll('.Array > .propName, .Array > .bracket, .Object > .propName, .Object > .bracket');
        var doubleClickCollapse = document.querySelectorAll('.Array, .Object');
        var j;
        for (j = 0; j < collapsible1.length; ++j) {
            collapsible1[j].addEventListener('click',function(e){
                e.stopPropagation();
                doCollapse(this);
            }, false);
        }
        for (j = 0; j < doubleClickCollapse.length; ++j) {
            doubleClickCollapse[j].addEventListener('dblclick', function(e){
                e.stopPropagation();
                if(!this.classList.contains('collapse')){ //ignore if opened, so you can click on text
                    return;
                }
                doCollapse(this);
            }, false);
        }
    }

    runBtn.addEventListener('click', function(){
        var url = urlInput.value;
        if(url !== ''){
            getFromUrl(url,function(jsonText){
                textArea.value = jsonText;
                renderJson(jsonText);
            });
        }else{
            renderJson(textArea.value);
        }

    }, false);

    demoBtn.addEventListener('click',function(){
        textArea.value = DEMO_CODE;
        runBtn.click();
    },false);


    sortBtn.addEventListener('click', function () {
        var mainObject = document.querySelector('#jsonView > ul, #jsonView ol');
        if(!mainObject){return;}
        var pre = [];
        var post = [];
        var obj = null;

        if(!this.dataset.state || this.dataset.state === 'desc'){
            this.dataset.state = 'asc';
        }else{
            this.dataset.state = 'desc'
        }

        pre.push(mainObject);
        while(pre.length > 0){
            obj = pre.pop();

            post.push(obj);

            if(obj.children){
                for(var j = 0; j < obj.children.length; ++j){
                    pre.push(obj.children[j]);
                }
            }
        }

        while (post.length > 0) {
            var ele = post.pop();
            if(ele.tagName === 'UL'){
                sortList(ele,this.dataset.state);
            }
        }

        function sortList(ul,order){
            var children = convertToArray(ul.children);
            if(order === 'asc'){
                children.sort(function(li1,li2){
                    return li1.children[0].innerHTML.toLowerCase().localeCompare(li2.children[0].innerHTML.toLowerCase());
                });
            }else{
                children.sort(function(li1,li2){
                    return li2.children[0].innerHTML.toLowerCase().localeCompare(li1.children[0].innerHTML.toLowerCase());
                });
            }

            //remove_children
            while(ul.firstChild){
                ul.removeChild(ul.firstChild);
            }

            //add sorted children
            children.forEach(function(child){
                ul.appendChild(child);
            });
        }

        function convertToArray(collection){
            var arr = [];
            if(collection){
                for(var k = 0; k < collection.length; ++k){
                    arr.push(collection[k]);
                }
            }
            return arr;
        }
    }, false);



})();

