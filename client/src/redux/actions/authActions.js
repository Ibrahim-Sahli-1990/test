import { GET_OTHER_SUCCESS ,GET_PROFILE_SUCCESS,  LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from "./authTypes"
import axios from 'axios'
import { prefixe } from "../../helpers/constant"
//import { setToken } from '../../helpers/helpers'
//import { Authaxios } from '../../helpers/helpers'

import { clearError, setError, startLoading, stopLoading } from "./appStateActions"
import { getMyPost, getotherprofile, getPosts } from "./postActions"


export const login = (info) => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("Login"))
    try {
        console.log("frommmmmm",info)
        const res = await axios.post(`${prefixe}/api/user/login`,info)
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(stopLoading())
        dispatch(getProfile())
        console.log("login")
    } catch (err) {
       dispatch(setError(err.response.data.errors))
        dispatch(stopLoading())
    }
}

export const register = (info) => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("register"))
    try {
        const res = await axios.post(`${prefixe}/api/user/register`, info)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(stopLoading())
        dispatch(getProfile())
    } catch (err) {
        dispatch(setError(err.response.data.errors))
        dispatch(stopLoading())
    }
}

export const getProfile = () => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("Getmyprofile"))
    try {
        const token = localStorage.getItem('token')

        const { data } = await axios.get(`${prefixe}/api/user/getprofile`,{headers:{"auth-token":token }})
        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data
        })
   
     dispatch(stopLoading())

   


    }
    
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}



export const logout = () => {
    return {
        type: LOGOUT
    }
}
export const disconnectuser=(info)=>async()=>{
    try {
        
        await axios.put("http://localhost:5000/api/user/disconnect/"+info) 
    } catch (error) {
        console.log(error)
    }
 }

//getotheruser

export const getotheruser = (id) => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("Getotheruser"))
    try {

        const { data } = await axios.get(`${prefixe}/api/user/getotheruser/${id}`)
        dispatch({
            type: GET_OTHER_SUCCESS,
            payload: data
        })
   
        dispatch(stopLoading())

   


    }
    
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}


//updatingprofileimage
export const updatingprofileimage = (info,owner) => async (dispatch) => {
    try {
        dispatch(startLoading("updating"))
        dispatch(clearError())
        const token = localStorage.getItem('token')
        console.log(info)
 
     await axios.put(`${prefixe}/api/user/updatingprofileimage`, info,{headers:{"auth-token":token }})
    
     dispatch(getMyPost())
     dispatch(getPosts())
    dispatch(getotherprofile(owner))  
    dispatch(getProfile())
    
   //focus
    dispatch(stopLoading())    
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}
export const connect = (x) => async (dispatch) =>
{
    
    const token = localStorage.getItem('token')



try {await axios.put(`${prefixe}/api/user/connect`,x,{headers:{"auth-token":token }})


    
} catch (error) {
    dispatch(stopLoading())
    dispatch(setError(error.response.data.errors))
}



}

