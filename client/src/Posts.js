
import StarRatingComponent from 'react-star-rating-component';

import ReactStars from "react-rating-stars-component";
import {Card,Button, InputGroup, Form} from 'react-bootstrap'
import {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addcomment, deletepost, getcomment, getotherprofile, updatepost, vote} from './redux/actions/postActions';
function Posts({src,name,id,owner,rating,commentschanged,})
{   var rate
  const dispatch = useDispatch()
  const user = useSelector(state =>state.auth.user)
  const comments= useSelector(state => {var x=state.comments.allcomments.findIndex(elm=>Object.keys(elm)==id)
    if((x>=0)&&(state.comments.allcomments[x][id]))
    return state.comments.allcomments[x][id]})
  const [comment, setcomment] = useState()

function fndelet()
  {
    dispatch(deletepost(id,user._id))
  }

  const onStarClick=(nextValue, prevValue, name)=>{
   if(user._id)
    dispatch(vote(id,{rating: {vote:nextValue,voter:user._id}},owner._id))
  


  }
  useEffect(() => {
    dispatch(getcomment({postid:id}))
    
  }, [commentschanged])
  const commenting =()=>{
dispatch(addcomment({postid:id,owner:user._id,body:comment}))
setcomment("")    
 
}   
useEffect(() => {
 
}, [])

    return( <div style={{margin:"50px"}}  >
    <Card  style={{ width: '18rem' }}>
  <Card.Img variant="top" src={src}  style={{ width: '18rem' , height:"20rem"}} />
  
  <Card.Body>
    <Card.Title>{name}</Card.Title>
    <Card.Text>
    uploaded by :
    <br></br>
    <br></br>
   <Link to ={`/other/${owner._id}`} > <img style={{borderRadius:"50%",height:"50px",width:"50px"}} src={owner.image.url}/></Link>
   <br></br>      
  <Link to={`/other/${owner._id}`} > <span className="textt">{owner.firstname} {owner.lastname}</span></Link>
    </Card.Text>
  </Card.Body>
  <div >
  <StarRatingComponent name="rating" value={rating.vote} starCount={5} onStarClick={onStarClick} size={24} /><br/>
  some of vote is({rating.some}) number of voter ({rating.numberofvoter} ) </div>
  {(user._id==owner._id)&&<Button  className="deletebutton" variant="danger" onClick={fndelet}  >Delte</Button>}
   <Link to={`/movie/${id}`} className="seemore"> <Button className="seemore1"  variant="primary"  >Watch the trailer</Button> </Link>
    <br/>

    <InputGroup>
      {(user._id!="")&&<Form.Control as="textarea"   type="text" value={comment} onChange={(e)=>setcomment(e.target.value) } /> }
      {(user._id!="")&& <InputGroup.Text onClick={commenting}>commnet </InputGroup.Text>}
   </InputGroup>
  
  {comments&&comments.map((elm,index)=><div style={{display:"flex",alignContent:"center" ,width:"100%" ,wordBreak:"break-all",border:"1px solid"}}  ><img style={{width:"50px",height:"50px"}} src={elm.owner.image.url} /><br/>  {`${elm.owner.firstname} :`} <br/> {elm.body} 
  </div>)}
  
</Card>  
    
    </div>)
   
 
}



export default Posts 