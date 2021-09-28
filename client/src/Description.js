import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';

import { addcomment, getcomment, getPosts, vote } from './redux/actions/postActions';



const  Description = ({setclass5,match,movie,commentschanged,setshowserach}) => {
  const dispatch = useDispatch()
  const [comment, setcomment] = useState("")
  useEffect(() => {
  dispatch(getcomment({postid:match.params.id}))
  
}, [])

  const user = useSelector(state =>state.auth.user)
  
  const [themovie, setthemovie] = useState(movie.find(elm=>elm._id===match.params.id))
  const [show, setshow] = useState(false)

useEffect(() => {
  setshowserach(false)
  setclass5("description")
    return () => {
      setshowserach(true)
      setclass5("")
    
  }
}, [])




  useEffect(() => {
   
    if(movie.find(elm=>elm._id===match.params.id))
    {
      setshow(true)
      
      setthemovie(movie.find(elm=>elm._id===match.params.id))
    }
    else setshow(false)

    console.log("themovie is",movie)

  }, [movie])
  
 



const comments= useSelector(state => {if(themovie){
  var x=state.comments.allcomments.findIndex(elm=>Object.keys(elm)==themovie._id)
  if((x>=0)&&(state.comments.allcomments[x][themovie._id]))
  return state.comments.allcomments[x][themovie._id]}})


const onStarClick=(nextValue, prevValue, name)=>{
 //dispatch(vote(_id,{rating:nextValue},owner._id))
 if(user._id)
 dispatch(vote(themovie._id,{rating: {vote:nextValue,voter:user._id}},themovie.owner._id))

}
useEffect(() => {
if(show===true)
  dispatch(getcomment({postid:themovie._id}))
 
}, [commentschanged,show])
const commenting =(e)=>{
  e.preventDefault()
  dispatch(addcomment({postid:themovie._id,owner:user._id,body:comment}))
   setcomment("")    
   } 


  return (
    <div>
       {!show && <div  className="e"  style={{display:"flex",justifyContent:"center" ,alignItems:"center"  , width:"100%",height:"100%", display:'flex',alignItems:"center"}} >Error page not found
           <br/>
          </div>}
           
           
            {(show) &&<div className="description">
           {themovie.image&&<img style={{width:"30vh",height:"30vh"}} src={themovie.image.url} ></img>}
           <h1 style={{width:"70%" ,backgroundColor:'aqua',textAlign:"center ",fontFamily:'Roboto'}}>{themovie.name}</h1>
           <br/>
           <p style={{width:"70%",fontWeight:"bold",fontFamily:'Roboto'}}>{themovie.description}</p>
           <h2>Rate the movie</h2>
           <StarRatingComponent value={themovie.rating.vote} starCount={5} onStarClick={onStarClick} size={24} />
           <div>some of vote is({themovie.rating.some}) number of voter ({themovie.rating.numberofvoter} ) </div>
           <div style={{width:"70%",height:"60px",border:"solid 1px",borderRadius:"6px"}} >

           <input type="text" value={comment} name="comment" style={{width:"80%",height:"100%"}}  onChange={(e)=>setcomment(e.target.value) } ></input>
           <input type="submit"  value="commenter" name="comment" style={{width:"20%",height:"100%"}} onClick={commenting}  ></input>
           </div>
           {comments&&comments.map((elm,index)=><div style={{display:"flex",alignContent:"center" ,width:"100%" ,wordBreak:"break-all",border:"1px solid"}}  ><img style={{width:"50px",height:"50px"}} src={elm.owner.image.url} /><br/>  {`${elm.owner.firstname} :`} <br/> {elm.body} 
  </div>)}
             </div>}
            

        </div>
  
  )
}


export default Description
