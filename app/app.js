var express = require('express');
var bodyParser = require ('body-parser');
var path = require ('path');

var app = express();

/*
var logger = (req, res, next)=>{
    console.log('Logging...');
    next();
}

app.use(logger);
*/

// Body parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.send('Hello World')
})
app.listen(3001, ()=>{
    console.log('Server Started on Port 3000');
})