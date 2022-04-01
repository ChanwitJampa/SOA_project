import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import {Link,withRouter} from "react-router-dom";
import "./LoginComponent.css";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate } from "../servies/authorize";


const LoginComponent=(props)=>{
    const [user,setUser]=useState({
        email:"",
        password:"",
    })
    const {email,password}=user
    const inputValue=name=>event=>{
        //console.log(name,"=",event.target.value)
        setUser({...user,[name]:event.target.value});
    }
    const signinForm=(event)=>{
        event.preventDefault();
        axios.post(`http://localhost:5000/api/login`,{email,password}).then(res=>{
            console.log(res.data)
            setUser(res.data)
            console.log(user)
            //การยืนยันตัวตน
            authenticate(res,()=>props.history.push("/"))
        })
        .catch(err=>{
            Swal.fire(
                'เข้าสู่ระบบไม่สำเร็จ',
                'Email or Password is wrong',
                'error',
                err.response.data.error,
               )
        })
    }

    return(
        <div>  
            <NavbarComponent/>
            <div className="container">
                <div className="outerLogin">
                    <div className="innerLogin">
                        <form onSubmit={signinForm}>
                            <h3>Login</h3>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter email" onChange={inputValue("email")}/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" id="password" onChange={inputValue("password")}/>
                            </div>

                            <p className="forgot-password text-right">
                                Don't have an account <Link to="/register" >Register</Link>
                            </p>
                            
                            <button type="submit" className="btn btn-danger" >Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(LoginComponent);
