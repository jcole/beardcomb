var beardcomb = {},
    hogan = require('hogan.js'),
    file = require('file'),
    fs = require('fs'),
    path = require("path"),
    views = './views';

beardcomb.getTemplates = function(dir, callback) {
    var results = {};
    file.walkSync(dir, function(dirPath, dirs, files) {
        for(var inc in files) {
            fileName = files[inc].split('.')[0];
            viewDir = dirPath.replace(dir, '');
            fileHandle = [viewDir, fileName].join('/');
            fileHandle = fileHandle.replace(/^\//, '');
            results[fileHandle] = dirPath + '/' + files[inc];
        }
    });
    callback(results);
};

beardcomb.compile = function(source, options) {
    views = (options.settings.views) ? options.settings.views : views;
    var templates = {};
    
    beardcomb.getTemplates(views, function(res) {
        templates = res;
    });
    
    if (typeof source == 'string') {
        return function(options) {
            var rgx = new RegExp("{{([>-])\\s?(.+?)\\1?}}+", "g"), //updated to support white spaces
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
                        if (templates[part[2]] && path.existsSync(templates[part[2]])) {
                            var partialContent = fs.readFileSync(templates[part[2]], 'utf-8');
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