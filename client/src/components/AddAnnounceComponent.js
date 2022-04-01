import NavbarComponent from "./NavbarComponent";
import "./AddAnnounceComponent.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRemoveFormat, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
const AddAnnounceComponent = () => {
    const [allhospital, setAllHospital] = useState([]);
    const [hospitalID, setHospitalID] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [vaccine, setInputVaccince] = useState([
        { numberVaccine: '', ageRange: '', vaccineType: '' }
    ])
    const handleFormChange = (index, event) => {
        // console.log( event.target.value);
        let data = [...vaccine];
        data[index][event.target.name] = event.target.value;
        setInputVaccince(data);
    }

    const addFields = () => {
        console.log(vaccine);
        let newfield = { numberVaccine: '', ageRange: '', vaccineType: '' }
        setInputVaccince([...vaccine, newfield])
    }
    const handleRemoveItem = (index) => {
        console.log("delete  index ----------- : " + index)
        let items = [...vaccine];
        delete items[index]
        // console.log(items)
        setInputVaccince(items)

        // const newList = items.filter((item) => item !==  empty);
        // console.log("----------after filter -----------")
        // console.log(newList)
        // setInputVaccince(newList);

        // let items = [...inputVaccince];
        // let data = [];
        // console.log(inputVaccince.length)
        // for (var i = 0; i < inputVaccince.length; i++) {

        //     // console.log("i :"+i+" index :" + index + `result ${i!=index}` )

        //     if (i != index) {
        //         console.log("push : " + i)
        //         data.push(inputVaccince[i])
        //     }

        // }
        // console.log("-------------after delete -------------")
        // console.log(data)
        // let newList = [...data]
        // setInputVaccince(newList);
    }

    const [state, setState] = useState({
        vaccinationSite: "",
        DateStart: "",
        DateEnd: "",
        numberPeople: "",
        registrationType: "",
        linkRegistration: "",
        image: "",
        more: ""
    })
    const inputHospital = (id) => {
        console.log(id);
        const Name = allhospital.filter((hospital) => {
            if (hospital._id === id) {
                return hospital
            }
        }).map((hospital) => {
            return hospital.hospitalName
        })
        setHospitalName(Name.toString());
        setHospitalID(id);
    }
    const inputValue = (name) => (event) => {
        console.log(name, "=", event.target.value);
        if(name=="timeStart"){
            setTimeStart(event.target.value);
        }
        if(name=="timeEnd"){
            setTimeEnd(event.target.value);
        }
        else{
            setState({ ...state, [name]: event.target.value });
        }
        setTimeSet(timeStart+"-"+timeEnd);
    };
    const {
        vaccinationSite,
        DateStart,
        DateEnd,
        numberPeople,
        registrationType,
        linkRegistration,
        image,
        more } = state

    const submitForm = (event) => {
        setInputVaccince(vaccine.filter((e) =>{
            if(e!== undefined){
                return e
            }
        }))
        
        event.preventDefault();
        console.log(vaccine)
        let data = []
        console.log("===========test null==========")

        for(var i = 0 ; i< vaccine.length ; i++){
            if(vaccine[i]!=null && vaccine[i]!=undefined){
                data.push(vaccine[i])
            }
        }
        console.log(data)
        console.table({
            hospitalID,
            hospitalName,
            vaccinationSite,
            DateStart,
            DateEnd,
            numberPeople,
            timeSet,
            'vaccine1':[...data],
            registrationType,
            linkRegistration,
            image,
            more
        });
        axios.post(`http://localhost:5000/api/announces`, {
            hospitalID,
            hospitalName,
            vaccinationSite,
            DateStart,
            DateEnd,
            numberPeople,
            timeSet,
            vaccine:[...data],
            registrationType,
            linkRegistration,
            image,
            more
        })
            .then(response => {
                Swal.fire("Alert", "บันทึกข้อมูลเรียบร้อย", "success");
                setState({
                    ...state,
                    vaccinationSite: "",
                    DateStart: "",
                    DateEnd: "",
                    numberPeople: "",
                    registrationType: "",
                    linkRegistration: "",
                    image: "",
                    more: ""
                });
                setInputVaccince([]);
                setHospitalName("");
                setHospitalID("");
            })
            .catch(error => {
                Swal.fire(
                    "Alert",
                    error.response.data.error,
                    "error"
                );
            });
    };
    const fetchData = () => {
        axios
            .get(`http://localhost:5000/api/hospitals`)
            .then((res) => {
                setAllHospital(res.data);
            });
    };
    useEffect(() => {
        fetchData();
    })
    const [timeStart,setTimeStart]=useState("");
    const [timeEnd,setTimeEnd]=useState("");
    const [timeSet,setTimeSet]=useState("");


    return (
        <div>
            <NavbarComponent />
            <div className="container">
                <h1>เขียนประกาศ</h1>
                <div className="content-box">
                    <h4>โรงพยาบาล</h4>
                    <form onSubmit={submitForm} >
                        <div class="form-group pb-4 col-md-4">
                            <select class="form-select" onChange={(event) => inputHospital(event.target.value)}>
                                <option selected disabled>เลือกโรงพยาบาล</option>
                                {allhospital.map((hospital) => (
                                    <option value={hospital._id}>{hospital.hospitalName}</option>
                                ))}
                            </select>
                        </div>
                        <div class="form-group pb-4 col-md-4">
                            <label>สถานที่ฉีดวัคซีน</label>
                            <input type="text" className="form-control" placeholder="ex มหาวิทยาลัยเกษตรศาสตร์" onChange={inputValue("vaccinationSite")} />
                        </div>
                        <div class="form-group pb-4 col-md-4">
                            <label>ระยะเวลา</label>
                            <div className="text-line">
                                <input type="date" className="form-control" onChange={inputValue("DateStart")} />
                                <span style={{ padding: "0px 30px 0px 30px" }}>ถึง</span>
                                <input type="date" className="form-control" onChange={inputValue("DateEnd")} />
                            </div>
                        </div>
                        <div class="form-group pb-4 col-md-4">
                            <label>จำนวนคน</label>
                            <input type="number" className="form-control" placeholder="ex 500, 3000" onChange={inputValue("numberPeople")} />
                        </div>
                        <div class="form-group pb-4 col-md-4">
                            <label>ตั้งแต่เวลา</label>
                            <div className="text-line">
                                <input type="time" className="form-control" onChange={inputValue("timeStart")}/>
                                <span style={{ padding: "0px 30px 0px 30px" }}>ถึง</span>
                                <input type="time" className="form-control" onChange={inputValue("timeEnd")}/>
                            </div>
                        </div>
                        <span>วัคซีน</span>
                        {vaccine.map((input, index) => {
                            if(input!==undefined)
                            return (
                                <div class="form-group pb-4 col-md-2" key={index}>
                                    
                                    <div className="text-line">
                                        <div className="tap-top-select-in">
                                            <div className="tap-select">
                                                <select class="form-select" aria-label="Default select example" name='numberVaccine' onChange={event => handleFormChange(index, event)}>
                                                    <option  disabled selected>เลือกเข็มที่</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            <div className="tap-select">
                                                <select class="form-select" aria-label="Default select example" name='ageRange' onChange={event => handleFormChange(index, event)}>
                                                    <option disabled selected>เลือกอายุ</option>
                                                    <option value="เด็ก 12-18 ปี">เด็ก 12-18 ปี</option>
                                                    <option value="18 ปีขึ้นไป">18 ปีขึ้นไป</option>
                                                    <option value="สูงกว่า 60 ปี">สูงกว่า 60 ปี</option>
                                                </select>
                                            </div>
                                            <div className="tap-select">
                                                <select aria-label="Default select example" name='vaccineType' onChange={event => handleFormChange(index, event)}>
                                                    <option disabled selected>เลือกวัคซีน</option>
                                                    <option value="Pfizer">ไฟเซอร์</option>
                                                    <option value="Astrazeneca">แอสต้าเซเนก้า</option>
                                                    <option value="Moderna">โมเดอร์นา</option>
                                                    <option value="Sinopharm">ซิโนฟาร์ม</option>
                                                    <option value="Sinovac">ซิโนแวก</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button onClick={() => handleRemoveItem(index)} type="button" className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                </div>
                            )
                        })}
                        <button onClick={addFields} type="button" className="button-vaccine"><FontAwesomeIcon icon={faAdd} />Add vaccine</button>
                        <div class="form-group pb-4 col-md-4">

                        </div>
                        <div class="form-group pb-4 col-md-4">
                            <label>ประเภทการลงทะเบียน</label>
                            <select class="form-select" searchable="Search here.." onChange={inputValue("registrationType")}>
                                <option value="" disabled selected>เลือกเภท</option>
                                <option value="register">Register</option>
                                <option value="walkin">Walk in</option>
                            </select>
                        </div>
                        <div class="form-group pb-4 col-md-4">
                            <label>ลิงค์ลงทะเบียน (สำหรับแบบลงทะเบียน)</label>
                            <input type="url" className="form-control" onChange={inputValue("linkRegistration")} placeholder="ex http://hospitalnakornpathom.com" />
                        </div>
                        <div class="form-group pb-4 col-md-4">
                            <label>เพิ่มไฟล์รูปคิวอาโค้ด (สำหรับแบบลงทะเบียน)</label>
                            <input type="file" className="form-control" onChange={inputValue("image")} />
                        </div>
                        <div class="form-group pb-4 col-md-4">
                            <label>ประกาศเพิ่มเติม</label>
                            <textarea type="text" className="form-control" onChange={inputValue("more")} ></textarea>
                        </div>
                        <br />
                        <button type="submit" className="button-announce"><FontAwesomeIcon icon={faAdd} />Add announce</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddAnnounceComponent;