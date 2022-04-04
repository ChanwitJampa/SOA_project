import NavbarComponent from "./NavbarComponent";
import "./NewsComponent.css";
import { useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
const LabAddComponent=()=>{
    // const [state,setState]=useState({
    //     organizationID:"621a99528503e41d702f31f0",
    //     organizationName:"มหาวิทยาลัยเกษตรกำแพงแสน",
    //     detail:"",
    // })

  const [officers, setofficers] = useState([]);


    const fetchData = () => {
        axios
          .get(`https://soa-project-final.herokuapp.com/api/labs/`)
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
        roomNumber: "",
        detail: "",
        type: "",
      })
    
    
      const {roomNumber,
        detail,
        type,}=state

    const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`https://soa-project-final.herokuapp.com/api/labs/`,{
            roomNumber,
            detail,
            type,}).then(res=>{
            console.log(res.data)
            setState(res.data)
            console.log(state)
            setState({...state,
                roomNumber: "",
                detail: "",
                type: "",
                
                })
                Swal.fire(
                    'เพิ่มคำร้องร้องสำเร็จ',
                    'กดตกลงเพื่อไปยังหน้าหลัก',
                    
                    
                ).then(()=>{
                    window.location.href = "/lab"
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
    //   /*  setState({...state,[name]:organizationID,organizationName,type,detial,position})*/
    //     /*setUser({...user,[name]:type,IDCard})*/
    // }
    // const {organizationID,organizationName,image,topic,detial}=state
    /*const{type,IDCard,position}=user*/
    /*const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`http://localhost:5000/api/login`,{organizationName,detail,type,IDCard,position}).then(res=>{
            console.log(res.data)
            setState(res.data)
            console.log(state)
            setState({...state,
                organizationName: "",
                detial:"",
                type: "",
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
                <h1>กรอกข้อมูล LAB</h1>

                <form onSubmit={signinForm}>

                    <div className="b1">
                        <div className="formnews">
                        <label>เลขห้อง</label>
                        <input position="text" id="disabledInput" className="form-control" placeholder="กรอกเลขห้อง" onChange={inputValue("roomNumber")} />
                        </div>
                        <div className="formnews">
                        <label>รายละเอียด</label>
                        <input position="text" id="disabledInput" className="form-control" placeholder="กรอกรายละเอียด" onChange={inputValue("detail")}/>
                        </div>
                        <div className="formnews">
                        <label>ประเภทห้อง</label>
                        <input position="text" id="disabledInput" className="form-control" placeholder="ประเภทห้อง" onChange={inputValue("type")}/>
                        </div>
                        {/* <div className="formnews">
                        <label>กรอกเลขบัตรประชาชน</label>
                        <input position="text" id="disabledInput" className="form-control"  placeholder="กรอก IDCard ของคุณ" onChange={inputValue("IDCard")}/>
                        </div>
                        <div className="formnews">
                        <label>ตำแหน่ง</label>
                        <input position="text" id="disabledInput" className="form-control"  placeholder="ตำแหน่ง"onChange={inputValue("position")}/>
                        </div> */}
                        

                        <button position="submit" className="btn btn-color"  style={{marginLeft:"35rem",marginTop:"2rem",color:"#F5F5F5"}}>อัพโหลดข้อมูลเจ้าหน้าที่</button> 
                    </div>

                </form>

            </div>
        </div>
    );
};
export default LabAddComponent;