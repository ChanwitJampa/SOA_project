const express = require('express')
const router = express.Router()
const { getPatientsInHospital,getPatientsInHospitals,setPatientsInHospital, putPatientsInHospital,deletePatientsInHospital } = require('../controllers/patientsInHospital')


router.route('/').get(getPatientsInHospitals).post(setPatientsInHospital)
router.route('/:id').put(putPatientsInHospital).delete(deletePatientsInHospital).get(getPatientsInHospital)


// router.get('/', getUsers)
// router.post('/',postUser)

// router.put('/:id', putUser)
// router.delete('/:id', deleteUser)

module.exports = router