const express = require('express')
const router = express.Router()
const { getHospitals } = require('../controllers/hospitalController')


router.route('/').get(getHospitals).get()


// router.get('/', getUsers)
// router.post('/',postUser)

// router.put('/:id', putUser)
// router.delete('/:id', deleteUser)

module.exports = router