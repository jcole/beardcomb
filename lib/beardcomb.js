var beardcomb = {},
    hogan = require('hogan.js'),
    fs = require('fs'),
    path = require("path"),
    views = './views';

beardcomb.compile = function(source, options) {
    views = (options.settings.views) ? options.settings.views : views;
    
    if (typeof source == 'string') {
        return function(options) {
            var rgx = new RegExp("{{([>-])([^\\/#\\^]+?)\\1?}}+", "g"),
                lines = source.split('\n');
            
            if (!options.locals) options.locals = {};
            if (options.body) options.locals.contents = options.body;
            
            if (!options.partials) options.partials = {};
            
            for (var pname in options.partials) {
                options.partials[pname] = hogan.compile(options.partials[pname]);  
            }
            
            for(var nbr = 0; nbr < lines.length; nbr++) {
                var part = rgx.exec(lines[nbr]);
                if (part !== null) {
                    if (part[1] == '>' && !options.partials[part[2]]) {
                        var filePath = views + '/' + part[2] + (options.extension || '.html');
                        if (path.existsSync(filePath)) {
                            var partialContent = fs.readFileSync(filePath, 'utf-8');
                            options.partials[part[2]] = hogan.compile(partialContent);
                        }
                    }
                }
            }
            
            var html = hogan.compile(source);
            return html.render(options.locals, options.partials);
        };
    } else {
        return source;
    } 
};

module.exports = beardcomb;