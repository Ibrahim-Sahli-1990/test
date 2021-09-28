
import {  GETUSERS_SUCCESS, GET_THECONVERSATION_SUCCESS } from "../actions/conversationsTypes"

const initState ={
 
allusers:[],
conversation:{message:[],_id:"", between:[],}
}
const conversationReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GETUSERS_SUCCESS:

        return {...state,
          allusers:payload}

       case GET_THECONVERSATION_SUCCESS:
         return{...state,conversation:payload}
       
         default:
          return state 


    }}



    export default conversationReducer