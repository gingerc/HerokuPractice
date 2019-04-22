
const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:true
});

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

// // console.log(process.env.DATABASE_URL);


// app.get('/', function(req,res){
//     res.send ('Hello World!');
// });

//  app.listen(port, () => console.log(`Listening on ${ PORT }`))


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render(res.send ('Hello World!')))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/db', async (req, res) => {
      try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM test_table');
        const results = { 'results': (result) ? result.rows : null};
        res.render('/db', results);
        client.release();
      } catch (err){
          console.error(err);
          res.send("Error" + err);
      }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))