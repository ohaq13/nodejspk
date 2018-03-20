"use strict";
global.__dirname = __dirname;
const LISTEN_PORT = 3001
const requirejs = require('requirejs');
const express = require('express');
const bodyParser = require ('body-parser');
const path = require ('path');

requirejs.config({
    //Use node's special variable __dirname to
    //get the directory containing this file.
    //Useful if building a library that will
    //be used in node but does not require the
    //use of node outside
    baseUrl: __dirname,

    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,

    paths:{
      services      : 'server/js/services',
      customer      : 'common/js/customer',
      customerDao   : 'common/js/customerDao',
      db            : 'common/js/db',

    }
});

requirejs(['services'],function(Services) {
    const app = express();
    const services = new Services(app);
  
    // Body parser middle ware
    // parse application/json
    app.use(bodyParser.json());
  
    // View Engine
    app.set('view engine', 'ejs'); 
    app.set('views', path.join(__dirname, 'common', 'html'));
    

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}));
  
    // Set Static Path
    app.use(express.static(path.join(__dirname)));
    app.use(express.static(path.join(__dirname, 'common', 'html')));
    
    // render home page 
    app.get('/', (req, res) => {
      res.render('index', {nocache: Date.now()});
    });
    
    services.initServices();
  
    app.listen(LISTEN_PORT, ()=>{
      console.log('Server Started on Port: ' + LISTEN_PORT);
    })

});