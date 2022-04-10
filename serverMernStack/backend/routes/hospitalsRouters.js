const express = require('express')
const router = express.Router()
const { getHospitals,getHospital } = require('../controllers/hospitalController')


router.route('/:id').get(getHospital)
router.route('/').get(getHospitals)


// router.get('/', getUsers)
// router.post('/',postUser)

// router.put('/:id', putUser)
// router.delete('/:id', deleteUser)

module.exports = router