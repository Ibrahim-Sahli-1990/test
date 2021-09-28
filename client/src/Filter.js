import { useState,useEffect, useCallback } from "react";

import ReactStars from "react-rating-stars-component";
import {Button, Nav, Navbar, Form, FormControl,Dropdown,DropdownButton, ListGroup} from "react-bootstrap";
import AddMovie from "./Addposts";
import { useDispatch ,useSelector} from "react-redux";
import {logout} from "./redux/actions/authActions"
import { Link, useHistory ,Redirect} from "react-router-dom";
import Posts from "./Posts";
import logo from "./logo.png"




const Filter = ({ searchname,rating,x,commentschanged,movie}) => {

 console.log('xfrom filter',x)
 
  const user = useSelector(state =>state.auth.user)

  
  

 
  
  window.onscroll = function(){
   var  scroll = window.scrollY
    //var offsetIndex = getOffsetIndex(scroll,offset);
  //  console.log(scroll)
    var height =window.height
    //console.log("this is the height",height)
  }

 const  dispatch= useDispatch()
 const auth = useSelector(state => state.auth)
//console.log(moviepost)   



const [filtermovie, setfiltermovie] = useState(movie);
  function updating() {
  console.log(searchname)
    setfiltermovie(
      movie.filter(
        (elm) =>
          elm.name.toLowerCase().includes(searchname.toLowerCase()) 
          &&elm.rating.vote >= rating
      )
      
      
      );
      console.log(filtermovie)
  }
 
  

  
  


  useEffect(() => {
       updating()
       
    },[searchname,rating,movie])

    const history = useHistory()


useEffect(() => {
  history.push('/')
}, [])




return (
    
  
  

 <div>
  <div  >
     

    
     {filtermovie.map((elm)=><div  ><Posts commentschanged={commentschanged}
     rating={elm.rating}
  key={elm._id}
  id={elm._id} 
  src={elm.image.url} name={ elm.name}
  owner={elm.owner} /></div> )}  </div>

         
    </div>
  );
};



/* {!(isLoading.ref="")&&<MovieList
movie={filtermovie}
/>} */

export default Filter;
//ref={(elm._id==last._id)? setRef : null} 
