'use strict'

var express = require('express');
var path = require('path');
var app = express();

console.log(__dirname);
app.use(express.static('public'));
app.use(express.static('src'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(3000, function() {
    console.log("Server on 3000");
})

module.exports = app;
