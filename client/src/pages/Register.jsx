import React, { useEffect, useState, useReducer } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { languages } from "../assets/language";
import { Courses } from "../assets/Courses";

const initialState = {
  name:'',
  primarylanguage1:'',
  primarylanguage2:'',
  primarylanguage3:'',
  targetlanguage1:'',
  targetlanguage2:'',
  interestedPlan:'',
  submitted:'false'
};


function reducer(state, action){
  // console.log(action.value);
  // console.log(state);
  switch(action.type){
      case 'PLANG1_CHANGE' :{  return {...state , primarylanguage1: action.value}}
      case 'PLANG2_CHANGE' : return {...state , primarylanguage2: action.value};
      case 'PLANG3_CHANGE' : return {...state , primarylanguage3: action.value};
      case 'TLANG1_CHANGE' : return {...state , targetlanguage1: action.value};
      case 'TLANG2_CHANGE' : return {...state , targetlanguage1: action.value};
      case 'NAME_CHANGE' : return {...state , name: action.value};
      case 'COURSE_CHANGE' : return {...state , interestedPlan: action.value};
      case 'FORM_SUBMITTED' : return {...state , submitted : action.value};
  }
}

const Login = () => {
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");

  const [state, dispatch] = useReducer(reducer,initialState);//This contains all the additional states such as primarylanguage1, primarylanguage2 etc...

  //COPY PASTED METHODS
  const onLang1Change = (e)=>{
    dispatch({type : 'PLANG1_CHANGE',  value: e.target.value} );
  }

  const onLang2Change = (e)=>{
    dispatch({type : 'PLANG2_CHANGE',  value: e.target.value} );
}

const onLang3Change = (e)=>{
  dispatch({type : 'PLANG3_CHANGE',  value: e.target.value} );
}

const onTLang1Change = (e)=>{
  dispatch({type : 'TLANG1_CHANGE',  value: e.target.value} );
}

const onTLang2Change = (e)=>{
  dispatch({type : 'TLANG2_CHANGE',  value: e.target.value} );
}


  const handleRegisterSubmit = async (e) => {
    console.log(e.target.primarylanguage1.value);
    e.preventDefault();
    let name = e.target.name.value;
    let lastname = e.target.lastname.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;
    let primary_language_1 = e.target.primarylanguage1.value;
    let primary_language_2 = e.target.primarylanguage2.value;
    let primary_language_3 = e.target.primarylanguage3.value;
    let target_language_1 = e.target.targetlanguage1.value;
    let target_language_2 = e.target.primarylanguage1.value;

    if(name.length > 0 && lastname.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0){

      if(password === confirmPassword){
        const formData = {
          username: name + " " + lastname,
          email,
          password,
          primary_language_1,
          primary_language_2,
          primary_language_3,
          target_language_1,
          target_language_2
        };
        try{
        const response = await axios.post("http://localhost:3000/api/v1/register", formData);
         toast.success("Registration successfull");
         navigate("/login");
       }catch(err){
         toast.error(err.message);
       }
      }else{
        toast.error("Passwords don't match");
      }
    

    }else{
      toast.error("Please fill all inputs");
    }


  }

  useEffect(() => {
    if(token !== ""){
      toast.success("You already logged in");
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="register-main">
      <div className="register-left">
        <img src={Image} alt="" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="register-center">
            <h2>Welcome to our website!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="Name" name="name" required={true} />
              <input type="text" placeholder="Lastname" name="lastname" required={true} />
              <input type="email" placeholder="Email" name="email" required={true} />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required={true} />
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}      
              </div>
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required={true} />
                {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}        
              </div>
              <div>
              <label htmlFor="primarylanguage1">Primary language 1</label>
                <select onChange={onLang1Change} type="text" id="primarylanguage1" className="input" name="primarylanguage1" list="langs">
                {languages.map((langauge)=>{
                    return (<option key={langauge}>{langauge}</option>);
                })}
                </select>
              </div>
              <div>
              <label htmlFor="primarylanguage2">Primary language 2</label>
                <select onChange={onLang2Change} type="text" id="primarylanguage2" className="input" name="primarylanguage2"  list="langs">
                {languages.map((langauge)=>{
                    return (<option key={langauge}>{langauge}</option>);
                })}
                </select>
              </div>
              <div>
              <label htmlFor="primarylanguage3">Primary langauge 3</label>
                <select onChange={onLang3Change} type="text" id="primarylanguage3" className="input" name="primarylanguage3"  list="langs">
                {languages.map((langauge)=>{
                    return (<option key={langauge}>{langauge}</option>);
                })}
                </select>
              </div>
              <div>
              <label htmlFor="targetlanguage1">Target language 1</label>
                <select onChange={onTLang1Change} type="text" id="targetlanguage1" className="input" name="targetlanguage1"  list="langs">
                {languages.map((langauge)=>{
                    return (<option key={langauge}>{langauge}</option>);
                })}
                </select>
              </div>
              <div>
              <label htmlFor="targetlanguage2">Target language 1</label>
                <select onChange={onTLang2Change} type="text" id="targetlanguage2" className="input" name="targetlanguage2"  list="langs">
                {languages.map((langauge)=>{
                    return (<option key={langauge}>{langauge}</option>);
                })}
                </select>
              </div>
              <div className="register-center-buttons">
                <button type="submit">Sign Up</button>
                <button type="submit">
                  <img src={GoogleSvg} alt="" />
                  Sign Up with Google
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
