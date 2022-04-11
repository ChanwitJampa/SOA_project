import NavbarComponent from "./NavbarComponent";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { getToken} from "../servies/authorize";
import "./DocumentComponent.css";
import { getRole, getUser,logout,getStudentID,getLastName,getFirstName } from "../servies/authorize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faFileLines,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import {
  SmileTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Button, Radio, Row, Col } from "antd";
import "antd/dist/antd.css";
import {
  faAdd,
  faHospital,
  faSkullCrossbones,
  faTrash,
  faVirusCovid,
} from "@fortawesome/free-solid-svg-icons";
import BarLoader from "react-spinners/BarLoader";

import MapChart from "./MapChart";

const DocumentComponent = () => {
  const [content, setContent] = useState("");

  const [hospital, setHospital] = useState([]);

  const [history, setHistory] = useState([]);

  const [pName, setpName] = useState("กรุณาเลือกจังหวัด");

  const [thospital, setThospital] = useState([]);
  const [hospitalName, setHospitalName] = useState("กรุณาเลือกสถานพยาบาล");

  const [PatientHospital, setPatientHospital] = useState([]);
  const [patient, setPatient] = useState([]);

  const [patientCount, setpatientCount] = useState(0);

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const override = `
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

  const fetchData = () => {

    
    
    axios
      .get(
        `https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-by-provinces`
      )
      .then((response) => {
        console.log("PNAME")
        // console.log(response.data);
        // setHospital(response.data);

        setHospital(
          response.data.slice(
            response.data.length - 78,
            response.data.length - 1
          )
        );
      })
      .catch((err) => alert(err));

        axios
        .get(
          `https://soa-project-final.herokuapp.com/api/patients/`
        )
        .then((response) => {
          console.log("setPatient")
          console.log(response.data.body);
          // setHospital(response.data);
    
          setPatient(response.data.body);
          
          /*setHospital(
            response.data.slice(
              response.data.length - 78,
              response.data.length - 1
            )
          );*/
          console.log(thospital);
        })
        .catch((err) => alert(err));

    



      const token = getToken();


      console.log("TOKEN = " + token)

    // axios
    //   .get(
    //     `https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-by-provinces`,
    //     {headers: {Authorization: `Bearer ${token}`}}
    //   )
    //   .then((response) => {
    //     console.log("PNAME")
    //     console.log(response.data);
    //     // setHospital(response.data);

    //     setHospital(
    //       response.data.slice(
    //         response.data.length - 78,
    //         response.data.length - 1
    //       )
    //     );
    //   })


  };

  const plaiFetchData = () => {
    axios
    .get(
      `http://localhost:5000/api/hospitals`
    )
    .then((response) => {
      console.log("kokokokokookkokkoko")
      console.log(response.data);
      // setHospital(response.data);

      setThospital(response.data.result);
      
      /*setHospital(
        response.data.slice(
          response.data.length - 78,
          response.data.length - 1
        )
      );*/
      console.log(thospital);
    })

  }

  const countPatient = () => {
    let count = 0;

    console.log("countPatient");
    setpatientCount(0);


    for (let i = 0; i < PatientHospital.length; i++) {
      
      if(PatientHospital[i].hospitalID == hospitalName)
      {

        count++;
        console.log(count);

      }

    }

    setpatientCount(count);
  }


  const fecthPatientHospital = () => {
    axios
    .get(
      `http://localhost:5000/api/PatientsInHospitals`
    )
    .then((response) => {
      console.log("kokokokokookkokkoko")
      console.log(response.data);
      // setHospital(response.data);

      setPatientHospital(response.data);
      
      

      console.log("PatientHospital");
      console.log(PatientHospital);
    })

  }

  const getName = (id) => {
    let name = "";

      for (let i = 0; i < patient.length; i++) {

        if(patient[i]._id == id)
        {
          return patient[i].firstName
          
        }


      }




      return id
  }
  const getLastName = (id) => {
    let name = "";

      for (let i = 0; i < patient.length; i++) {

        if(patient[i]._id == id)
        {
          return patient[i].lastName
          
        }


      }




      return id
  }



  // const pullHistory = (pName) => {
  //   if (pName != "กรุณาเลือกจังหวัด") {
  //     axios
  //       .get(
  //         // `http://localhost:5000/api/map/${provinceName}`
  //         `http://localhost:5000/api/map/${pName}`
  //       )
  //       .then((response) => {
  //         console.log("TEST API ==== === = = = ");
  //         console.log(response.data);
  //         console.log(response.data[0].new_total_1);

  //         setHistory(response.data);
  //       });
  //     // .catch((err) => alert(err));
  //   }
  // };

  useEffect(() => {

    fetchData();
    console.log(pName);
    // console.log(getToken())

    console.log("Hello");
    plaiFetchData();

    fecthPatientHospital();

    
    
  }, []);

  useEffect(() => {

    // fecthPatientHospital();
    console.log(PatientHospital);
    countPatient();
    
    
  }, [hospitalName]);


  useEffect(() => {
    // setHospital(hospital.filter(hospital.province == pName))
    // pullHistory(pName);
    // console.log(history[0])
    console.log(pName);


    

    if (pName != "กรุณาเลือกจังหวัด") {
      // setHistory([]);
      // console.log("HISTORY");
      // console.log(history);
      // console.log("end");
      setLoading(true);
      // console.log("load");

      setTimeout(() => {
        setLoading(false);
        // console.log("load2");
      }, 2000);
    }
  }, [pName]);


  const inputHospitalName = (id) => {
    console.log(id);

    // const Name = allhospital.filter((hospital) => {
    //     if (hospital._id === id) {
    //         return hospital
    //     }
    // }).map((hospital) => {
    //     return hospital.hospitalName
    // })
    // setHospitalName(Name.toString());

    setHospitalName(id);
    // console.log(lab);

}

  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <div className="mapBox">
          {/* <MapChart setTooltipContent={setContent} onChange={ value => setpName(value)} /> */}
          {/* <MapChart setTooltipContent={setContent} changeWord={ word => setpName(word)} /> */}

          <Row>
            <Col span={12}>
              <div className="mapShow">
                <MapChart setTooltipContent={setContent} props={setpName} />
                <ReactTooltip
                  class="mySepecialClass"
                  backgroundColor={"crimson"}
                  fontSize={"2rem"}
                >
                  {content}
                </ReactTooltip>
              </div>
            </Col>

            <Col span={12}>
              <div className="informationBox">
                <h1 className="headerInformation">
                  ยอดข้อมูลผู้ติดเชื้อโควิดของประเทศไทย
                </h1>
                <h1 className="headerInformation2">
                  ข้อมูลตั้งเเต่ เมษายน 2564 - ปัจจุบัน
                </h1>

                {/* <Button color="red" basic icon>
            <Icon name="log out">
              Logout
            </Icon>
          </Button> */}

                <h1 className="provinceName">{pName}</h1>
                {/* <h1 className="provinceName">{hospital.province[0]}</h1> */}

                {/* <h1 className="provinceName">{content}</h1> */}

                {/* <h2 className="infoText">new case: +  </h2>
          <h2 className="infoText">total case: </h2>
          <h2 className="infoText">newcase excludeabroad: </h2>
          <h2 className="infoText">total case excludeabroad: </h2>
          <h2 className="infoText">new death: </h2>
          <h2 className="infoText">total death: </h2>
          <h2 className="infoText">update date: </h2> */}

                <table
                  class="table"
                  className="tableprovince"
                  style={{
                    backgroundColor: "#FFFFFF",
                    paddingRight: "40rem",
                    paddingLeft: "40rem",
                  }}
                >
                  <thead className="table-thead">
                    <tr>
                      {/* <th scope="col">ชื่อจังหวัด</th> */}
                      <th scope="col">วันที่ลงประกาศ</th>
                      <th scope="col">ติดเชื้อวันนี้</th>
                      <th scope="col">เคสทั้งหมด</th>
                      <th scope="col">ผู้ป่วยจากต่างประเทศ</th>
                      <th scope="col">เสียชีวิตวันนี้</th>
                      <th scope="col">ยอดตายสะสม</th>
                      {/* <th scope="col">วันที่อัพเดต</th> */}
                      <th scope="col">ปุ่ม</th>
                    </tr>
                  </thead>
                  <tbody className="table-tbody">
                    {hospital
                      .filter((province) => province.province === pName)
                      .map((hospital) => (
                        // {hospital.filter(hospital.province === "จันทบุรี").map((hospital) => (

                        <tr>
                          {/* <td>{hospital.province}</td> */}
                          <td>{hospital.txn_date}</td>
                          <td style={{ color: "#019267", fontWeight: "bold" }}>
                            {hospital.new_case}
                          </td>
                          <td>{hospital.total_case}</td>

                          <td>
                            {hospital.new_case -
                              hospital.new_case_excludeabroad}{" "}
                          </td>

                          <td style={{ color: "red", fontWeight: "bold" }}>
                            {hospital.new_death}
                          </td>
                          <td>{hospital.total_death}</td>
                          {/* <td>{hospital.update_date}</td> */}
                          <td>
                            <Link
                              to={`/announce`}
                              type="button"
                              class="btn btn-primary"
                              // style={{marginTop:"2rem"}}
                            >
                              <FontAwesomeIcon icon={faHospital} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="space3">
                  <ClockCircleOutlined
                    style={{
                      fontSize: "2rem",
                      color: "#FFF",
                      marginBottom: "1rem",
                      marginTop: "1rem",
                    }}
                  />
                  <h1 className="historyHeader3">สถิติ</h1>

                  {/* <Link
                      to={`/patientinfo/623898418f52638018d08103`}
                      type="button"
                      class="btn btn-primary"
                      // style={{marginTop:"2rem"}}
                    >
                      <FontAwesomeIcon icon={faHospital} />
                    </Link> */}
                  
                  

                  <BarLoader
                    className="loadingbar"
                    color={color}
                    loading={loading}
                    css={override}
                    size={150}
                  />

                  <div style={{width:"30rem",marginLeft:"14rem",marginTop:"3rem"}}>

                  
                  {getRole()=='admin' &&(
                                    
                    <select onChange={(event) => inputHospitalName(event.target.value)} placeholder="กรุณาเลือกจังหวัด" class="form-control" id="exampleFormControlSelect1">
                        {
                          thospital.filter((thospital) => thospital.hospitalLocation.includes(pName)).map((hospitalName => {
                            return (
                              <option value={hospitalName.hospitalId}>{hospitalName.hospitalName}</option>
                                )
                              }))
                            }

                    </select>
                  )}

                    <h1 style={{fontSize:"1rem",marginTop:"2rem",marginBottom:"2rem",color:"white"}}>hostpitalID :{hospitalName}</h1>

                    <h1 style={{fontSize:"1rem",marginTop:"2rem",marginBottom:"3rem",color:"white"}}>จำนวนคนป่วย :{patientCount}</h1>

                    {getRole()=='admin' &&(
                  <table
                    class="table"
                    className="tableprovince"
                    style={{
                      backgroundColor: "#FFFFFF",
                      paddingRight: "40rem",
                      paddingLeft: "40rem",
                    }}
                  >
                    <thead className="table-thead">
                      <tr>
                        {/* <th scope="col">ชื่อจังหวัด</th> */}
                        {/* <th scope="col">patientID</th> */}
                        <th scope="col">ชื่อจริง</th>
                        <th scope="col">นามสกุล</th>
                        {/* <th scope="col">วันที่อัพเดต</th> */}
                        <th scope="col">ปุ่ม</th>
                      </tr>
                    </thead>
                    <tbody className="table-tbody">
                      {PatientHospital
                        .filter((PatientHospital) => PatientHospital.hospitalID == hospitalName)
                        .map((hospital) => (
                          // {hospital.filter(hospital.province === "จันทบุรี").map((hospital) => (

                          <tr>
                            <td style={{ color: "#019267", fontWeight: "bold" }}>
                              {getName(hospital.patientID)}
                            </td>
                            {/* <td>
                              {hospital.patientID}
                            </td> */}
                            <td style={{ color: "red", fontWeight: "bold" }}>
                              {getLastName(hospital.patientID)}
                            </td>
                            <td>
                              <Link
                                to={`/patientinfo/${hospital.patientID}`}
                                type="button"
                                class="btn btn-primary"
                                // style={{marginTop:"2rem"}}
                              >
                                <FontAwesomeIcon icon={faUser} />
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                    )}



                  </div>
                </div>

                {/* <div className="space1"></div> */}

                

                
              </div>
            </Col>
          </Row>
        </div>

        
      </div>
    </div>
  );
};



export default DocumentComponent;
