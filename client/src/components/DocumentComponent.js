import NavbarComponent from "./NavbarComponent";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

import "./DocumentComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faFileLines,
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
        console.log(response.data);
        // setHospital(response.data);

        setHospital(
          response.data.slice(
            response.data.length - 78,
            response.data.length - 1
          )
        );
      })
      .catch((err) => alert(err));
  };

  const pullHistory = (pName) => {
    if (pName != "กรุณาเลือกจังหวัด") {
      axios
        .get(
          // `http://localhost:5000/api/map/${provinceName}`
          `http://localhost:5000/api/map/${pName}`
        )
        .then((response) => {
          console.log("TEST API ==== === = = = ");
          console.log(response.data);
          console.log(response.data[0].new_total_1);

          setHistory(response.data);
        });
      // .catch((err) => alert(err));
    }
  };

  useEffect(() => {
    fetchData();
    console.log(pName);

    console.log("Hello");
  }, []);

  useEffect(() => {
    // setHospital(hospital.filter(hospital.province == pName))
    pullHistory(pName);
    // console.log(history[0])
    console.log(pName);

    if (pName != "กรุณาเลือกจังหวัด") {
      // setHistory([]);
      // console.log("HISTORY");
      // console.log(history);
      // console.log("end");
      setLoading(true);
      console.log("load");

      setTimeout(() => {
        setLoading(false);
        console.log("load2");
      }, 2000);
    }
  }, [pName]);

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
                  {/* <h1 style={{fontSize:"1rem",color:"#FFF",marginBottom:"2rem"}}>ประวัติย้อนหลัง</h1> */}

                  {/* <Radio.Group
              onChange={onChange}
              defaultValue="1"
              buttonStyle="solid"
              style={{ marginBottom: 100, BackgroundColor: "#fff1f0" }}
            >
              <Radio.Button value="1">วันนี้</Radio.Button>
              <Radio.Button value="7">7 วัน</Radio.Button>
              <Radio.Button value="30">30 วัน</Radio.Button>
            </Radio.Group> */}

                  <BarLoader
                    className="loadingbar"
                    color={color}
                    loading={loading}
                    css={override}
                    size={150}
                  />
                </div>

                {/* <div className="space1"></div> */}

                {history.map((history) => (
                  <div className="history">
                    {/* <div className="box1">
                <div className="boxa">
                  <h1 className="historyHeader">ยอดวันนี้</h1>
                  <h1 className="textHistory">
                    <FontAwesomeIcon
                      icon={faVirusCovid}
                      style={{ marginRight: "1rem", color: "#74de49" }}
                    />
                    ติดเชื้อ = {history.new_total_1}
                  </h1>
                  <h1 className="textHistory">
                    <FontAwesomeIcon
                      icon={faSkullCrossbones}
                      style={{ marginRight: "1rem" }}
                    />
                    เสียชีวิต = {history.death_total_1}
                  </h1>
                </div> */}

                    {/* <div className="boxb">
                  <h1 className="historyHeader">ยอดวันนี้</h1>
                      <Expire delay="2000">Hooks are awesome!</Expire>
                </div> */}

                    {/* </div> */}

                    <div className="box2">
                      <div className="boxc">
                        <div
                          style={{
                            textAlign: "center",
                            marginBottom: "2rem",
                            marginTop: "3rem",
                          }}
                        >
                          <h1 className="historyHeader">ยอดย้อนหลัง 7 วัน</h1>
                        </div>

                        <h1 className="textHistory">
                          <FontAwesomeIcon
                            icon={faVirusCovid}
                            style={{ marginRight: "1rem", color: "#74de49" }}
                          />
                          ติดเชื้อ {history.new_total_7} คน
                        </h1>
                        <h1 className="textHistory">
                          <FontAwesomeIcon
                            icon={faSkullCrossbones}
                            style={{ marginRight: "1rem" }}
                          />
                          เสียชีวิต {history.death_total_7} คน
                        </h1>

                        <div style={{ textAlign: "center", marginTop: "2rem" }}>
                          {/* <h1 className="historyHeader">กราฟย้อนหลัง 7 วัน</h1> */}
                          <h1 className="historyHeader2">
                            กดสลับดูระหว่างผู้ติดเชื้อและเสียชีวิตเพื่อขยายกราฟ
                          </h1>
                        </div>

                        {/* <Expire2 delay="1500">Hooks are awesome!</Expire2> */}
                      </div>

                      {/* <div className="boxd">
                  <h1 className="historyHeader">กราฟย้อนหลัง 7 วัน</h1>
                  <h1 className="historyHeader2">กดสลับดูระหว่างผู้ติดเชื้อและเสียชีวิตเพื่อขยายกราฟ</h1>
                  
                  <Expire2 delay="1500">Hooks are awesome!</Expire2>
                </div> */}
                    </div>

                    {/* <div className="box3">

                <div className="boxc">
                    <div style={{textAlign:"center",marginBottom:"2rem"}}>
                      <h1 className="historyHeader">ยอดย้อนหลัง 30 วัน</h1>
                    </div>
                    

                    <h1 className="textHistory">
                      <FontAwesomeIcon
                        icon={faVirusCovid}
                        style={{ marginRight: "1rem", color: "#74de49" }}
                      />
                      ติดเชื้อ {history.new_total_30} คน
                    </h1>
                    <h1 className="textHistory">
                      <FontAwesomeIcon
                        icon={faSkullCrossbones}
                        style={{ marginRight: "1rem" }}
                      />
                      เสียชีวิต {history.death_total_30} คน
                    </h1>

                    <div style={{textAlign:"center",marginTop:"2rem"}}>
                      
                    <h1 className="historyHeader2">กดสลับดูระหว่างผู้ติดเชื้อและเสียชีวิตเพื่อขยายกราฟ</h1>
                    
                      
                    </div>

                    <Expire3 delay="1500">Hooks are awesome!</Expire3>

                  </div>

              </div> */}

                    <div></div>
                  </div>
                ))}

                {/* <div className="chartBox">
            <Expire delay="2000">Hooks are awesome!</Expire>
          </div> */}

                {/* <div className="newTable">
            {history.map((history) => (
              <Table basic="very" celled collapsing>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>หัวข้อ</Table.HeaderCell>
                    <Table.HeaderCell>จำนวน</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h7" image>
                        <Header.Content>
                          Lena
                          <Header.Subheader>Human Resources</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{history.new_total_1}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h7" image>
                        <Header.Content>
                          Matthew
                          <Header.Subheader>Fabric Design</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>15</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h7" image>
                        <Header.Content>
                          Lindsay
                          <Header.Subheader>Entertainment</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>12</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h7" image>
                        <Header.Content>
                          Mark
                          <Header.Subheader>Executive</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>11</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            ))}


          </div> */}
              </div>
            </Col>
          </Row>
        </div>

        {/* <h1
          style={{
            marginBottom: "2rem",
            fontWeight: "bold",
            color: "#FF6464",
          }}
        >
          เอกสารที่เกี่ยวข้อง
        </h1>
        <div className="text-line">
          <i className="faFileLines">
            <FontAwesomeIcon icon={faFileLines} />
          </i>
          <h4>หนังสือขอความอนุเคราะห์การฝึกงาน</h4>
          <i className="faArrowRightLong">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </i>
          <Link 
                    to="/form_internship2565.pdf"
                    target="_blank"
                    download
                >
          <button type="submit" className="btn btn-success">
            Download
          </button>
          </Link>

        </div>

        <div className="text-line">
          <i className="faFileLines">
            <FontAwesomeIcon icon={faFileLines} />
          </i>
          <h4>หนังสือส่งตัว</h4>
          <i className="faArrowRightLong">
            <FontAwesomeIcon icon={faArrowRightLong} />
          </i>
          <button type="submit" className="btn btn-success">
            Download
          </button>
        </div>
        <p>
          _______________________________________________________________________________________________________
        </p>

        <div>
          <form>
            <div className="borderRadiusTop">
              <span>ชื่อเอกสาร</span>
              <br />
              <input type="text" class="form-control"></input>
            </div>
            <br />
            <div className="borderRadiusBottom">
              <br />
              <div class="drop-zone">
                <span class="drop-zone__prompt">
                  Drop file here or click to upload
                </span>
                <input type="file" name="myFile" class="drop-zone__input" />
              </div>
              <div className="upload-button">
                <button type="submit" class="btn btn-success">
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div> */}
      </div>
    </div>
  );
};

{
  /* <script src="./src/components/scriptDocumentComponent.js"></script>; */
}

export default DocumentComponent;
