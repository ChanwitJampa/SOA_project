const express = require('express')
const router = express.Router()
const { getPatientMedicines,setPatientMedicine,putPatientMedicine,deletePatientMedicine,getPatientMedicine } = require('../controllers/patientsMedicineController')


router.route('/').get(getPatientMedicines).post(setPatientMedicine)
router.route('/:id').put(putPatientMedicine).delete(deletePatientMedicine).get(getPatientMedicine)


// router.get('/', getUsers)
// router.post('/',postUser)

// router.put('/:id', putUser)
// router.delete('/:id', deleteUser)

module.exports = router