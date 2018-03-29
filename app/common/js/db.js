
//define(['sqlite3', 'path'], function (_sqlite3,path) {
"use strict";
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

var db;
const DB_PATH = path.join(global.__dirname,'db','pk.db');
const MODE = {  
                OPEN_READONLY:sqlite3.OPEN_READONLY, 
                OPEN_READWRITE:sqlite3.OPEN_READWRITE, 
                OPEN_CREATE:sqlite3.OPEN_CREATE
                };

// Connect to database when server loads db.js
_connect(MODE.OPEN_READWRITE);

function _connect(mode){
    db = new sqlite3.Database(DB_PATH, mode,  (err) => {
        if (err) {
            return console.error(err.message);
        } 

        console.log('Connected to database.');
    });
}

// This needs to be handled with Ctrl+C
function _close(){
    db.close((err) => {
        if (err) {
        return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}


function _select(query, paramsArray, complete){
//         _connect(MODE.OPEN_READONLY);

    var data = {results:[]};
    db.each(query, paramsArray, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
    
            data.results.push(row);
            
    }, (err, count) => {
        complete(err, data, count);
    });

//         _close(); 
}







module.exports.select = _select;
