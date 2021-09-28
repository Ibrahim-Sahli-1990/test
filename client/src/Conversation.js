import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route,useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import ConversationWith from "./ConversationWith";
import { getconversation, GEtUSERS, sendingmessage } from "./redux/actions/conversationsAction";

export const Conversation = ({match,setclass4,setshowserach,socket,convesationchanged,userschangeds}) => {
  const history = useHistory()

  const users = useSelector((state) => state.conversation.allusers);
  const user = useSelector(state =>state.auth.user)

 
  const text = useRef();
  const dispatch = useDispatch()
  ///////////////////////////////////////focus on between
 
  
  useEffect(() => {
    setshowserach(false)
    setclass4("conversation")
    
    
  }, [])
  useEffect(() => {
    
    return () => {
      setshowserach(true)
      setclass4("")
      
    }
  }, [])
  
  
  useEffect(() => {
    if(user.id=="")
    
    history.push("/")
  }, [user._id])
  
    useEffect(() => {
      dispatch(GEtUSERS());
      console.log("userchaged bbbbbbbbbbbbbbbbbbbb")
    }, [userschangeds,user._id]);
  
  return (
    <div className="x"  style={{bottom:"0px" ,   display:"flex", width:"100%",height:"100%" }}>
      
      <div style={{backgroundColor:"#41D9FE",color:"white" ,width:"30%"}}>
         
       

        {users.map((elm) => (
          <Link className="l" to={`/conversation/${elm._id}` }
          className={(elm._id===match.params.id)?"ll":"l"}
        >
            <div className="divuser" style={{ display:"flex",alignItems:"center",  height:"10vh",textDecoration:"none",color:"white"}} >
              <img  style={{width:"5vh",height:"5vh",borderRadius:"50%" ,backgroundColor:"white" ,marginRight:"5px" }}  src={elm.image.url}/> {`${elm.firstname} ${elm.lastname}  :  `}{" "}   <span> </span> {elm.isconnected&&<span style={{color:"white" ,marginLeft:"5px"}}> {' '} {`  is connected`}</span>}{!(elm.isconnected)&& <span style={{color:"white",marginLeft:"5px"}}> is disconnected</span>}
            </div>
          </Link>
        ))}
        
      </div>

     

      <div  className="y" style={{width:"70%",height:"100%"}} >
        
          <Route
            exact
            path="/conversation/:id"
            render={(props) => <ConversationWith  {...props}  convesationchanged={convesationchanged} socket={socket}  />}
          />
        </div>

      
    </div>
  );
};
//type="submit" value="send"
//<input className="textarea"  value={value} onChange={(e) => setvalue(e.target.value)}></input>
//[0]  disconnected:  koIDa8WfcQPLnzEVAAAp
//[0] connected with koIDa8WfcQPLnzEVAAAp
