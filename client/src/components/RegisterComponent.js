import NavbarComponent from "./NavbarComponent";
import { useEffect, useState } from "react";
import "./RegisterComponent.css";
import axios from "axios";
import Swal from "sweetalert2";
const RegisterComponent=()=>{
    const [hospital, setHospital] = useState([]);
    const [hospitalID, setHospitalID] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [user,setUser]=useState({
        firstName:"",
        lastName:"",
        idCard:"",
        email:"",
        password:"",
    })
    const fetchData=()=>{
        axios.get(`http://localhost:5000/api/hospitals`).then(res=>{
          setHospital(res.data)
          console.log(res.data)
          console.log(res.status)
        })
        
    }
    useEffect(()=>{
        fetchData()
    },[])

    const inputHospital=(id)=>{
        console.log(id);
        const Name = hospital.filter((hospital)=>{
            if(hospital._id===id){
                return hospital
            }
        }).map((hospital)=>{
            return hospital.hospitalName
        })
        setHospitalName(Name.toString());
        setHospitalID(id);
    }

    const {firstName,lastName,idCard,email,password} = user

    const inputValue = (name) => (event) =>{
        setUser({...user,[name]:event.target.value});
    }

    const signupForm=(event)=>{
        event.preventDefault();
        console.table({
            firstName,
            lastName,
            idCard,
            email,
            password,
            hospitalID,
            hospitalName
        });
        axios.post(`http://localhost:5000/api/Users`,{firstName,lastName,idCard,email,password,hospitalName,hospitalID}).then(res=>{
            console.log(res.data)
            setUser({...user,
            firstName:"",
            lastName:"",
            idCard:"",
            email:"",
            password:"",
            hospitalName: "",
            hospitalID: ""});

            Swal.fire("ลงทะเบียนสำเร็จ", "บันทึกข้อมูลเรียบร้อย", "success");
        })
        .catch(err=>{
            Swal.fire(
                'ลงทะเบียนไม่สำเร็จ',
                'กรุณากรอกข้อมูลให้ครบถ้วน',
                'error',
                //err.response.data.error,
               )
        })
    }
    return(
        <div>
            <NavbarComponent/>
            <div className= "container">
                <div className="outerRegister">
                    <div className="innerRegister">
                        <form onSubmit={signupForm}>
                            <h3>Register</h3>

                            <div className="form-group">
                                <label>First name</label>
                                <input type="text" className="form-control" placeholder="First name" onChange={inputValue("firstName")}/>
                            </div>

                            <div className="form-group">
                                <label>Last name</label>
                                <input type="text" className="form-control" placeholder="Last name" onChange={inputValue("lastName")}/>
                            </div>

                            <div className="form-group">
                                <label>ID card</label>
                                <input type="text" className="form-control" placeholder="XXXXX-XXXXX-XXX" onChange={inputValue("idCard")}/>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter email" onChange={inputValue("email")}/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" onChange={inputValue("password")}/>
                            </div>

                            <div className="form-group">
                                <label>Repeat Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            <div className="form-group">
                                <label>Hospital</label>
                                <select  aria-label="Default select example" onChange={(event)=>inputHospital(event.target.value)}>
                                    <option selected disabled>Hospital</option>
                                    {hospital.map((hospital) => (
                                    <option value={hospital._id}>{hospital.hospitalName}</option>
                                    ))}
                                </select> 
                            </div>

                            <button type="submit" className="btn btn-danger">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterComponent;