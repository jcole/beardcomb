

var beardcomb = {},
    hogan = require('hogan.js'),
    fs = require('fs'),
    path = require("path"),
    views = './views';

beardcomb.compile = function(source, options) {
    views = (options.settings.views) ? options.settings.views : views;
    
    if (typeof source == 'string') {
        return function(options) {
            if(!options.locals) options.locals = {};
            if(!options.partials) options.partials = {};
            if (options.body) options.locals.contents = options.body;
            
            var html = hogan.compile(source);
            return html.render(options.locals);
        };
    } else {
        return source;
    } 
};

module.exports = beardcomb;