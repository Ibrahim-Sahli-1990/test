import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import conversationReducer from "./conversationsReducer";
import commentReducer from "./commentReducer";


export default combineReducers({
    auth: authReducer,
    posts: postReducer,
    appState: appStateReducer,
    conversation:conversationReducer,
    comments:commentReducer
})