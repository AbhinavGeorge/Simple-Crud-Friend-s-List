const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const createApp = require('./routers/create');
const deleteApp = require('./routers/delete');
const editApp = require('./routers/edit');

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/create', createApp);
app.use('/delete', deleteApp);
app.use('/edit', editApp);

var connection = mysql.createConnection({
  insecureAuth: true,
  host: 'localhost',
  user: 'newuser',
  password: 'password',
  database: 'friends'
})

connection.connect(error => {
  if (error) {
      console.log(`error connecting to db in home ${error}`)
  }
});

app.get('/', (req,res) => {
    connection.query(`SELECT * FROM friend`, (err, response) => {
        if(!err){
            res.render('index', {
                friendsList: response
            })
        }else{
            console.log(err);
        }
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})


app.listen(port, () => console.log(`app opened in port ${port}`))