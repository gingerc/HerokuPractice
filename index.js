
// const express=require('express');
// var { Client } = require('pg');


// var client = new Client({database: 'memoryforum'});
// client.connect();

// const text = 'INTO posts (message) VALUES ($1)';
// const vlaues = ['I remember a blue rose.']

// // client.query('SELECT * FROM posts', (err, res) => {  //query, vlaue, callback
// //     if (err) throw err;
// //     console.log(res);
// //     client.end();
// // })


// const app = express();
// const port = process.env.PORT || 8000;

// console.log(process.env.DATABASE_URL);


// app.get('/', function(req,res){
//     res.send ('Hello World!');
// });

// app.listen(port, () => console.log('app listening on port!'));

const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index.js'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))