import { CLEAR_ERROR, SET_ERROR, START_LOADING, STOP_LOADING } from "../actions/appStateTypes"

const initState = {
 detail:{
       password:"",
       email:""
       
   } ,
  
       
    errors: {
        
    },
    
    isLoading: {
        state: false,
    },
}

const appStateReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: { state: true, ref: payload }
            }
        case STOP_LOADING:
            return {
                ...state,
                isLoading: { state: false ,ref:"stoploading"}
            }
        case SET_ERROR:
            
        if(payload)return {
                ...state,
                errors: payload[0]?payload[0].msg:"",

                detail:{password:payload.password?payload.password.msg:"",
                email:payload.email?payload.email.msg:""}
        }
            return {...state }
        case CLEAR_ERROR:
            return {
                ...state,
                errors: null
            }
        default:
            return state
    }
}

export default appStateReducer