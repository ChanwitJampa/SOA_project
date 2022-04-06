import NavbarComponent from "./NavbarComponent";
import "./NewsAddComponent.css";
import { useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

import {
    SmileTwoTone,
    HeartTwoTone,
    CheckCircleTwoTone,
    ClockCircleOutlined,
    NotificationOutlined,
    PhoneOutlined,
    MailOutlined,
    DeleteOutlined,
    DeleteFilled,
    EditOutlined,
    PlusOutlined,
    FormOutlined,
    CheckOutlined
    
  } from "@ant-design/icons";


import axios from "axios";
import Swal from "sweetalert2";

const TestResultEditComponent=(props)=>{
    // const [state,setState]=useState({
    //     organizationID:"621a99528503e41d702f31f0",
    //     organizationName:"มหาวิทยาลัยเกษตรกำแพงแสน",
    //     officerID:"",
    // })

  const [labs, setlabs] = useState([]);


    // const fetchData = () => {
    //     axios
    //       .get(`http://localhost:5000/api/announces`)
    //       .then((response) => {
    //         console.log(response.data)
    //         setannounces(response.data);
    
    //       })
    //       .catch((err) => console.log(err));
    //   };
    
    //   //ใช้ useEffect ในการสั่งใช้งาน fetchData ทันทีที่เปิดหน้านี้ขึ้นมา
    //   useEffect(() => {
    //     fetchData();
    //   }, []);


      useEffect(()=>{
        axios.get(`https://soa-project-final.herokuapp.com/api/rtpcrs//${props.match.params._id}`)
        .then(response=>{
            const {_id,patientID,officerID,labID,result,detail}= response.data.body
            setState({...state,_id,patientID,officerID,labID,result,detail})
            setlabs(response.data.body)
            console.log(labs)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    

    const [state,setState]=useState({
        _id:"",
        patientID: "",
        officerID: "",
        labID: "",
        result: "",
        detail: "",
        
      })
    
    
      const {_id,
        patientID,
        officerID,
        labID,
        result,
        detail,
    }=state
        
    const inputValue = (name) => (event) => {
        console.log(name, "=", event.target.value);
    
        setState({ ...state, [name]: event.target.value });
        
    
    };

    const submitForm=(event)=>{
        event.preventDefault();
        console.table({_id,patientID,officerID,labID,result,detail});
        axios.put(`https://soa-project-final.herokuapp.com/api/rtpcrs/${_id}`,{_id,patientID,officerID,labID,result,detail})
        .then(response=>{
            Swal.fire(
                'Alert',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
            ).then(()=>{
                window.location.href = "/testresult"
            })
            const {_id,patientID,officerID,labID,result,detail}=response.data
            setState({...state,_id,patientID,officerID,labID,result,detail})
        })
        .catch((error)=>{
            Swal.fire(
                'Alert',
                //err.response.data.error,
                'error'
            )
        }
        )
    }

    // const inputValue=name=>event=>{
    //   /*  setState({...state,[name]:organizationID,organizationName,phoneNumber,detial,type})*/
    //     /*setUser({...user,[name]:phoneNumber,email})*/
    // }
    // const {organizationID,organizationName,image,topic,detial}=state
    /*const{phoneNumber,email,type}=user*/
    /*const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`http://localhost:5000/api/login`,{organizationName,officerID,phoneNumber,email,type}).then(res=>{
            console.log(res.data)
            setState(res.data)
            console.log(state)
            setState({...state,
                organizationName: "",
                detial:"",
                phoneNumber: "",
                email:"",
                type:"",
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
                <h1>แก้ไขข้อมูลผลตรวจ RT/PCR</h1>

                <form onSubmit={submitForm}>

                    <div className="n1">
                        <div className="formnews">
                        <label>เลขห้อง</label>
                        <input type="text" id="disabledInput" className="form-control" value={patientID}  onChange={inputValue("patientID")} />
                        </div>
                        <div className="formnews">
                        <label>รายละเอียด</label>
                        <input type="text" id="disabledInput" className="form-control" value={officerID} placeholder="กรอกรายละเอียดของคุณ" onChange={inputValue("officerID")}/>
                        </div>
                        <div className="formnews">
                        <label>ประเภทห้อง</label>
                        <input type="text" id="disabledInput" className="form-control"  value={labID} placeholder="ฝึกงาน/สหกิจ"onChange={inputValue("labID")}/>
                        </div>
                        <div className="formnews">
                        <label>ผลตรวจ</label>
                        <input type="text" id="disabledInput" className="form-control"  value={result} placeholder="ฝึกงาน/สหกิจ"onChange={inputValue("result")}/>
                        </div>
                        <div className="formnews">
                        <label>รายละเอียด</label>
                        <input type="text" id="disabledInput" className="form-control"  value={detail} placeholder="ฝึกงาน/สหกิจ"onChange={inputValue("detail")}/>
                        </div>
                        

                        <button type="submit" className="btn btn-color" style={{color:"#F5F5F5",fontWeight:"bold",marginLeft:"30rem",marginTop:"2rem"}}><CheckOutlined style={{color:"#F5F5F5",fontWeight:"bold",marginRight:"1rem"}}/>แก้ไขผลตรวจ</button> 
                    </div>

                </form>

            </div>
        </div>
    );
};
export default TestResultEditComponent;