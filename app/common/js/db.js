
define(['sqlite3','module', 'path'], function (_sqlite3,module,path) {
    "use strict";
   console.log(path.dirname(module.uri));
    const sqlite3 = _sqlite3.verbose();
    const DB_PATH = path.join(__dirname,'db','pk.db');
    const MODE = {  
                    OPEN_READONLY:sqlite3.OPEN_READONLY, 
                    OPEN_READWRITE:sqlite3.OPEN_READWRITE, 
                    OPEN_CREATE:sqlite3.OPEN_CREATE
                 };
    var db;
   // _connect(MODE.OPEN_READONLY);
    function _connect(mode){
        db = new sqlite3.Database(DB_PATH, mode,  (err) => {
            if (err) {
               return console.error(err.message);
            } 

            console.log('Connected to database.');
        });
    }

    function _close(){
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Close the database connection.');
        });
    }

    function _select(query, obj){
         _connect(MODE.OPEN_READONLY);

        var data = {results:[]};
        db.each("SELECT id, name FROM customer where name like '"+query+"'", (err, row) => {
            if (err) {
                return console.error(err.message);
            }
        
             data.results.push(row);
          }, ()=>{
            console.log(data.results.length) 
            return data;
        },()=>{_close()});
    }

    return {
        select: _select
    }
});