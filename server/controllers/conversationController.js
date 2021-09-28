const Conversation = require("../models/conversations")


const getconversation = async (req, res) => {
try {
   
   let conversation = await Conversation.findOne({ between: req.body })
   if (!conversation) {
      let search = req.body.reverse()
      conversation = await Conversation.findOne({ between: search }).populate({path:"between"})
   }
   if (!conversation)
   { conversation=await new Conversation({ between: req.body }).save()
   //conversation = await Conversation.findOne({ between: req.body })
       
}
//console.log("theconversation is " ,conversation)
   res.status(200).json(conversation)
}  
   

catch (error) {
   console.log("there is an error from add friend")
}}

const sendingmessage = async (req, res) => {
   try {
       
     let search = req.body.between        
      let theconversation = await Conversation.findOne({ between: search})
      if (!theconversation) {
          search = search.reverse()
         theconversation = await Conversation.findOne({ between: search })
       //    console.log("the conversation message",theconversation.message)
      }

       theconversation.message.push(req.body.message)
        let addnewmessage=theconversation.message
      // console.log(addnewmessage)

      const updatedconversation = await Conversation.findOneAndUpdate({ between: search }, { message: addnewmessage })
      res.status(200).json(updatedconversation)

   } catch (error) {
      console.log(error)
   }

}





module.exports = { getconversation, sendingmessage }