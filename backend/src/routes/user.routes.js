
const express = require('express')
const { addUser, getUser, updateUser, deleteUser } = require('../controller/user.controller')
const upload = require('../middleware/upload')
const router = express.Router()


// GET
router.get('/getUser', getUser)

// POST
router.post('/addUser',upload.single('user_img'), addUser)

// PUT (Update)
router.put('/updateUser/:id',upload.single('user_img'), updateUser)

// DELETE
router.delete('/deleteUser/:id', deleteUser)


module.exports = router;