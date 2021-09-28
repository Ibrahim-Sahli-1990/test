import { useState, useEffect } from 'react'
import ReactStars from "react-rating-stars-component";

import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import Addposts from './Addposts'
import Filter from './Filter'
import Description from './Description';
import { Link, Route, Switch, } from "react-router-dom"
import { Redirect } from 'react-router'

import { FiMenu } from "react-icons/fi";
import { BsArrowBarDown } from "react-icons/bs";


import LoginPage from "./LoginPage"
import Profile from "./Profile"
import Signuppage from "./Signuppage"
import { getPosts } from './redux/actions/postActions';
import OtherProfile from './OtherProfile';
import { Conversation } from './Conversation';
import { Button, Dropdown, DropdownButton, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import logo from "./logo.png"
import { connect, disconnectuser, logout } from './redux/actions/authActions';
import { io } from 'socket.io-client'

function App() {
  var x
  //const isLoading = useSelector(state => state.appState.isLoading)
  const moviepost = useSelector(state => state.posts.postList)
  const user = useSelector(state => state.auth.user)
//const [socket, setsocket] = useState()
var socket
  const auth = useSelector(state => state.auth)
  const isLoading = useSelector(state => state.appState.isLoading)
  const [commentschanged, setcommentschanged] = useState(true)
  //const [userschanged, setuserschanged] = useState()
  const [u, setu] = useState()
  const [postschanged, setpostschanged] = useState(true)
  const [convesationchanged, setconvesationchanged] = useState(true)

  const [rating, setrating] = useState(0)
  const [searchname, setsearchname] = useState("")




  const dispatch = useDispatch()
  const fnx = () => {

    console.log("itworked")
  }


  const ratingChanged = (newRating) => {

    setrating(newRating)
  };
  const disconnect = () => {
    if (user._id!="")
     { console.log(user._id)
        dispatch(disconnectuser(user._id))
    dispatch(logout())}
  }

  const [class1, setclass1] = useState("topnav")
  const [class2, setclass2] = useState("themain")
  const [class3, setclass3] = useState("")
  const [class4, setclass4] = useState("")
  const [class5, setclass5] = useState("")
  const [class6, setclass6] = useState("")







  useEffect(() => {
    if (user._id != "") {
      setclass3("")
      
      socket=io.connect("http://localhost:4000/api/socket", { query: { "y": user._id } });
      dispatch(connect(user._id))
      if (socket != undefined) {
        console.log("socketis on")
        socket.on("messageschange", (change) => setconvesationchanged(change))
        socket.on("userschange", (change) => {
          ; console.log("change happened from app"); setu(change); console.log(u)})
        socket.on("commentschange", (change) => setcommentschanged(change))
        socket.on("postschange", (change) => setpostschanged(change))
      }
      
      // socket.on("connect",()=>{ socket.emit("userconnect",user._id)
      
      //})
    } else {
      setclass3("disconnected")
      socket= io.connect("http://localhost:4000/api/socket")
      if (socket != undefined) {
        console.log("socketis on")
        socket.on("messageschange", (change) => setconvesationchanged(change))
        socket.on("userschange", (change) => {
          ; console.log("change happened from app"); setu(change); console.log(u)})
        socket.on("commentschange", (change) => setcommentschanged(change))
        socket.on("postschange", (change) => setpostschanged(change))
      }    
      







    }


   

 console.log("the class 3",class3)

  }, [user._id])




  //const isLoading = useSelector(state=>state.appState.isLoading.state)
  //console.log(Loading)

  const [showserach, setshowserach] = useState(true)
  const [showbuttonlogin, setshowbuttonlogin] = useState(true)
  const [showbuttonregister, setshowbuttonregister] = useState(true)
  const myFunction = () => {
    if (class1 === "topnav") {
      setclass1("topnav responsive");
      setclass2("themain responsive1")
    } else {
      setclass1("topnav");
      setclass2("themain")
    }

  }

  useEffect(() => {
    dispatch(getPosts())
  }, [postschanged, u])
  return (<div style={{ width: "100%", height: "100vh", backgroundColor: 'yellow' }} >





    <div className={`${class1} ${class3} ${class4} ${class5}  ${class6}   `} id="myTopnav">
      <div className="div1 "><Link className="l" to="/"  >Home</Link></div><div className="div24"  ><div style={{width:"10vh",height:"10vh"}} /></div>
      {showserach &&<div className="div11"   ><div className="div23" ><Link className="l" to="/"  >Home</Link></div>
  
      <div style={{display :"flex" ,alignItems:"center"}}> 
        <input type="text" onChange={(e) => setsearchname(e.target.value)} placeholder=" search  name " style={{ height: "10vh", marginLeft: "10px", marginRight: "10px" }} ></input>
        <ReactStars style={{}} count={5} onChange={ratingChanged} size={24} activeColor="#ffd700" />
        </div>
        </div>}
        {!showserach&&<div className="div11 div22" ><Link className="l" to="/">Home</Link></div>}
        {(user._id!="")&&<div className="div2" >
        <Link className="l" 
        to="/conversation/all" 
        style={{ height: "10vh", width: "100%", textDecoration: "none", display: "flex", alignItems: "center" }} > conversation</Link>
        </div>}
      {(user._id!="")&&<div className="div2" ><Addposts></Addposts></div>}
      {(!auth.isAuth) && (showbuttonregister) && <div className="div2" ><Link className="l" to="/register"  >register</Link></div>}
      {(!auth.isAuth) && (showbuttonlogin) &&<div className="div2"><Link className="l" to="/login"  >signin</Link></div>}


      <div className="icon" >
      {(user._id!="")&&<div><Link className="l" to="/profile"> 
        <img src={auth.user.image.url} alt="Avatar" 
        style={{ width: "5vh", height: "5vh", borderRadius: "50%"}} />
          <div className="name" style={{ margin: "8px" }}>{auth.user.lastname} {auth.user.firstname}</div></Link></div>}

          {(user._id!="")&&<div className="disconnect" style={{ width: "100%", height: "100%" }} onClick={disconnect}>disconnect
        </div>}

        <div><FiMenu className={"FiMenu"} style={{ width: "40px", height: "50px" }} onClick={() => myFunction()}>click</FiMenu></div>
      </div>
    </div>
    <div  style={{overflow:"auto"}}   className={`${class2} ${class3} ${class4} ${class5} ${class6}     `}>
      
   

    <Switch>
       <Route exact path="/register" render={(props) => <  Signuppage {...props} search={false}
         setshowserach={setshowserach} setshowbuttonregister={setshowbuttonregister}  setclass3={setclass3}  setclass6={setclass6}  />} />

       <Route exact path="/login" render={(props) => <LoginPage   {...props} search={false}
         setshowserach={setshowserach} setshowbuttonlogin={setshowbuttonlogin} setclass3={setclass3} setclass6={setclass6} />} />

       {(user._id != "") && <Route exact path="/conversation/:id" render={(props) =>
         <Conversation  {...props} setshowserach={setshowserach} socket={socket}
         convesationchanged={convesationchanged}  userschangeds={u}  setclass4={setclass4} setshowserach={setshowserach}     />} />}
       {auth.isAuth && <Route exact path="/profile" render={(props) =>
         <Profile rating={rating} searchname={searchname} postschanged={postschanged} commentschanged={commentschanged} />} />}

       <Route path="/movie/:id" render={(props) =>
         <Description     {...props}   userschangeds={u} movie={moviepost} postschanged={postschanged} commentschanged={commentschanged} setshowserach={setshowserach} setclass5={setclass5} />} />
       <Route exact path="/other/:id" render={(props) =>
         <OtherProfile     {...props} movie={moviepost} rating={rating} searchname={searchname} commentschanged={commentschanged} postschanged={postschanged} userschangeds={u}/>} />

       <Route path="/" render={(props) => <Filter x={x}  {...props} movie={moviepost} rating={rating} searchname={searchname} commentschanged={commentschanged} postschanged={postschanged}  userschangeds={u} />}   ></Route>

     </Switch> 




     </div>

  </div>

  );


}
export default App;

//disconnected 
//<Route path="/" component={Filter}></Route>
/*           <div className="div2" > 

{(user._id !== "") && <Link to="/conversation/all"><button class="dropbtn">Conversation</button>
</Link>}
</div>




{showserach &&
  <input style={{width:"10%",height:"60px"}}
  type="text"
  placeholder="Search"
  onChange={(e) => setsearchname(e.target.value)}
  />}
  {showserach && <ReactStars classNames="ReactStars"
  count={5}
  onChange={ratingChanged}
  size={24}
  activeColor="#ffd700"
  />
}
              {(user._id!="")&&<Addposts/>}
          {auth.isAuth && 
           <div  className="textandimage"><Link to="/profile"><img className="imagenav" src={auth.user.image.url} alt="Avatar"  /></Link>
              <Link to="/profile"><div className="textnav"> {auth.user.lastname} {auth.user.firstname}</div></Link></div>}
          {auth.isAuth && 
             <div class="dropdown">
             <button class="dropbtn">Compte</button>
             <div class="dropdown-content">
             <div onClick={disconnect}>disconnect</div>
           
             </div>
           </div>}
              

           

          {(!auth.isAuth) && (showbuttonlogin) && <Link to="/login"><Button variant="warning" className="login">login</Button></Link>}

          {(!auth.isAuth) && (showbuttonregister) && <Link to="/register"><Button>register</Button></Link>}
 */  //

/*
<Switch>
       <Route exact path="/register" render={(props) => <  Signuppage {...props} search={false}
         setshowserach={setshowserach} setshowbuttonregister={setshowbuttonregister}  setclass3={setclass3}   />} />

       <Route exact path="/login" render={(props) => <LoginPage   {...props} search={false}
         setshowserach={setshowserach} setshowbuttonlogin={setshowbuttonlogin} setclass3={setclass3} />} />

       {(user._id != "") && <Route exact path="/conversation/:id" render={(props) =>
         <Conversation  {...props} setshowserach={setshowserach} socket={socket}
         convesationchanged={convesationchanged}  userschangeds={u}   />} />}
       {auth.isAuth && <Route exact path="/profile" render={(props) =>
         <Profile rating={rating} searchname={searchname} postschanged={postschanged} commentschanged={commentschanged} />} />}

       <Route path="/movie/:id" render={(props) =>
         <Description     {...props}   userschangeds={u} movie={moviepost} postschanged={postschanged} commentschanged={commentschanged} />} />
       <Route exact path="/other/:id" render={(props) =>
         <OtherProfile     {...props} movie={moviepost} rating={rating} searchname={searchname} commentschanged={commentschanged} postschanged={postschanged} userschangeds={u}/>} />

       <Route path="/" render={(props) => <Filter x={x}  {...props} movie={moviepost} rating={rating} searchname={searchname} commentschanged={commentschanged} postschanged={postschanged}  userschangeds={u} />}   ></Route>

     </Switch>  */



{/* <div className={classs}  id="myTopnav">
     <div className="div2">Home</div>
       <div className="div2 div3"><input type="text"  placeholder="search the post name"    /></div>
   
     <div className="div1" >News</div>
     <div className="div1" >Contact</div>
     <div className="div1" >About</div>
     
    
    <div >      <div  style={{width:"50px",height:"50px",backgroundColor:"red"}}  onClick={fn}    >click</div>
   </div>   
    <div  >
    <div >ibrahim sahli</div><img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png"  img/></div>
   
   </div> */}


   //<div className="disconnect">disconnect
   //<div className="disconnectbtn" onClick={disconnect}>disconnect</div></div> 
