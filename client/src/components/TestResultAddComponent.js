import NavbarComponent from "./NavbarComponent";
import "./NewsComponent.css";
import { useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
const TestResultAddComponent=()=>{
    // const [state,setState]=useState({
    //     organizationID:"621a99528503e41d702f31f0",
    //     organizationName:"มหาวิทยาลัยเกษตรกำแพงแสน",
    //     officerID:"",
    // })

  const [patient, setpatients] = useState([]);
  const [patientID, setpatient] = useState([]);
  const [officer, setofficers] = useState([]);
  const [officerID, setofficer] = useState([]);
  const [lab, setlabs] = useState([]);
  const [labID, setlab] = useState([]);

    const fetchData = () => {


        // axios
        //   .get(`https://soa-project-final.herokuapp.com/api/rtpcrs/`)
        //   .then((response) => {
        //     console.log(response.data)
        //     setofficers(response.data);
    
        //   })
        //   .catch((err) => console.log(err));

        axios
        .get(`https://soa-project-final.herokuapp.com/api/patients/`)
        .then((res) => {
        
            setpatients(res.data.body);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

        axios
        .get(`https://soa-project-final.herokuapp.com/api/officers/`)
        .then((res) => {
        
            setofficers(res.data.body);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

        axios
        .get(`https://soa-project-final.herokuapp.com/api/labs/`)
        .then((res) => {
        
            setlabs(res.data.body);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

    };
    
      //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
      useEffect(() => {
        fetchData();
      }, []);
    
    const [state,setState]=useState({
        // patientID: "",
        // officerID: "",
        // labID: "",
        result: "",
        detail: "",
      })
    
    
      const {
        // patientID,
        // officerID,
        // labID,
        result,
        detail,
    }=state

    const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`https://soa-project-final.herokuapp.com/api/rtpcrs/`,{
            // patientID,
            // officerID,
            // labID,
            patientID,
            officerID,
            labID,
            result,
            detail}).then(res=>{
            console.log(res.data)
            setState(res.data)
            console.log(state)
            setState({...state,
                // patientID: "",
                // officerID: "",
                // labID: "",
                result: "",
                detail: "",
                
                })
                Swal.fire(
                    'เพิ่มผลตรวจ',
                    'กดตกลงเพื่อไปยังหน้าหลัก',
                    
                    
                ).then(()=>{
                    window.location.href = "/testresult"
                })
        })
        .catch((error)=>{
            console.log(error);
            Swal.fire(
                'เพิ่มคำร้องไม่สำเร็จ',
               )
        })

        
    }


    const inputValue = (name) => (event) => {
        console.log(name, "=", event.target.value);
    
        setState({ ...state, [name]: event.target.value });
        
    
    };


    // const inputValue=name=>event=>{
    //   /*  setState({...state,[name]:organizationID,organizationName,labID,detial,position})*/
    //     /*setUser({...user,[name]:labID,IDCard})*/
    // }
    // const {organizationID,organizationName,image,topic,detial}=state
    /*const{labID,IDCard,position}=user*/
    /*const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`http://localhost:5000/api/login`,{organizationName,officerID,labID,IDCard,position}).then(res=>{
            console.log(res.data)
            setState(res.data)
            console.log(state)
            setState({...state,
                organizationName: "",
                detial:"",
                labID: "",
                IDCard:"",
                position:"",
                })
                Swal.fire(
                    'อัพโหลดประกาศสำเร็จ',
                )
        })
        .catch((error)=>{
            Swal.fire(
                'อัพโหลดประกาศไม่สำเร็จ',
               )
        })
    }*/
    const inputLab = (id) => {
        console.log(id);

        // const Name = allhospital.filter((hospital) => {
        //     if (hospital._id === id) {
        //         return hospital
        //     }
        // }).map((hospital) => {
        //     return hospital.hospitalName
        // })
        // setHospitalName(Name.toString());

        setlab(id);
        // console.log(lab);

    }
    const inputOfficer = (id) => {
        console.log(id);

        // const Name = allhospital.filter((hospital) => {
        //     if (hospital._id === id) {
        //         return hospital
        //     }
        // }).map((hospital) => {
        //     return hospital.hospitalName
        // })
        // setHospitalName(Name.toString());

        setofficer(id);
        // console.log(lab);

    }
    const inputPatient = (id) => {
        console.log(id);

        // const Name = allhospital.filter((hospital) => {
        //     if (hospital._id === id) {
        //         return hospital
        //     }
        // }).map((hospital) => {
        //     return hospital.hospitalName
        // })
        // setHospitalName(Name.toString());

        setpatient(id);
        // console.log(lab);

    }
    
    return(
        <div>
            <NavbarComponent/>
            <div className="container"> 
                <h1>กรอกข้อมูล RTPCRS</h1>

                <form onSubmit={signinForm}>

                    <div className="b1">
                        {/* <div className="formnews">
                        <label>patientID</label>
                        <input position="text" id="disabledInput" className="form-control" placeholder="กรอกเลขห้อง" onChange={inputValue("patientID")} />
                        </div>
                        <div className="formnews">
                        <label>officerID</label>
                        <input position="text" id="disabledInput" className="form-control" placeholder="กรอกรายละเอียด" onChange={inputValue("officerID")}/>
                        </div>
                        <div className="formnews">
                        <label>labID</label>
                        <input position="text" id="disabledInput" className="form-control" placeholder="ประเภทห้อง" onChange={inputValue("labID")}/>
                        </div> */}
                        <div className="formnews">
                            <label for="exampleFormControlSelect1">patientID</label>
                                <select onChange={(event) => inputPatient(event.target.value)} class="form-control" id="exampleFormControlSelect1">
                                    {
                                        patient.map((patient => {
                                            return (
                                                <option value={patient._id}>{patient._id}</option>
                                            )
                                        }))
                                    }

                                </select>
                        </div>
                        <div className="formnews">
                            <label for="exampleFormControlSelect1">officerID</label>
                                <select onChange={(event) => inputOfficer(event.target.value)} class="form-control" id="exampleFormControlSelect1">
                                    {
                                        officer.map((officer => {
                                            return (
                                                <option value={officer._id}>{officer._id}</option>
                                            )
                                        }))
                                    }



                                </select>
                        </div>
                        <div className="formnews">
                            <label for="exampleFormControlSelect1">labID</label>
                                <select onChange={(event) => inputLab(event.target.value)} class="form-control" id="exampleFormControlSelect1">
                                    {
                                        lab.map((lab => {
                                            return (
                                                <option value={lab._id}>{lab._id}</option>
                                            )
                                        }))
                                    }



                                </select>
                        </div>
                        <div className="formnews">
                        <label>result</label>
                        <input position="text" id="disabledInput" className="form-control" placeholder="ประเภทห้อง" onChange={inputValue("result")}/>
                        </div>
                        <div className="formnews">
                        <label>รายละเอียด</label>
                        <input position="text" id="disabledInput" className="form-control" placeholder="ประเภทห้อง" onChange={inputValue("detail")}/>
                        </div>
                        {/* <div className="formnews">
                        <label>กรอกเลขบัตรประชาชน</label>
                        <input position="text" id="disabledInput" className="form-control"  placeholder="กรอก IDCard ของคุณ" onChange={inputValue("IDCard")}/>
                        </div>
                        <div className="formnews">
                        <label>ตำแหน่ง</label>
                        <input position="text" id="disabledInput" className="form-control"  placeholder="ตำแหน่ง"onChange={inputValue("position")}/>
                        </div> */}
                        

                        <button position="submit" className="btn btn-color"  style={{marginLeft:"35rem",marginTop:"2rem",color:"#F5F5F5"}}>เพิ่มข้อมูล RTPCR</button> 
                    </div>

                </form>

            </div>
        </div>
    );
};
export default TestResultAddComponent;