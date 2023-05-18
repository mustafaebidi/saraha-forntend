import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { URL } from '../../common';
import { RootState } from '../index';



export type Privacy={
    accept_msg:boolean,
    accept_photo:boolean,
    accept_bad:boolean,
    show_visit:boolean,
    show_seen:boolean,
    accept_search:boolean,
}


export type UserInfo={
    token:string ,
    username:string,
    id:string
    privacy:Privacy,
    brief:string,
    _id:string,
    img:string
}


export const signup = createAsyncThunk('todos/fetchTodos', async (formDatas:FormData,{rejectWithValue }) => {

            try{
                const res = await axios.post(
                    `${URL}/auth/registration`,
                    formDatas
                );

                return res.data
            }
            catch(err:any){
                return rejectWithValue(err.response.data)
            }
})

export const changePhoto = createAsyncThunk('auth/changePhoto', async (formDatas:FormData,{rejectWithValue,getState,dispatch  }) => {

    const state :RootState = (getState() as RootState); // <-- invoke and access state object

    const token =state?.auth?.userInfo?.token

    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    console.log(token)

    try{

        const res = await axios.post(
            `${URL}/auth/changePhoto`,
            formDatas,
            config
        );


        dispatch(setCredentials(res.data))
        console.log(res.data)
            
        return res.data
    }
    catch(err:any){
        return rejectWithValue(err.response.data)
    }
})



const authSlice = createSlice({
    name: 'auth',
    initialState: { userInfo:{} as UserInfo | null,status:"idle"},
    reducers: {
        setCredentials: (state, action) => {
            const userInfo= action.payload
            state.userInfo = {...state.userInfo,...userInfo}
        },
        logOut: (state) => {
            state.userInfo = {} as UserInfo
        },
    },

    extraReducers(builder) {
        builder
        .addCase(changePhoto.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(changePhoto.fulfilled, (state, action) => {
            state.status = 'succeeded'            
        })
        .addCase(changePhoto.rejected, (state, action) => {
            state.status = 'error'
        })
    }

})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state:any) : UserInfo => state.auth.userInfo
export const selectStaus = (state:any)  => state.auth.status