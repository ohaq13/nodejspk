const LISTEN_PORT = 3001
const express = require('express');
const bodyParser = require ('body-parser');
const path = require ('path');

const app = express();

const sqlite3 = require('sqlite3').verbose();
 
// open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});
 
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

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
app.listen(LISTEN_PORT, ()=>{
    console.log('Server Started on Port: ' + LISTEN_PORT);
})