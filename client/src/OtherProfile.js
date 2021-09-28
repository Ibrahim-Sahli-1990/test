import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Posts from './Posts'
import { getotherposts, getotherprofile } from './redux/actions/postActions'
import { Link, useHistory } from "react-router-dom";

import {Button, Nav, Navbar, Form, FormControl,Dropdown,DropdownButton} from "react-bootstrap";
import { getotheruser, logout } from './redux/actions/authActions';
import ReactStars from "react-rating-stars-component";
import logo from "./logo.png"



const OtherProfile = ({match,searchname,rating,postschanged,commentschanged,userschangeds}) => {
  const history = useHistory()

  
const dispatch = useDispatch()
const isLoading = useSelector(state => state.appState.isLoading)
const o = useSelector(state => state.posts.o)
const auth = useSelector(state => state.auth) 
const user = useSelector(state =>state.auth.user)

const error = useSelector(state => state.appState.errors)

if(auth.isAuth)
{if(auth.user._id===match.params.id)
history.push('/profile')}

window.onscroll = function(){
  var  scroll = window.scrollY
   //var offsetIndex = getOffsetIndex(scroll,offset);
   console.log(scroll)
   var windowheight =window.innerHeight
   console.log("windowheight",windowheight)
   var height =window.pageYOffset	
   console.log("window y offset",height)
 }

const [filtermovie, setfiltermovie] = useState(o);

function updating() {
  if(!(isLoading.ref==="getotherposts"))
  setfiltermovie(
        o.filter(
        (elm) =>
          elm.name.toLowerCase().includes(searchname.toLowerCase()) &&
          elm.rating.vote >= rating
      )
    );
  }
 //console.log("i'ts runnig ")
  

 
  

 

  useEffect(() => {
       updating()
    },[o,searchname,rating])





useEffect(() => {

 dispatch(getotherprofile(match.params.id))
 dispatch(getotheruser(match.params.id))
 console.log("userchanged")
}, [postschanged,userschangeds])
useEffect(() => {

  
{if(user._id===match.params.id)
history.push('/profile')}
}, [user._id])


          return (<div> <div style={{display:"flex",width:"100%",justifyContent:"center"}}>  
        {(error==="Cast to ObjectId failed for value \""+`${match.params.id}`+"\" (type string) at path \"_id\" for model \"person\"")&&<div class="error">User d'ont exist <div>
          <br></br><Link to ="/"><Button variant="secondary"> go back to home page</Button></Link></div> </div>}
       {!(error==="Cast to ObjectId failed for value \""+`${match.params.id}`+"\" (type string) at path \"_id\" for model \"person\"")&&<div className="profile"> <div>

          {<img style={{width:"300px",height:"300px",marginTop:"60px"}}  src={auth.otheruser.image.url} ></img>} 
        <div className="ecriture" >{`${auth.otheruser.firstname} ${auth.otheruser.lastname}`} </div>
          </div>  </div>}</div>
       
       {<div className="movieflexing">
   
       {filtermovie.map((elm)=><Posts commentschanged={commentschanged}
    key={elm._id}
  id={elm._id} rating={elm.rating}
   src={elm.image.url} name={ elm.name}
   owner={elm.owner} /> )}
 

  
       </div>
       }


       </div>
    )
}

export default OtherProfile
//<img src={"logo.png"||"https://image.freepik.com/vecteurs-libre/cliquez-vecteur-logo-film_18099-258.jpg"}  style={{marginRight:"50px"}}/>
        