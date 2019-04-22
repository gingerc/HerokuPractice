const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express');
const url = require('url')

const app = express ();
const PORT = process.env.PORT || 5000

var memories = [];

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(bodyParser.json())          //json support
app.use(bodyParser.urlencoded({    //url support
    extended: true
  })); 
app.use('/public', express.static('public'));
const {Client} = require('pg');

//HEROKU_POSTGRESQL_MAUVE_URL

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl:true
// });

let client = new Client({database: 'forum', ssl:true})
client.connect()

app.get('/', function (req, res) {
    client.query('SELECT * FROM forum', (err, resSQL) => {
        if (err){
            console.log(err)
        } else {
            for (var i = 0; i < resSQL.rows.length; i++) {
            memories.push("<p>"+ resSQL.rows[i].message  + "</p><br>");
            res.render('index', {
                memories
            })
          }
        }
    })
    
 })

//  app.get('/db', async (req, res) => {
//     try {
//       const client = await pool.connect()
//       const result = await client.query('SELECT * FROM forum');
//       const results = { 'results': (result) ? result.rows : null};
//       for (var i = 0; i < result.rows.length; i++) {
//         //log += result.rows[i].message + "<br>";
//         memories.push("<p>"+ result.rows[i].message  + "</p><br>");
//         username.push(result.rows[i].username);
//         message.push(result.rows[i].message);
//       }
//       //read the html file first
//       //document.getElementById("postContainer").innerHTML = memories;
//       res.send(memories);

//       client.release();
//     } catch (err){
//         console.error(err);
//         res.send("Error" + err);
//     }
// })

app.post('/post', function (req, res){
    var text = req.body.userinput;
    if (text == " "){
        res.send('please enter something');
    } else {
        client.query('INSERT INTO forum (message) VALUES (\'' + text + '\')',  (err, res) => {
            if (err) { console.log(err)}
            else {
                console.log("posted successfully");
            }
         })
    }
    res.redirect('/');
})




  //app.get('/', (req, res) => res.render(res.send ('Hello World!')))
  app.get('/cool', (req, res) => res.send(cool()))
  
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))