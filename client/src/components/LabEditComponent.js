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
const LabEditComponent=(props)=>{
    // const [state,setState]=useState({
    //     organizationID:"621a99528503e41d702f31f0",
    //     organizationName:"มหาวิทยาลัยเกษตรกำแพงแสน",
    //     detail:"",
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
        axios.get(`https://soa-project-final.herokuapp.com/api/labs//${props.match.params._id}`)
        .then(response=>{
            const {_id,roomNumber,detail,type}= response.data.body
            setState({...state,_id,roomNumber,detail,type})
            setlabs(response.data.body)
            console.log(labs)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    

    const [state,setState]=useState({
        _id:"",
        roomNumber: "",
        detail: "",
        type: "",
      })
    
    
      const {_id,
        roomNumber,
        detail,
        type,}=state
        
    const inputValue = (name) => (event) => {
        console.log(name, "=", event.target.value);
    
        setState({ ...state, [name]: event.target.value });
        
    
    };

    const submitForm=(event)=>{
        event.preventDefault();
        console.table({_id,roomNumber,detail,type});
        axios.put(`https://soa-project-final.herokuapp.com/api/labs//${_id}`,{_id,roomNumber,detail,type})
        .then(response=>{
            Swal.fire(
                'Alert',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
            ).then(()=>{
                window.location.href = "/lab"
            })
            const {_id,roomNumber,detail,type}=response.data
            setState({...state,_id,roomNumber,detail,type})
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
        axios.post(`http://localhost:5000/api/login`,{organizationName,detail,phoneNumber,email,type}).then(res=>{
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
                <h1>แก้ไขข้อมูลเเลป</h1>

                <form onSubmit={submitForm}>

                    <div className="n1">
                        <div className="formnews">
                        <label>เลขห้อง</label>
                        <input type="text" id="disabledInput" className="form-control" value={roomNumber}  onChange={inputValue("roomNumber")} />
                        </div>
                        <div className="formnews">
                        <label>รายละเอียด</label>
                        <input type="text" id="disabledInput" className="form-control" value={detail} placeholder="กรอกรายละเอียดของคุณ" onChange={inputValue("detail")}/>
                        </div>
                        <div className="formnews">
                        <label>ประเภทห้อง</label>
                        <input type="text" id="disabledInput" className="form-control"  value={type} placeholder="ฝึกงาน/สหกิจ"onChange={inputValue("type")}/>
                        </div>
                        

                        <button type="submit" className="btn btn-color" style={{color:"#F5F5F5",fontWeight:"bold",marginLeft:"30rem",marginTop:"2rem"}}><CheckOutlined style={{color:"#F5F5F5",fontWeight:"bold",marginRight:"1rem"}}/>ยืนยันการแก้ไข</button> 
                    </div>

                </form>

            </div>
        </div>
    );
};
export default LabEditComponent;