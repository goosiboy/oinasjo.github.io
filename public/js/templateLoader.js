'use strict';

/**
 * A simple custom-made template loader 
 */
let TemplateLoader = {
    initApp: function() {
        let args = arguments;
        let htmlCollection = document.getElementsByClassName("grid");
        let gridArray = [].slice.call(htmlCollection);
        document.querySelectorAll("*").forEach(function(node) {
            if(TemplateLoader.compare(args, node)) {
                TemplateLoader.loadElementClass(node.className);
            }
        });
    },

    compare: function(arr, el) {
        let flag = false;
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] === el.className) {
                flag = true;
                break;
            }
        }
        return flag;
    },

    loadElementId: function(content) {
        let fileLocation = "./html/templates/"+content+".html";
        let elementId = "#"+content;
        $(elementId).load(fileLocation, elementId);
    },

    loadElementClass: function(content) {
        let fileLocation = "./html/templates/"+content+".html";
        let elementId = "."+content;
        $(elementId).load(fileLocation, elementId);
    }
};

