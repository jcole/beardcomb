var express = require('express'),
    app = express.createServer(),
    beardcomb = require('../lib/beardcomb');

//express config
app.set('view engine', 'html')
app.set("views", __dirname + '/views');
app.register(".html", beardcomb);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index', {
        locals: {
            title: 'Beardcomb'
        }
    });    
});

app.listen(process.env.C9_PORT, '0.0.0.0');