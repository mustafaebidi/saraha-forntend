import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../common'
import { logOut, setCredentials } from './auth/authSlice'
import {RootState} from "./index"




const baseQuery = fetchBaseQuery({
    baseUrl:URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState}) => {

        let state = getState() as RootState
        let token=state?.auth?.userInfo?.token
        
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {

    let result = await baseQuery(args, api, extraOptions)

    // If you want, handle other status codes, too
    console.log(result)

    if(result?.error?.status === "FETCH_ERROR"){
    
        const response={meta:{...result.meta},error:{status:500,data:{msg:"لا يوجد اتصال بالانترنت"}}}
        return response

    }

    if (result?.error?.status === 403) {
        console.log('sending refresh token')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        console.log(api, extraOptions)


        if (refreshResult?.data) {
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            console.log("ahmed green")
            console.log(refreshResult?.error)

            if (refreshResult?.error?.status === 403) {
                console.log(api, extraOptions,"green")
                await baseQuery({  url: '/auth/logout',method: 'POST'}, api, extraOptions)
                api.dispatch(logOut())

                
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Massage',"User","Count"],

    endpoints: builder => ({})
})




