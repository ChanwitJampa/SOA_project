const express = require('express')
const router = express.Router()
const { getHospital } = require('../controllers/hospitalController')


router.route('/').get(getHospital)


// router.get('/', getUsers)
// router.post('/',postUser)

// router.put('/:id', putUser)
// router.delete('/:id', deleteUser)

module.exports = router