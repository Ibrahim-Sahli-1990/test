

import axios from 'axios'

import { prefixe } from '../../helpers/constant'
import { clearError, setError, startLoading, stopLoading } from './appStateActions'
import { GET_COMMENT_SUCCESS } from './commentTypes'
import {DELETE_POST, GET_MY_POST_SUCCESS, GET_POST_COUNT_SUCCESS,  GET_POST_SUCCESS ,FIND_POST_SUCCESS,GET_OTHER_POST_SUCCESS} from './postTypes'

export const addPost = (newPost) => async (dispatch) => {
    try {
        dispatch(startLoading("Adding post"))
        dispatch(clearError())
       
     const token = localStorage.getItem('token')
     await axios.post(`${prefixe}/api/post/addpost`, newPost,{headers:{"auth-token":token }})
    
     dispatch(getPosts())
     dispatch(getMyPost())


    }
    catch (err) {
        dispatch(stopLoading())
       
         dispatch(setError(err.response.data.errors))
    }
}
export const findposts = (info) => async (dispatch) => {
    try {
        dispatch(startLoading("finding posts"))
        dispatch(clearError())
       
     const { data } = await axios.get(`${prefixe}/api/post/findposts`, info)
    
     dispatch({
            type: FIND_POST_SUCCESS,
            payload: data
        })

    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}

export const updatepost = (id,info,owner) => async (dispatch) => {
    try {
        dispatch(startLoading("updating"))
        dispatch(clearError())
        const token = localStorage.getItem('token')
 
      await axios.put(`${prefixe}/api/post/updatepost/${id}`, info,{headers:{"auth-token":token }})
    
     dispatch(getMyPost())
     dispatch(getPosts())
    dispatch(getotherprofile(owner))    
     dispatch(stopLoading())  
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}

export const vote = (id,info,owner) => async (dispatch) => {
    try {
        dispatch(startLoading("updating"))
        dispatch(clearError())
        const token = localStorage.getItem('token')
 
      await axios.put(`${prefixe}/api/post/vote/${id}`, info,{headers:{"auth-token":token }})
     
     dispatch(getMyPost())
     dispatch(getPosts())
    dispatch(getotherprofile(owner))  
   //focus
    //dispatch(stopLoading())    
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}







export const getPosts = (page, limit) => async (dispatch) => {

    try {
        dispatch(startLoading("GetPosts"))
        dispatch(clearError())
        const { data } = await axios.get(`${prefixe}/api/post/posts?page=${page}&limit=${limit}`)
        //const { data } = await axios.get(`${prefixe}/api/post/posts`)
        dispatch({
            type: GET_POST_SUCCESS,
            payload: data
        })
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
    dispatch(setError(err.response.data.errors))
    console.log(err)
    }
}

export const getMyPost = () => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("GetMyPosts"))
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`${prefixe}/api/post/myposts`,{headers:{"auth-token":token }})
        dispatch({
            type: GET_MY_POST_SUCCESS,
            payload: data
        })
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}

export const getPostCount = () => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("Get post count"))
    try {
        const { data } = await axios.get(`${prefixe}/api/post/postcount`)
        dispatch({
            type: GET_POST_COUNT_SUCCESS,
            payload: data
        })
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}

export const deletepost = (id,owner) => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("Deleteposts"))
    try {
        const token = localStorage.getItem('token')

       await axios.delete(`${prefixe}/api/post/deletepost/${id}`,{headers:{"auth-token":token }})
       dispatch(getMyPost())
       dispatch(getPosts())
      dispatch(getotherprofile(owner))    
       dispatch(stopLoading())
    
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}


export const getotherprofile = (info) => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("getotherposts"))
    try {
       
        const { data } = await axios.get(`${prefixe}/api/post/getotherposts/${info}`)
        dispatch({
            type: GET_OTHER_POST_SUCCESS,
            payload: data
        })
        dispatch(stopLoading())
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}


export const getcomment  = (postid) => async (dispatch) =>{
    try {
        
        dispatch(clearError())
    dispatch(startLoading("getcommnet"))
        const{data}=await axios.post(`${prefixe}/api/comment/getcomment`,postid)
     dispatch(
            {type:GET_COMMENT_SUCCESS,
               payload:data

            }
        )
        
    } catch (error) {
        dispatch(stopLoading())
        dispatch(setError(error.response.data.errors))
    }
} 
export const addcomment  = (info) => async (dispatch) =>{
    try {
        dispatch(clearError())
    dispatch(startLoading("addcomment"))
        await axios.post(`${prefixe}/api/comment/addcomment`,info)
        dispatch(getcomment({postid:info.postid}))
    } catch (error) {
        dispatch(stopLoading())
        dispatch(setError(error.response.data.errors))
    }
} 





//http://localhost:5000/api/comment/addcommnet

//getotherposts