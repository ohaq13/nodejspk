const LISTEN_PORT = 3001
const express = require('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const app = express();
const sqlite3 = require('sqlite3').verbose();
 
// open database in memory
// let db = new sqlite3.Database('db/pk.db', sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to pk database.');
// });
 



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
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res)=>{
    //res.send('Hello World')
    res.render('index');
})

// v = {
//   "results": [
//     {
//       "id": 1,
//       "text": "Option 1"
//     },
//     {
//       "id": 2,
//       "text": "Option 2"
//     }
//   ],
//   "pagination": {
//     "more": false
//   }
// }


var data={results:[]}
app.get('/api/getval', (req, res)=>{
  let db = new sqlite3.Database('db/pk.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to pk database.');
});


   data={results:[]};
    db.serialize(() => {
      var query =  "%" +req.query.q + "%"
      db.each("SELECT id, name FROM customer where name like '"+query+"'", (err, row) => {
        if (err) {
          console.error(err.message);
        }
        //console.log(row.id + "\t" + row.name);
        data.results.push({id:row.id, text: row.id + ": " + row.name});
      }, ()=>{
          console.log(data.results)
          res.json(data)
        });
    });


db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

    //res.send('Hello World')
    //res.json(data);
    //res.send(req.query.q)
});





// close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

app.listen(LISTEN_PORT, ()=>{
    console.log('Server Started on Port: ' + LISTEN_PORT);
})