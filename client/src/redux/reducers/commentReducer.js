const { GET_COMMENT_SUCCESS } = require("../actions/commentTypes")

const initState = {
    allcomments:[{}]
}
const commentReducer = (state = initState, { type, payload }) => { 
    switch (type) {
        case GET_COMMENT_SUCCESS:
             if(payload.length>0)
            { var ob={}
            ob[payload[0].postid.toString()]=payload
            var index=state.allcomments.findIndex(elm=>Object.keys(elm)==(payload[0].postid).toString())
            if(index>=0)
            {console.log(index)
              
              state.allcomments[index]=ob
              console.log("push1",state.allcomments)
              }
              else
            {state.allcomments.push(ob)
              console.log("pushtwo",state.allcomments
              
              )
            }
            }
      return  {
          ...state,allcomments:state.allcomments
        
            }
        
      default:
        return state
    }}
    export default commentReducer