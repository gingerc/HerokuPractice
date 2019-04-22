const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var mustacheExpress = require('mustache-express');

const app = express ();
const PORT = process.env.PORT || 5000

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(bodyParser.json())          //json support
app.use(bodyParser.urlencoded({    //url support
    extended: true
  })); 
app.use('/public', express.static('public'));


//HEROKU_POSTGRESQL_MAUVE_URL
// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });


const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:true
});


app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 })

 var username;
 var message;

 app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM forum');
     // const results = { 'results': (result) ? result.rows : null};
      for (var i = 0; i < result.rows.length; i++) {
        res.send(result.rows[i]);
      }
      username = result.rows[0].username;
      message = result.rows[0].message;
      client.release();
    } catch (err){
        console.error(err);
        res.send("Error" + err);
    }
})

 var postContent = {
     name : username,
     message : message
 }

//  var postContainer = document.getElementById("postContainer");
//  var postTemplate = Mustache.render("{{name}} says \"{{message}}\" ", postContent);
//  postContainer.append(postTemplate);




// var client = new Client({database: 'memoryforum'});
// client.connect();

// const text = 'INTO posts (message) VALUES ($1)';
// const vlaues = ['I remember a blue rose.']

// // client.query('SELECT * FROM posts', (err, res) => {  //query, vlaue, callback
// //     if (err) throw err;
// //     console.log(res);
// //     client.end();
// // })




//display the forum 



  //app.get('/', (req, res) => res.render(res.send ('Hello World!')))
  app.get('/cool', (req, res) => res.send(cool()))
  
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))