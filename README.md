#Beardcomb v0.1.0#

Hogan.js adaptor for Express.

##License##

The MIT License (MIT)
Copyright (c) 2012 Stephane P. Pericat

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

##Installation##

    git clone git://github.com/stephanepericat/beardcomb.git
    cd beardcomb/
    npm install
    
###Via NPM###

    npm install beardcomb
    
##How to use##

    var express = require('express'),
        app = express.createServer(),
        beardcomb = require('beardcomb');
    
    //express config
    app.set('view engine', 'html')
    app.set("views", __dirname + '/views');
    app.register(".html", beardcomb);
    app.use(express.static(__dirname + '/public'));

    app.get('/', function(req, res) {
        res.render('index', {
            locals: {
                title: 'Beardcomb'
            },
            partials: {
                footer: '<p align="center">Powered by {{title}}</p>'
            }
        });    
    });

    app.listen(8080);

##Features##

- layout enabled: create a file called 'layout.html' and add the tag {{{contents}}}, it will parse the view contents into it
- partials can be passed either as html code as seen above, or as a template file (in the views folder)

##Demo##

    node demo/app.js
