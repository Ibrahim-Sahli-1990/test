const express = require('express')
//const dbConnect = require('./helpers/dbConnect')
var table=[]
let tab=[]
const mongoose = require('mongoose')
const config = require('config')
const axios =require('axios')
const path=require("path")
//const folder=require('../client/build')

mongoose.connect(config.get("DB_URI.URI"), {  useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,})
 const db = mongoose.connection; 

const fn=async(info)=>{
   try {
       
       await axios.put("http://localhost:5000/api/user/disconnect/"+info) 
   } catch (error) {
       console.log(error)
   }
}
const fnall=async(info)=>{
    try {
        
        await axios.put("http://localhost:5000/api/user/disconnectall") 
    } catch (error) {
        console.log(error)
    }
 }
 
fnall() 

const io = require('socket.io')(4000,{ 
 cors:   {
     origin :["http://localhost:3000"], 
 } 
}) 
io.of("/api/socket").on("connection",(Socket)=>{  
    if(Socket.handshake.query.y!=undefined)
    {table.push(Socket.handshake.query.y+" "+Socket.id)     
     console.log("table of connexion",table)}
    Socket.on("join-room",(conversation)=>{
        Socket.join(conversation)
        Socket.to(conversation).emit("j",conversation)
        
        
    })
     Socket.on("userconnect",(id)=> {// table.push(Socket.id+" "+id)     
     //console.log("table of connexion",table)
    } )

        Socket.on("disconnect", () => {
            if(Socket.handshake.query.y){
                console.log("table is ",table)
                console.log(" disconnected:tablecontained " , tab= table.filter((elm)=>elm.includes(Socket.handshake.query.y)));
                if(tab.length==1)
                {fn(Socket.handshake.query.y)
                } 
                table=table.filter((elm)=>!elm.includes(Socket.id))
                tab=tab.filter((elm)=>!elm.includes(Socket.id))
                console.log("table after ",table)
                console.log("tab after ",tab)
            }
          console
           

            
        });
        // console.log(pa,p)) 
    })
    
    
    
    
    
    const app = express()
    const cors = require('cors')
    
    const PORT = config.get('SERVER_CONFIG.PORT') || 5000
    //dbConnect()
    //middlewares
    app.use(cors())
    db.once("open", () => { console.log("Db Conncted"); 
    //conversations from the server
    const messages =  db.collection("conversations") 
    let messagestream =  messages.watch();  
    const users=db.collection("people")
    let usersstream=users.watch();
    let comments=db.collection("comments")
    let commentstream=comments.watch();
    let posts=db.collection("posts")
    let postsstream=posts.watch();
    
    messagestream.on("change", (change) => { 
        console.log(" messagechange heppaned") 
        io.of("/api/socket").emit("messageschange",change)}) 
    usersstream.on("change", (change) => { 
            console.log(" user change heppaned") 
            io.of("/api/socket").emit("userschange",change)}) 
   commentstream.on("change", (change) => { 
               console.log("comment change heppaned") 
                io.of("/api/socket").emit("commentschange",change)})
    postsstream.on("change", (change) => { 
        console.log("postschange heppaned") 
        io.of("/api/socket").emit("postschange",change)})                 
        

    })

 /*    io.of("/api/socket").on("join-room",(conversation)=>{
        io.of("/api/socket").join(conversation)
        io.of("/api/socket").to(conversation).emit("joined",conversation)
        
        
    }) */



app.use(express.json({ limit: '50mb' }))

app.use('/api/user', require('server/routes/userRoutes')) 
app.use('/api/post', require('server/routes/postRoutes'))  
app.use("/api/conversation",require("server/routes/conversationRoutes"))
app.use("/api/comment",require("server/routes/commentRoutes"))

if (process.env.NODE_ENV==="production")
{
    app.use(express.static(path.join(__dirname,'client/build')))
    app.get("*",(res,req)=>res.sendFile(path.join(__dirname,'client','build','index.html')))

}
 
app.listen(PORT, () => { 
    console.log(`Application is running on http://localhost:`)
})

