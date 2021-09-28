// do emit in the use effect



import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//import { io } from 'socket.io-client'
import { getconversation, sendingmessage, } from './redux/actions/conversationsAction'

const ConversationWith = ({match,socket,convesationchanged}) => {




  let exist
  let x=true
   const [update, setupdate] = useState(false)
  const setRef = useCallback(node => {
    if (node) {
       node.scrollIntoView({ smooth: true })
      //window.scrollTo(xpos, ypos)
    }
  }, [])
  const [last, setlast] = useState({})
  
  const dispatch = useDispatch()
    const user = useSelector(state =>state.auth.user)
    const users = useSelector(state => state.conversation.allusers)
    const conversation = useSelector(state => state.conversation.conversation)

    const [value, setvalue] = useState("");
  const handleclick = (e) => {
    e.preventDefault();
     exist=users.filter(elm=>elm._id==match.params.id).length
    if((match.params.id!=="all")&&(exist==1))
   { dispatch(sendingmessage({between:[user._id,match.params.id],message:{content:value,sender:user._id}}))
    setvalue("");}
  };

  //let socket = io("http://localhost:4000/api/socket");
  
   
  //console.log("socket is ",socket);
  
  
  /*  console.log("change")
  exist=users.filter(elm=>elm._id==match.params.id).length
  if((user._id!=="")&&(match.params.id!=="all")&&(exist==1))
  { dispatch(getconversation([user._id,match.params.id]))}
  */
 
 
 
 
 
 
 
 
 useEffect(() => {
   exist=users.filter(elm=>elm._id==match.params.id).length
   if((user._id!=="")&&(match.params.id!=="all")&&(exist==1))
   { dispatch(getconversation([user._id,match.params.id]))
    console.log("the users " ,users.find((elm)=>elm._id=="611b73e282fb7021bccb85d4"))
    console.log(" the ", user)
  }}, [users,user._id,match.params.id,convesationchanged])
  
  useEffect(() => {
    
    if(conversation.message.length>0)
    {setlast(conversation.message[conversation.message.length -1])}
    var z= document.getElementsByClassName("message").length-1
    var element= document.getElementsByClassName("message")[z]
    if (element)
    element.scrollIntoView();
    
  }, [conversation])
  
  
  
  
  
     useEffect(() => {
       console.log("socket is",socket)
       console.log(conversation._id)
       
       if((conversation)&&(user._id)&&(socket!=undefined))
       {   console.log("itttttt")
         
         
         socket.emit("join-room","slm")
         
         
         socket.on("j",(conversation)=>console.log("joined",conversation))
         
         socket.on("change",(change)=>{
           setupdate(!update)
           x=!x;
           console.log("x is",x)}
           )
         }
       }, [socket,user._id,conversation])
  return (
    <div style={{height:"100%",width:"100%" }}>

      

          <div style={{width:"100%",height:"80%",overflow:"auto"}}>{conversation.message.map((elm)=><div  className="message"
          
          
          
          style={{ display:"flex",alignItems:"center",  backgroundColor:(elm.sender==user._id )?"#48494B":"blue",borderRadius:"5px" ,marginBottom:"20px",color:"white",fontSize:"bold",float:(elm.sender==user._id )?'right':"left",clear:"both" ,width:"50%",wordBreak:"break-all"}} >
          {conversation.between.find((m)=>m._id==elm.sender )&&conversation.between.find((m)=>m._id==elm.sender ).image.url     &&<img 
          src={conversation.between.find((m)=>m._id==elm.sender ).image.url}   
          style={{backgroundColor:"white",width: "5vh",height :"5vh",borderRadius:"50%"}} />}
            {!conversation.between.find((m)=>m._id==elm.sender )
                &&
                ( (users.find((m)=>m._id==elm.sender ))||(user._id!=""))&&<img 
                src={(user._id==elm.sender)?user.image.url:users.find((m)=>m._id==elm.sender ).image.url}   
                
                style={{backgroundColor:"white",width: "5vh",height :"5vh",borderRadius:"50%"}} />}       
                 {elm.content}</div>)} </div>

               
        <div style={{display:"flex",width:"100%",height:"20%"}}>
          <Form.Control style={{width:"80%",height:"100%"}}
            as="textarea"
            value={value}
            onChange={(e) => setvalue(e.target.value)}
            rows={3}
            />

          <Button  style={{width:"80%",height:"100%"}}onClick={handleclick}>
            Sending
          </Button>
        </div>   
        </div>
    )
  }
  
  export default ConversationWith
  
  //ref={(elm.sender==last.sender)? setRef : null}