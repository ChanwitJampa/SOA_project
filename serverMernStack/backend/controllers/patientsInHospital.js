
const asyncHandler = require('express-async-handler')
const PatientsInHospital = require('../models/patientInHospitalModel')
const axios = require('axios')



const mongoose = require('mongoose')
//@desc Get PatientsInHospitals
//@route GET /api/PatientsInHospitals
//@access Private
const getPatientsInHospitals = asyncHandler(async (req, res) => {
    const patientsInHospitals = await PatientsInHospital.find()
    res.status(200).json(patientsInHospitals)
})



//@desc Set PatientsInHospital
//@route POST /api/PatientsInHospitals
//@access Private
const setPatientsInHospital = asyncHandler(async (req, res) => {
  
    const { patientID,hospitalID} = req.body
    


    if (patientID && hospitalID) {
        try{
            var respnose1 = await axios.get(`https://soa-project-final.herokuapp.com/api/patients/${patientID}`)
        }
        catch(err) {
            console.log(err.response.data)   
            res.status(err.response.data.status)
            throw new Error("patientsID : "+err.response.data.message.toString()) 
        }
         // console.log(respnose1.data)
        if (respnose1.data.status!='200') {
            res.status(400)
            throw new Error('not found patient with this patientsID')
        }


      
        try{
        var response2 = await axios.get(`http://158.108.207.7:8080/hospitals/rest/services/hospitals/${hospitalID}`)
        }
        catch(err) {
           console.log(err.response.status)
           res.status(err.response.status)
           throw new Error('hospitalID : '+err.response.data.toString())
        }
        // console.log(respnose2.data)
        if (response2.data.status!='200') {
            res.status(400)
            throw new Error('not found hospital with this hospitalID')
        }
    }
    else {
        res.status(400)
        throw new Error(' please add email patientID and hospitalID')
    }

   

    const patientsInHospital = await PatientsInHospital.create({
        patientID: req.body.patientID,
        hospitalID: req.body.hospitalID,
    })

    res.status(200).json("success")

})




//@desc Update PatientsInHospital
//@route PUT /api/PatientsInHospitals/:id
//@access Private
const putPatientsInHospital = asyncHandler(async (req, res) => {
    const patientsInHospital = await PatientsInHospital.findById(req.params.id)
    if (!patientsInHospital) {
        res.status(400)
        throw new Error('PatientsInHospital _id not found')
    }

    const updatedPatientsInHospital = await PatientsInHospital.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json("success")
})








//@desc Delete PatientsInHospital
//@route DELETE /api/PatientsInHospitals/:id
//@access Private
const deletePatientsInHospital = asyncHandler(async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id) ){
        res.status(401)
        throw new Error('Invalid object id')
    }

    const pih = await PatientsInHospital.findById(req.params.id)
    if(!officer){
        res.status(401)
        throw new Error('Incorrect PatientsInHospital id')
    }
    const deleteofficer = await PatientsInHospital.findByIdAndDelete(req.params.id)
    res.json({'status':200,'message':'delete successfully',body:deleteofficer})
})



//@desc Get officer
//@route GET /api/officers/:id
//@access Private
const getPatientsInHospital = asyncHandler(async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id) ){
        res.status(401)
        throw new Error('Invalid object id')
    }

    
    const pih = await PatientsInHospital.findById(req.params.id)
    if(!pih){
        res.status(401)
        throw new Error('Incorrect pih id')
    }
    res.json({'status':200,'message':'successfully',body:pih})
})





module.exports = {
    getPatientsInHospitals,
    setPatientsInHospital,
    putPatientsInHospital,
    deletePatientsInHospital,
    getPatientsInHospital
}