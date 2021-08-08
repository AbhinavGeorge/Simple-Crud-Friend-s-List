// wiki.js - Wiki route module.

const express = require('express');
const router = express.Router();
const mysql = require('mysql')

router.use(express.static('public'))

var connection = mysql.createConnection({
  insecureAuth: true,
  host: 'localhost',
  user: 'newuser',
  password: 'password',
  database: 'friends'
})

connection.connect(error => {
  if (error) {
      console.log(`error connecting to mysql in edit: ${error}`)
  }
});

// Home page route.
router.get('/:id',(req, res) => {
    res.render('edit', {
        editId: req.params['id']
    });
})


router.post('/:id', (req, res) => {
    if(req.body.name){
        connection.query(`UPDATE friend SET name='${req.body.name}' WHERE id=${req.params['id']}`, (err) => {
            if(err){
                console.log(err)
            }
            else{
                res.redirect('/')
            }
        })
    }
    if(req.body.age){
        connection.query(`UPDATE friend SET age=${req.body.age} WHERE id=${req.params['id']}`, (err) => {
            if(err){
                console.log(err)
            }
            else{
                res.redirect('/')
            }
        })
    }
    if(req.body.handle){
        connection.query(`UPDATE friend SET handle='${req.body.handle}' WHERE id=${req.params['id']}`, (err) => {
            if(err){
                console.log(err)
            }
            else{
                res.redirect('/')
            }
        })
    }
})

module.exports = router;