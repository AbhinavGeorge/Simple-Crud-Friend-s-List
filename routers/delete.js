// wiki.js - Wiki route module.
const { Router } = require('express');
const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')
const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}))

var connection = mysql.createConnection({
  insecureAuth: true,
  host: 'localhost',
  user: 'newuser',
  password: 'password',
  database: 'friends'
})

connection.connect(error => {
  if (error) {
      console.log(`err connecting to db in delete: ${err}`)
  }
});

router.post('/:id', (req,res)=>{
    connection.query(`DELETE FROM friend WHERE id=${req.params['id']}`, (err) => {
        if(!err){
            res.redirect('/');
        }else{
            console.log(err);
        }
    })
})

module.exports = router