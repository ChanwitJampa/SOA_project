const mongoose = require('mongoose')
const moment = require('moment');

const getDate=()=>{
    
}

var patientsMedicine = mongoose.Schema({
    patientID: {
        type: String,
        required: [true]
    },
    medicineID:{
        type: String,
        required:[true]
    },
    amountInMilligrams:{
        type:String,
        required:[true]
    },
    createtime:{
        type:String
    }
}
)

patientsMedicine.pre('save', function(next) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const date = dd + '/' + mm + '/' + yyyy;
    this.createtime = date
    next();
  });

module.exports = mongoose.model('patientsMedicines', patientsMedicine)