// wiki.js - Wiki route module.

const express = require('express');
const router = express.Router();
const mysql = require('mysql')


var connection = mysql.createConnection({
  insecureAuth: true,
  host: 'localhost',
  user: 'newuser',
  password: 'password',
  database: 'friends'
})

connection.connect(error => {
  if (error) {
      console.log(`error connecting to db in create: ${error}`)
  }
});

// Home page route.
router.get('/',(req, res) => {
    res.render('create');
})


router.post('/', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const handle = req.body.handle;
    connection.query(`INSERT INTO friend (name,age,handle) VALUES (?,?,?)`, [name,age,handle], (err) => {
        if(!err){
            res.redirect('/')
        }else {
            console.log(err)
        }
    })
})

module.exports = router;