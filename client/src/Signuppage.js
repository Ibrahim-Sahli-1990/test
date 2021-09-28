
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './redux/actions/authActions';
import { Link, useHistory } from 'react-router-dom';
import Compressor from 'compressorjs'

import {Form,Button} from 'react-bootstrap'



export default function Signuppage({setclass6,setshowserach, setshowbuttonregister,setclass3}) {
   


    const firstname = useRef()
    const lastname = useRef()
    const fileInput=useRef()
    const password=useRef()
    const[ file,setfile]=useState(); 
    

    const email=useRef()
  

    function addhandlechange(e) {
        e.preventDefault();
       fileInput.current.click(); 
    }

    const history = useHistory()
    const password_error = useSelector(state => state.appState.detail.password)
    const email_error = useSelector(state => state.appState.detail.email)
    const user_exist = useSelector(state => state.appState.errors)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
  
    useEffect(() => {
        if (auth.isAuth) {
            history.push('/')
        }

    }, [auth.isAuth])
    useEffect(() => {
     console.log(password_error)
     console.log(email_error)
     console.log("user ",user_exist)
     

      }
    , [password_error,email_error,user_exist])



    useEffect(() => {
      setshowserach(false)
      setshowbuttonregister(false)         
        }, [])
        useEffect(() => {
          setclass6("connecting")

      
         return () => {
           setclass6("")
        setshowserach(true)
        setshowbuttonregister(true) 
      setclass3("")     }
       }, [])
     
    
    const handleSubmit = (e) => {
        e.preventDefault()
     /*   if(email.current.value.length===0)
       {
         alert("please enter a email")
         return null
       } */
       if(firstname.current.value.length===0)
       { alert("please enter a Firstname")
         return null         
       }
       if(lastname.current.value.length===0)
       {
        alert("please enter a Lastname")
         return null
       } 
       if(!file)
        {alert("You must add a photo ")
        return null}
        new Compressor(file, {
          quality: 0.8,
          success(result) {
              const reader = new FileReader()
              reader.readAsDataURL(result)
              reader.onloadend = () => {
               
              dispatch(register({image: reader.result, 
                firstname:firstname.current.value,
               lastname:lastname.current.value,
                password:password.current.value,
                email:email.current.value}))
//                setimage(reader.result)
              }
      
          }
      })
       // console.log(info)

    }

    function handleChange(e)
    {
      setfile(e.target.files[0] )  
  
  
        
    }

   
    

    return (
        <div style={{marginTop:"60px"}}>

<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className="space">Email address </Form.Label>
    {email_error&&<Form.Label className={email_error?"reding":"blue"}>   {` : ${email_error} `}</Form.Label>}
    {user_exist&&<Form.Label className={"reding"}>   {` : ${user_exist} `}</Form.Label>}

    <Form.Control isInvalid={(email_error||user_exist)?true:false} type="email" ref={email} placeholder="Enter email" />
    <Form.Text className="text-muted">
         <br/>
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label className="space">Password</Form.Label>
  {password_error&&<Form.Label className={password_error?"reding":"blue"}>{` : ${password_error}`}</Form.Label>}

    <Form.Control isInvalid={password_error? true:false}  type="password" ref={password} placeholder="Password" />
  <Form.Text>
      
  </Form.Text>
  <Form.Label> First Name </Form.Label>
  <Form.Control size="lg" type="text" placeholder="Your first Name Here" ref={firstname} />
  <br />
  <Form.Label>Last Name</Form.Label> 
  <Form.Control  size="lg" type="text" placeholder="Your Last Name Here"ref={lastname} />
  <br />

  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <div className="centring" ><Button className="centringb" variant="success"   onClick ={addhandlechange}  >Upload a your image</Button>  </div>
  <div className="centring" ><Button className="centringb"  onClick={handleSubmit} variant="primary" type="submit">REGISTER</Button></div>
  


  </Form.Group>

  


</Form>






                            <input
                                ref={fileInput} 
                                accept="image/*"
                                style={{display:'none'}} 
                                type="file"
                                onChange={handleChange}
                            />



                   
                  


                        



        </div>
    );
}