const {GET_MY_POST_SUCCESS,GET_POST_SUCCESS,  GET_POST_COUNT_SUCCESS, DELETE_POST ,FIND_POST_SUCCESS, GET_OTHER_POST_SUCCESS} = require("../actions/postTypes");

const initState = {
    postList: [],
    count: 0,
    myposts:[],
    o:[]
}

const postReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GET_POST_SUCCESS:
        case  FIND_POST_SUCCESS:
            return {
                ...state,
                postList: payload.posts,
            }
        case GET_POST_COUNT_SUCCESS:
            return {
                ...state,
                count: payload.count,
            }

            case GET_MY_POST_SUCCESS:
                return {
                    ...state,
                    
                        myposts: payload
                    }
                
             case DELETE_POST:
                 return{
                    ...state,
                    myposts:state.myposts.filter(elm=>elm._id!==payload),
                    postList:state.postList.filter(elm=>elm._id!==payload)

                 } 
                 case GET_OTHER_POST_SUCCESS:
                     return{
                         ...state,
                        o:payload}



        default:
            return state
    }
}

export default postReducer