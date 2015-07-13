'use strict';
var sjViewer;
(function(){
    /** The generic way to detect types >_>, returns Title-case versions of type names, and lowercase of null/undefined */
    function typeOf(obj){
        if(obj == null){//fix for IE not handling nulls right
            return String(obj);
        }else{
            return Object.prototype.toString.call(obj)
                .match(/^\[object (\w+)\]$/)[1];
        }
    }

    function makePrimitive(primitive,type){
        var html='';
        if(type === 'String'){
            primitive = '"'+primitive+'"';
        }
        html+= '<span class="value">'+primitive+'</span>';

        return html;
    }


    function makeObject(obj){
        var html = '<span class="lBracket bracket">{</span><ul>';

        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
                var type = typeOf(obj[prop]);
                html+='<li class="'+type+'">';
                html+='<span class="propName">'+prop+': </span>';
                html+= makeHtml(obj[prop]);
                html+='</li>';
            }
        }
        html+= '</ul><span class="rBracket bracket">}</span>';

        return html;
    }

    function makeArray(array){
        var html = '<span class="lBracket bracket">[</span><ol>';
        for(var i = 0; i< array.length; ++i){
            var type = typeOf(array[i]);
            html+='<li class="'+type+'">';
            html+= makeHtml(array[i]);
            html+='</li>';
        }
        html+= '</ol><span class="rBracket bracket">]</span>';

        return html;
    }

    function makeHtml(obj){
        var html = '';
        var type = typeOf(obj);
        switch(type){
            case 'String':case 'Number':case 'Boolean':case 'null': case 'undefined':
                html += makePrimitive(obj,type);
                break;
            case 'Array':
                html+= makeArray(obj);
                break;
            case 'Object':
                html+= makeObject(obj);
                break;
            default :
                console.log(obj);alert(obj);
        }

        return html;

    }

    sjViewer = {
        /** @returns {String} the HTML generated from the JSON*/
        render: function(jsonString) {
            try{
                var obj = JSON.parse(jsonString);
                return makeHtml(obj);

            }catch(e){
                return '<span style="color:red">'+e+'</span>';
            }

        }
    };

    //commonjs module support
    if(typeof exports !== 'undefined'){
        exports.render = sjViewer.render;
    }
})();



