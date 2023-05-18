import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import {RootState} from "../index"

type IMassage=  {
    body: string,
    to:string,
    favorite:boolean  
    reply:String 
    _id:string,
    display:boolean,


}


const postsAdapter = createEntityAdapter<IMassage>({})

const initialState = postsAdapter.getInitialState({
    hasNextPage:null,
})


const massageSlice = createSlice({
    name: 'massage',
    initialState,
    reducers: {
        addMassagesAndUpdate: (state, action) => {
            const userInfo= action.payload
            postsAdapter.upsertMany(state, userInfo.msg)

            state.hasNextPage=userInfo.hasNextPage


        },

        deleteOne: (state, action) => {
            postsAdapter.removeOne(state, action.payload)
        },
        updateOne: (state, action) => {
            postsAdapter.upsertOne(state, action.payload)
            
        },
        deleteAll: (state) =>{
            postsAdapter.removeAll(state)
            state.hasNextPage=null

        }

    }   
})


export const {
    selectAll: selectAllMessages,
    selectById: selectMessageById,
    selectIds: selectMessageIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state:RootState) => state.massage)

export const { addMassagesAndUpdate,deleteOne,updateOne,deleteAll} = massageSlice.actions
export const selectHasNextPage = (state:RootState) => state.massage.hasNextPage


export default massageSlice.reducer

