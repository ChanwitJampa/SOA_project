import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import './AnnounceComponent.css';
import {faSyringe} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
const AnnounceComponent=()=>{
    const [searchAnnounce,setSearchAnnounce]=useState('');
    const [announce,setAnnounce]=useState([]);
    const [district,setDistrict]=useState([]);
    const [provinces,setProvinces]=useState([]);
    const [allhospital, setAllHospital] = useState([]);
    const fetchData=()=>{
        axios.get(`http://localhost:5000/api/announces`)
        .then((res)=>{
            setAnnounce(res.data)
        }).catch((err)=>{
            console.log(err)
        })
        axios.get(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces`)
        .then((res) => {
        console.log(res.data.data);
        setProvinces(res.data.data);
      });
    }
    const fetchDistrict=(pro)=>{
        axios
          .get(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${pro}`)
          .then((res)=>{
            console.log(res.data.data);
            setDistrict(res.data.data);
          })
        axios
          .get(`http://localhost:5000/api/hospitals`)
          .then((res) => {
              setAllHospital(res.data);
          });
      }
    useEffect(()=>{
        fetchData()
        fetchDistrict("กระบี่");
    },[])
    return(
        <div>
            <NavbarComponent/>
            <div className="container"> 
                <h1>Announce</h1>
                <div className="tap-top-select">
                    <div className="tap-top-select-in">
                            <div className="tap-select">
                            <select class="mdb-select " searchable="Search here.." onChange={(event)=>{                      
                                setSearchAnnounce(event.target.value)  
                                }}>
                                <option selected disabled>เลือกโรงพยาบาล</option>
                                {allhospital.map((hospital) => (
                                <option value={hospital.hospitalName}>{hospital.hospitalName}</option>
                                ))}
                            </select>
                            
                    </div>
                    <div className="tap-select">
                            <select aria-label="Default select example" onChange={(event)=>{
                                setSearchAnnounce(event.target.value)
                                }}>
                            <option elected disabled>เลือกประเภทการลงทะเบียน</option>
                            <option value="register">Register</option>
                            <option value="walkin">Walk in</option>
                        </select>
                    </div>
                    </div>
                        <div className='search'>
                            <input 
                            type='search'
                            placeholder="ค้นหา..."
                            onChange={(event)=>{
                            setSearchAnnounce(event.target.value);
                            }}/>
                        </div>
                </div>
                {(announce).filter((announce)=>{
                    if(searchAnnounce == ''){
                        return announce
                    }
                    else if(announce.hospitalName.toString().includes(searchAnnounce)||
                    announce.vaccinationSite.toString().includes(searchAnnounce)||
                    announce.numberPeople.toString().includes(searchAnnounce)||
                    announce.registrationType.toString().includes(searchAnnounce)
                    )
                    {
                        return announce
                    }
                }).map((announce)=>(
                    
                <div className="text-box">
                    <div className="text-header">
                        <div style={{padding:"10px"}}>
                            <h3>{announce.hospitalName}</h3>
                        </div>
                        <div style={{padding:"10px"}}>
                            <h1 style={{color:"#B00020"}}>{announce.registrationType}</h1>
                        </div>
                    </div>
                    <div className="text-line">
                        <p>{announce.vaccinationSite}</p>
                    </div>
                    <div className="text-line">
                        <p><span>วันที่ {announce.DateStart}  </span>
                            {announce.DateEnd!=="null"&&(<span>ถึงวันที่  {announce.DateEnd}</span>)}
                            <span>วันละ {announce.numberPeople} คน</span>
                            <span>เวลา {announce.timeSet}</span>
                        </p>
                    </div>
                    <div className="table-container">
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">เข็มที่</th>
                            <th scope="col">ช่วงอายุ</th>
                            <th scope="col">vaccine</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announce.vaccine.map((vaccine)=>(
                            <tr>
                            <th scope="row">{vaccine.numberVaccine}</th>
                            <td>{vaccine.ageRange}</td>
                            <td>{vaccine.vaccineType}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>  
                    </div>
                    <div className="text-line">
                        <p><span>เพิ่มเติม: {announce.more}</span></p>
                    </div>   
                </div>
                ))}
                <footer>
                    <hr className="line"/>
                    <p>2022 ©ภาควิชาวิศวกรรมคอมพิวเตอร์ Kasetsart University © Version : 1.0</p>
                </footer>
            </div>
        </div>
    )
}
export default AnnounceComponent;