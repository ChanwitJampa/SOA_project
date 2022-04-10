import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import "./ApproveStatusForSuperComponent.css";
import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Table, Divider } from "antd";
// import 'antd/dist/antd.css';
import { DownloadOutlined, CheckOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import "./ResultComponent.css";

const PatientInfoComponent = (props) => {
    const [searchAnnounce, setSearchAnnounce] = useState("");
    const [patients, setPatients] = useState([]);
    const [rtpcr, setRtpcr] = useState([]);
    const [hospital, setHospital] = useState([]);
    const [detail, setDetail] = useState([""]);

    const [num, setNum] = useState(0);

    useEffect(() => {
        // axios.get(`http://localhost:5000/api/requests/${props.match.params._id}`)
        // axios
        //   .get(`http://localhost:5000/api/requests`)
        //   .then((response) => {
        //     setRequest(response.data);
        //     // setNum(response.data._id);
        //     console.log("response.data");
        //     console.log(response.data);
        //   })
        //   .catch((err) => alert(err));
        // // eslint-disable-next-line

        // axios
        //   .get(`http://localhost:5000/api/requests/${props.match.params._id}`)
        //   // axios.get(`http://localhost:5000/api/requests/623c88e00914cfc5184cd739`)
        //   // axios.get(`http://localhost:5000/api/requests/623c88f10914cfc5184cd73e`)
        //   .then((response) => {
        //     // setRequest(response);
        //     setNum(response.data.studentID);
        //     console.log("response.data.studentID");
        //     console.log(response.data.studentID);
        //   })
        //   .catch((err) => alert(err));
        // // eslint-disable-next-line

        // console.log("num");
        // console.log(num);

        axios
            .get(
                `https://soa-project-final.herokuapp.com/api/patients/${props.match.params._id}`
            )
            .then((res) => {
                setPatients(res.data.body);
                setNum(res.data.body._id);
                console.log(res);
                console.log(res.data.body._id);
            })
            .catch((err) => {
                console.log(err);
            });

        // axios.get(`https://soa-project-final.herokuapp.com/api/rtpcrs/${props.match.params._id}`)
        axios
            .get(`https://soa-project-final.herokuapp.com/api/rtpcrs`)
            .then((res) => {
                setRtpcr(res.data.body);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        // axios.get(`http://158.108.207.7:8080/hospitals/rest/services/hospitals`)
        //   .then((res) => {
        //     setHospital(res);
        //     console.log("res");
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log("err");

        //     console.log(err);
        //   });

        //   console.log(patients);
    }, []);

    //   const fetchData = (props) => {
    //     axios.get(`https://soa-project-final.herokuapp.com/api/patients/${props.match.params._id}`)
    //       .then((res) => {
    //         setPatients(res.body);
    //         console.log(res);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };

    //   const approved = (_id) => {
    //     console.log("-----------test-------------");
    //     axios
    //       .put(`http://localhost:5000/api/requests/${_id}`, { status: "อนุมัติ", detail: detail })
    //       .then((response) => {
    //         console.log(response.status);
    //         console.log(response.data);
    //         Swal.fire(
    //           "แก้ไขสถานะเป็น อนุมัติ สำเร็จ",
    //           "กดตกลงเพื่อไปยังหน้ารวมข้อมูล"
    //         ).then(() => {
    //           window.location.href = "/checkstatusforsuper";
    //         });
    //       })
    //       .catch((err) => alert(err));
    //   };

    //   const disApproved = (_id) => {
    //     console.log("-----------test-------------");
    //     axios
    //       .put(`http://localhost:5000/api/requests/${_id}`, {
    //         status: "ไม่อนุมัติ", detail: detail
    //       })
    //       .then((response) => {
    //         console.log(response.status);
    //         console.log(response.data);
    //         Swal.fire(
    //           "แก้ไขสถานะเป็น ไม่อนุมัติ สำเร็จ",
    //           "กดตกลงเพื่อไปยังหน้ารวมข้อมูล"
    //         ).then(() => {
    //           window.location.href = "/checkstatusforsuper";
    //         });
    //       })
    //       .catch((err) => alert(err));
    //   };

    //   const inputDetail = (event) => {
    //     console.log(event.target.value);
    //     setDetail(event.target.value);
    //   };

    //   useEffect(() => {
    //     fetchData();
    //     console.log("GOOO");
    //     console.log(patients);
    //   }, []);

    return (
        <div>
            <NavbarComponent />

            <div className="container">
                {/* {requests
          .filter((request) => request.studentID.includes(num))
          .map((filteredResults) => { */}

                {/* return ( */}
                <div>
                    <h1
                        style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            marginTop: "5rem",
                            marginLeft: "2rem",
                            marginBottom: "5rem",
                        }}
                    >
                        ตรวจสอบข้อมูลคนไข้
                    </h1>
                    <div className="contentBoxS">
                        <div className="leftBoxCApp">
                            {/* <h1 className="btextStatus">สถานะของคำร้อง</h1>

                            <br /> */}
                            <h1 className="btextStatus2">ชื่อจริง</h1>
                            <h1 className="btextStatus2">นามสกุล</h1>
                            <h1 className="btextStatus2">วันเกิด</h1>
                            <h1 className="btextStatus2">เลขบัตรประชาชน</h1>
                            
                            {/* <h1 className="btextStatus2">มีที่พักหรือไม่ </h1>
                            <h1 className="btextStatus2">ชื่อของผู้ที่ยื่นคำร้องถึง </h1>
                            <h1 className="btextStatus2">ตำแหน่งของผู้ที่ยื่นคำร้องถึง </h1>
                            <h1 className="btextStatus2">ที่อยู่ของสถานที่ฝึกงาน </h1>
                            <h1 className="btextStatus2">ชื่อผู้ประสานงานของทางบริษัท </h1>
                            <h1 className="btextStatus2">เบอร์โทรผู้ประสานงานของทางบริษัท </h1>
                            <h1 className="btextStatus2">อีเมล์ผู้ประสานงานของทางบริษัท </h1> */}
                            {/* <h1 className="btextStatus2">assistanceRole </h1> */}
                        </div>

                        <Divider
                            type="vertical"
                            className="divider1"
                            style={{ height: "100%", marginLeft: "2rem" }}
                        />
                        {/* {patients.map((filteredResults) => { */}

                        <div className="rightBoxCAPP">
                            <div></div>
                            {/* <h1 className="textStatus">test</h1> */}
                            <br />
                            <h1 className="textStatus2">{patients.firstName}</h1>
                            <h1 className="textStatus2">{patients.lastName}</h1>
                            <h1 className="textStatus2">{patients.BOD}</h1>
                            <h1 className="textStatus2">{patients.IDCard}</h1>
                        </div>
                    </div>
                </div>
                <div style={{margin:"5rem",}}></div>
                

                <h3 style={{marginLeft:"30rem"}}>ผลตรวจทั้งหมด</h3>

                {rtpcr
                    .filter((rtpcr) => rtpcr.patientID.includes(num))
                    .map((filteredResults,i) => {
              
                i=i+1;

              return (

                <div className="contentBoxS">
                    <h1 style={{marginLeft:"30rem"}} className="textStatus2">ผลตรวจที่ {i} : {filteredResults.result}</h1>
                    <h1 style={{marginLeft:"30rem"}} className="textStatus2">รายละเอียดที่ {i} : {filteredResults.detail}</h1>
                    {/* <h1 className="textStatus2">test</h1>
                    <h1 className="textStatus2">test</h1>
                    <h1 className="textStatus2">test</h1>
                    <h1 className="textStatus2">test</h1>
                    <h1 className="textStatus2">test</h1>
                    <h1 className="textStatus2">test</h1>
                    <h1 className="textStatus2">test</h1> */}

                
                </div>
          )})}
                {/* )})}  */}

                {/* <button type="submit" className="btn btn-color">Download หนังสือขอความอนุเคราะห์</button> 
            <button2 type="submit" className="btn btn-color">Download หนังสือส่งตัว</button2>  */}
            </div>
        </div>
    );
};
export default PatientInfoComponent;

{
    /* <Table
                      columns={columns}
                      dataSource={data}
                      bordered
                      title={() => 'สถานะของท่าน'}
                      footer={() => 'คุณชายเจ้าละเอียด ละเมียดละไม 6220504640'}
                      style={{backgroundColor:"#ffffff",marginTop:"3rem"}}
                  /> */
}
