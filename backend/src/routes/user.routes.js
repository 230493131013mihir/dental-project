
const express = require('express')
const { addUser, getUser, updateUser, deleteUser } = require('../controller/user.controller')
const router = express.Router()


// GET
router.get('/getUser', getUser)

// POST
router.post('/addUser', addUser)

// PUT (Update)
router.put('/updateUser/:id', updateUser)

// DELETE
router.delete('/deleteUser/:id', deleteUser)


module.exports = router;