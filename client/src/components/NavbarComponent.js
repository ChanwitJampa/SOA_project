import {Link,withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { getRole, getUser,logout } from "../servies/authorize";
import {faArrowRightFromBracket, faBullhorn, faHome, faHospital, faMap, faPlus, faRegistered, faSyringe, faUser } from "@fortawesome/free-solid-svg-icons";
//import { getUser,logout } from "../servies/authorize";
import './NavbarComponent.css';
const NavbarComponent=(props)=>{
    return(
        <div>
            <div className="navbar">
                <div className="navbar-logo">
                    <Link to="/" className="navbar-logolink">
                        <FontAwesomeIcon icon={faMap} className="navbar-icon"/>
                        <h2 >CoMap</h2>
                    </Link>
                </div>
                <ul> 
                <li>
                    <Link to="/" className="navbar-link"><FontAwesomeIcon icon={faHome} className="navbar-icon"/><span>Home</span></Link>
                </li>
                <li>
                    <Link to="/announce" className="navbar-link"><FontAwesomeIcon icon={faBullhorn} className="navbar-icon"/>Announce</Link>
                </li>
                <li>
                    <Link to="/register" className="navbar-link"><FontAwesomeIcon icon={faRegistered} className="navbar-icon"/>Register</Link>
                </li>
                {!getUser() &&(
                    <li>
                        <Link to="/login" className="navbar-link"><FontAwesomeIcon icon={faUser} className="navbar-icon"/>Login</Link>
                    </li>
                    )
                }
                {getUser() &&(
                    <li>
                        <a onClick={()=>logout(()=>props.history.push("/login"))} className="navbar-link"><FontAwesomeIcon icon={faArrowRightFromBracket} className="navbar-icon"/>Logout</a>
                    </li>
                )
                }
                </ul>
            </div>
        {getRole() &&(
            <div class="sidenav">
                <Link to="/addannounce" className="sidenav-link"><FontAwesomeIcon icon={faSyringe} className="sidenav-icon"/>เพิ่มประกาศวัคซีน</Link>
                {getRole()=='admin' &&(
                    <div>
                        <Link to="/hospital" className="sidenav-link"><FontAwesomeIcon icon={faHospital} className="sidenav-icon"/>จัดการโรงพยาบาล</Link>
                        <Link to="/addhospital" className="sidenav-link"><FontAwesomeIcon icon={faPlus} className="sidenav-icon"/>เพิ่มโรงพยาบาล</Link>
                    </div> 
                )
                }
                
            </div>
        )
        }
    
    </div>
        
    );
}
export default withRouter(NavbarComponent);