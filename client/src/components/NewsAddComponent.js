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
const NewsAddComponent=(props)=>{
    // const [state,setState]=useState({
    //     organizationID:"621a99528503e41d702f31f0",
    //     organizationName:"มหาวิทยาลัยเกษตรกำแพงแสน",
    //     lastName:"",
    // })

  const [officer, setofficer] = useState([]);


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
        axios.get(`https://soa-project-final.herokuapp.com/api/officers/${props.match.params._id}`)
        .then(response=>{
            const {_id,firstName,lastName,BOD,IDCard,position}= response.data.body
            setState({...state,_id,firstName,lastName,BOD,IDCard,position})
            setofficer(response.data.body.body)
            console.log(response.data.body.body)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    

    const [state,setState]=useState({
        _id:"",
        firstName: "",
        lastName: "",
        BOD: "",
        IDCard: "",
        position: "",
      })
    
    
      const {_id,
        firstName,
        lastName,
        BOD,
        IDCard,
        position,}=state
        
    const inputValue = (name) => (event) => {
        console.log(name, "=", event.target.value);
    
        setState({ ...state, [name]: event.target.value });
        
    
    };

    const submitForm=(event)=>{
        event.preventDefault();
        console.table({_id,firstName,lastName,BOD,IDCard,position});
        axios.put(`https://soa-project-final.herokuapp.com/api/officers/${_id}`,{_id,firstName,lastName,BOD,IDCard,position})
        .then(response=>{
            Swal.fire(
                'Alert',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
            ).then(()=>{
                window.location.href = "/"
            })
            const {_id,firstName,lastName,BOD,IDCard,position}=response.data
            setState({...state,_id,firstName,lastName,BOD,IDCard,position})
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
    //   /*  setState({...state,[name]:organizationID,organizationName,BOD,detial,type})*/
    //     /*setUser({...user,[name]:BOD,IDCard})*/
    // }
    // const {organizationID,organizationName,image,topic,detial}=state
    /*const{BOD,IDCard,type}=user*/
    /*const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`http://localhost:5000/api/login`,{organizationName,lastName,BOD,IDCard,type}).then(res=>{
            console.log(res.data)
            setState(res.data)
            console.log(state)
            setState({...state,
                organizationName: "",
                detial:"",
                BOD: "",
                IDCard:"",
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
                <h1>แก้ไขข้อมูลเจ้าหน้าที่</h1>

                <form onSubmit={submitForm}>

                    <div className="n1">
                        <div className="formnews">
                        <label>ชื่อจริง</label>
                        <input type="text" id="disabledInput" className="form-control" value={firstName} onChange={inputValue("firstName")} />
                        </div>
                        <div className="formnews">
                        <label>รายละเอียด</label>
                        <input type="text" id="disabledInput" className="form-control" value={lastName} placeholder="กรอกรายละเอียดของคุณ" onChange={inputValue("lastName")}/>
                        </div>
                        <div className="formnews">
                        <label>เบอร์โทรศัพท์ของสถานประกอบการ</label>
                        <input type="text" id="disabledInput" className="form-control" value={BOD} placeholder="0xx-xxxxxxx" onChange={inputValue("BOD")}/>
                        </div>
                        <div className="formnews">
                        <label>IDCard</label>
                        <input type="text" id="disabledInput" className="form-control"  value={IDCard} onChange={inputValue("IDCard")}/>
                        </div>
                        <div className="formnews">
                        <label>ประเภท(ฝึกงาน/สหกิจ)</label>
                        <input type="text" id="disabledInput" className="form-control"  value={position} placeholder="ฝึกงาน/สหกิจ"onChange={inputValue("position")}/>
                        </div>
                        

                        <button type="submit" className="btn btn-color" style={{color:"#F5F5F5",fontWeight:"bold",marginLeft:"30rem",marginTop:"2rem"}}><CheckOutlined style={{color:"#F5F5F5",fontWeight:"bold",marginRight:"1rem"}}/>แก้ไขประกาศ</button> 
                    </div>

                </form>

            </div>
        </div>
    );
};
export default NewsAddComponent;