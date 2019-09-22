var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var validator = require('validator');

const BitlyClient = require('bitly').BitlyClient;
const bitly = new BitlyClient('<access token>');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/shorten', function (req, res) {
    var req_url = req.body.url;
    console.log(req_url);
    if (!validator.isURL(req_url)) {
        console.log('Invalid URL');
        res.status(400).send({ error: 'Invalid URL'});
        return;
    }
    bitly
        .shorten(req_url)
        .then(function(result) {
            console.log(result);
            res.send(result);
        })
        .catch(function(error) {
            console.error(error);
            res.status(500).send(error);
        });
});

app.listen(3000, function () {
    console.log('Bitly shorten service listening on port 3000!');
});
