
const asyncHandler = require('express-async-handler')
const PatientMedicine = require('../models/patientsMedicinesModel')
const axios = require('axios')



const mongoose = require('mongoose')
//@desc Get PatientMedicines
//@route GET /api/PatientMedicines
//@access Private
const getPatientMedicines = asyncHandler(async (req, res) => {
    const patientMedicines = await PatientMedicine.find()
    res.status(200).json(patientMedicines)
})



//@desc Set PatientMedicine
//@route POST /api/PatientMedicines
//@access Private
const setPatientMedicine = asyncHandler(async (req, res) => {
  
    const { patientID,medicineID} = req.body
    


    if (patientID && medicineID) {
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
        var response2 = await axios.get(`http://158.108.207.7:8080/hospitals/rest/services/medicines/${medicineID}`)
        }
        catch(err) {
           console.log(err.response.status)
           res.status(err.response.status)
           throw new Error('medicineID : '+err.response.data.toString())
        }

        console.log(response2.data)

        if (response2.data.status!='200') {
            res.status(400)
            throw new Error('not found medicine with this medicineID')
        }
    }
    else {
        res.status(400)
        throw new Error(' please add email patientID and medicineID')
    }

   

    const patientMedicine = await PatientMedicine.create({
        patientID: req.body.patientID,
        medicineID: req.body.medicineID,
        amountInMilligrams: req.body.amountInMilligrams,
    })

    res.status(200).json("success")

})




//@desc Update PatientMedicine
//@route PUT /api/PatientMedicines/:id
//@access Private
const putPatientMedicine = asyncHandler(async (req, res) => {
    const patientMedicine = await PatientMedicine.findById(req.params.id)
    if (!patientMedicine) {
        res.status(400)
        throw new Error('PatientMedicine _id not found')
    }

    const updatedPatientMedicine = await PatientMedicine.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json("success")
})








//@desc Delete PatientMedicine
//@route DELETE /api/PatientMedicines/:id
//@access Private
const deletePatientMedicine = asyncHandler(async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id) ){
        res.status(401)
        throw new Error('Invalid object id')
    }

    const patientMedicine = await PatientMedicine.findById(req.params.id)
    if(!patientMedicine){
        res.status(401)
        throw new Error('Incorrect PatientMedicine _id')
    }
    const deletePatientsMedicine = await PatientMedicine.findByIdAndDelete(req.params.id)
    res.json({'status':200,'message':'delete successfully',body:deletePatientsMedicine})
})



//@desc Get officer
//@route GET /api/officers/:id
//@access Private
const getPatientMedicine = asyncHandler(async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id) ){
        res.status(401)
        throw new Error('Invalid object id')
    }

    
    const pm = await PatientMedicine.findById(req.params.id)
    if(!pm){
        res.status(401)
        throw new Error('Incorrect patientMedicine _id')
    }
    res.json({'status':200,'message':'successfully',body:pm})
})





module.exports = {
    getPatientMedicines,
    setPatientMedicine,
    putPatientMedicine,
    deletePatientMedicine,
    getPatientMedicine
}