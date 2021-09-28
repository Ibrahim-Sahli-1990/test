import ReactStars from "react-rating-stars-component";

import React, { useRef, useState } from 'react'
import {Button,Modal,InputGroup,FormControl, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {addPost} from "./redux/actions/postActions"
import Compressor from 'compressorjs'






function Addposts() {
  const user = useSelector(state =>state.auth.user) 
 
  const dispatch= useDispatch()  
  const[ file,setfile]=useState(); 
  const firstname = useRef()

    const fileInput=useRef()
    const moviename=useRef();
    const description=useRef();
   var trailer=useRef();
    const [Rating,setRating]=useState(1);
    
    function handleChange(e)
  {
    setfile(e.target.files[0] )  

      
  }
const [info, setinfo] = useState()
  

const savemovie=(e)=>{
    e.preventDefault();
if (info.name=="" )
{alert ("you should give a name to movie " )
return null;}
//console.log("test",trail.current.value)
if (info.trailer=="")
{alert ("you should put  a url of  movie " )
return null;}
if (info.description=="" )
{alert ("you should give a description to movie " )
return null;}
 
if(!file){
  alert("You can't add the movie twice successively ")
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
          
          console.log("info is",info)
         // console.log("trail is",firstname.current.value)
          dispatch(addPost({image: reader.result, 
            trailer:info.trailer,
            description:info.description,
          rating:{voters:[{rating:Number(Rating),voter:user._id}],numberofvoter:1,some:Number(Rating),vote:Number(Rating)},
            name:info.name,}))   
          }
    }
})
handleClose()  
}

  
  function addhandlechange(e) {
    e.preventDefault();
   fileInput.current.click(); 
}
const ratingChanged = (newRating) => {
setRating (newRating)};
    
    
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
    
    
    
    
    return <div style={{height:"100%",display:"flex",alignItems:"center",width:"100%"}}>
       <div style={{height:"100%",display:"flex",alignItems:"center",width:"100%"}} onClick={handleShow}>
     Adding new movie
      </div>
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup>
      <InputGroup.Text >Name of Movie</InputGroup.Text>
      <Form.Control    type="text" onChange={(e)=>setinfo({...info,name:e.target.value}) } /> 
      </InputGroup>
      <InputGroup>
      <InputGroup.Text >descritiopn of Movie</InputGroup.Text>
      <Form.Control   type="text" onChange={(e)=>setinfo({...info,description:e.target.value}) }
   />
      </InputGroup>
      <InputGroup>
      <InputGroup.Text >trailer of Movie</InputGroup.Text>
      <Form.Control  placeholder="you can add a simple youtube link"  type="text"  
      onChange={(e)=>setinfo({...info,trailer:e.target.value}) }
      
      />
      
      </InputGroup>
    
 
  </Modal.Body>
<InputGroup >
<Button className="upload" variant="success"   onClick ={addhandlechange}     >Upload a Movie</Button>
</InputGroup>

<InputGroup>
      <ReactStars
    count={5}
    onChange={ratingChanged}
    size={30}
    activeColor="#ffd700"
    value={1}
/>
</InputGroup>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={savemovie}    >
            Save Movie
          </Button>
        </Modal.Footer>
      </Modal>
    
    <input type="file"    ref={fileInput} style={{display:'none'}} onChange={handleChange} ></input> 


    </div>
  
}
export default Addposts
//
//