import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPost } from './redux/actions/postActions'
import Posts from './Posts'
import {InputGroup,Modal,Button, Nav, Navbar, Form, FormControl,Dropdown,DropdownButton} from "react-bootstrap";
import AddMovie from "./Addposts";
import { Link, useHistory } from "react-router-dom";
import Compressor from 'compressorjs'
import ReactStars from "react-rating-stars-component";
import { logout, updatingprofileimage } from './redux/actions/authActions';





const Profile = ({rating,searchname,commentschanged,postschanged}) => {


const dispatch=useDispatch()
const auth = useSelector(state => state.auth)
const user = useSelector(state =>state.auth.user)

const history = useHistory()
const[ file,setfile]=useState();
const[ selected,setselected]=useState(); 
const fileInput=useRef()

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
    





const isLoading = useSelector(state => state.appState.isLoading)
const myposts = useSelector(state => state.posts.myposts)
const [filtermovie, setfiltermovie] = useState(myposts);
  
function addhandlechange(e) {
  e.preventDefault();
 fileInput.current.click(); 
}



function updating() {

    setfiltermovie(
      myposts.filter(
        (elm) =>
          elm.name.toLowerCase().includes(searchname.toLowerCase()) &&
          elm.rating.vote >= rating
      )
    );
  }
    
  function handleChange(e)
  {
    setfile(e.target.files[0] )
     //new Compressor(e.target.files[0], {
      //quality: 0.8,
      //success(result) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setselected(reader.result)
            reader.readAsDataURL(file)
          }
     //   }
  
        
 // }) 
  }

    


  const updatingphoto=()=>{

    if((!file)||(!auth.user._id))
  {alert("You must add a photo ")
  return null}
  new Compressor(file, {
    quality: 0.8,
    success(result) {
        const reader = new FileReader()
        reader.readAsDataURL(result)
        reader.onloadend = () => {
         setselected(reader.result)
        dispatch(updatingprofileimage( {image:reader.result },auth.user._id))
        }

    }
})
  }


  
  

  

  

 

  useEffect(() => {
       updating()
    },[myposts,searchname,rating])


const disconnect=()=>{
  history.push('/')
    dispatch(logout())
  }

useEffect(() => {
   dispatch(getMyPost())
}, [postschanged])



    return (
        <div    >
         


      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la photo de profile</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <InputGroup ><Button className="upload" variant="success"   onClick ={addhandlechange} >Upload a Photo</Button></InputGroup>     
          <img style={{width:"50px",height:"50px"}} className src={selected} ></img>
          <Button variant="primary" onClick={updatingphoto}>
            Save a photo 
          </Button>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      
      
      
        </Modal.Footer>
      </Modal>
    




{auth.isAuth&&<div style={{display:"flex",width:"100%",justifyContent:"center"}}> <div>

{<img style={{width:"300px",height:"300px"}} src={auth.user.image.url} ></img>} 
<div style={{display:"flex",width:"100%",justifyContent:"center"}}>{`${auth.user.firstname} ${auth.user.lastname}`} </div>
</div>  </div>} 
<div style={{display:"flex",width:"100%",justifyContent:"center"}} > <Button   onClick ={handleShow}  variant="info" className="buttonmodal" >updating profile image </Button></div>


  {!(isLoading.ref==="GetMyPosts")&&<div className="movieflexing">
       {filtermovie.map((elm)=><Posts   key={elm._id} commentschanged={commentschanged}
    id={elm._id} rating={elm.rating}
   src={elm.image.url} name={ elm.name} owner={elm.owner} /> )} 


        </div>}
       
        <input type="file"    ref={fileInput} style={{display:'none'}} onChange={handleChange} ></input> 

       
        </div>
    )
}

export default Profile
