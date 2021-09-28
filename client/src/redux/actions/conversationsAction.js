import { clearError, startLoading, stopLoading } from "./appStateActions"
import { GETUSERS_SUCCESS, GET_THECONVERSATION_SUCCESS,  } from "./conversationsTypes"
import axios from "axios"
import { prefixe } from "../../helpers/constant"

export const GEtUSERS = () => async (dispatch) => {

    try {
        
    dispatch(clearError())
    dispatch(startLoading("GETUSERS_SUCCESS"))
    const token = localStorage.getItem('token')
    const {data} = await axios.get(`${prefixe}/api/user/allusers`,{headers:{"auth-token":token }})
    dispatch({
        type: GETUSERS_SUCCESS,
        payload: data  
    }) 
    dispatch(stopLoading())
} catch (err) {
    console.log(err)
    dispatch(stopLoading()) 
}}
export const getconversation = (between) => async (dispatch) => {


    try {
    dispatch(clearError())
    dispatch(startLoading("GETUSERS_SUCCESS"))
    const res = await axios.post(`${prefixe}/api/conversation/getconversation`,between)
    dispatch({
        type: GET_THECONVERSATION_SUCCESS,
        payload: res.data  
    }) 
    dispatch(stopLoading())
} catch (err) {
    console.log(err)
    dispatch(stopLoading()) 
}}


export const sendingmessage = (message) => async (dispatch) => {

    try { 
    dispatch(clearError())
    dispatch(startLoading("SENDING  _MESSAGE"))
    await axios.put(`${prefixe}/api/conversation/sendingmessage`,message)
    dispatch(getconversation(message.between)) 
    dispatch(stopLoading())
} catch (err) {
    console.log(err)
    dispatch(stopLoading()) 
}}





    





