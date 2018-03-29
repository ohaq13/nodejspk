
"use strict";
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

var _db;
const DB_PATH = path.join(global.__dirname,'db','pk.db');
const MODE = {  
                OPEN_READONLY:sqlite3.OPEN_READONLY, 
                OPEN_READWRITE:sqlite3.OPEN_READWRITE, 
                OPEN_CREATE:sqlite3.OPEN_CREATE
                };

class  Db {
    constructor() {
    }

    static select(query, paramsArray, complete){
        var data = {results:[]};
        _db.each(query, paramsArray, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
        
                data.results.push(row);
                
        }, (err, count) => {
            complete(err, data, count);
        });
    
    }

    static connect(mode){
        _db = new sqlite3.Database(DB_PATH, mode,  (err) => {
            if (err) {
                return console.error(err.message);
            } 
    
            console.log('Connected to database.');
        });
    }
    
    // This needs to be handled with Ctrl+C
    static close(){
        _db.close((err) => {
            if (err) {
            return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}

// Connect to database when server loads db.js
Db.connect(MODE.OPEN_READWRITE);

module.exports = Db;
//module.exports.select = _select;
