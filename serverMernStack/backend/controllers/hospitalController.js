
const asyncHandler = require('express-async-handler')
const axios = require('axios')
const mongoose = require('mongoose')
//@desc Get PatientsInHospitals
//@route GET /api/PatientsInHospitals
//@access Private
const getHospital = asyncHandler(async (req, res) => {
    try{
        var response2 = await axios.get(`http://158.108.207.7:8080/hospitals/rest/services/hospitals`)
        }
        catch(err) {
           console.log(err.response.status)
           res.status(err.response.status)
           throw new Error('hospitals : '+err.response.data.toString())
        }

    res.status(200).json(response2.data)
})


module.exports = {
    getHospital,
 
}