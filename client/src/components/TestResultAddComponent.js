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

  const [officers, setofficers] = useState([]);


    const fetchData = () => {
        axios
          .get(`https://soa-project-final.herokuapp.com/api/rtpcrs/`)
          .then((response) => {
            console.log(response.data)
            setofficers(response.data);
    
          })
          .catch((err) => console.log(err));
      };
    
      //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
      useEffect(() => {
        fetchData();
      }, []);
    
    const [state,setState]=useState({
        patientID: "",
        officerID: "",
        labID: "",
        result: "",
        detail: "",
      })
    
    
      const {patientID,
        officerID,
        labID,
        result,
        detail,
    }=state

    const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`https://soa-project-final.herokuapp.com/api/rtpcrs/`,{
            patientID,
            officerID,
            labID,
            result,
            detail}).then(res=>{
            console.log(res.data)
            setState(res.data)
            console.log(state)
            setState({...state,
                patientID: "",
                officerID: "",
                labID: "",
                result: "",
                detail: "",
                
                })
                Swal.fire(
                    'เพิ่มคำร้องร้องสำเร็จ',
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
    return(
        <div>
            <NavbarComponent/>
            <div className="container"> 
                <h1>กรอกข้อมูล RTPCRS</h1>

                <form onSubmit={signinForm}>

                    <div className="b1">
                        <div className="formnews">
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
                        </div>
                        <div className="formnews">
                        <label>result</label>
                        <input position="text" id="disabledInput" className="form-control" placeholder="ประเภทห้อง" onChange={inputValue("result")}/>
                        </div>
                        <div className="formnews">
                        <label>officerID</label>
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