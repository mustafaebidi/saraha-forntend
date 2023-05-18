import { apiSlice } from "../apiSlice"
import { logOut, setCredentials } from "./authSlice"

type LoginData={
    token:string,
    username:string| undefined | null
}


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),

        }),
        
        registration: builder.mutation<{},FormData>({
            queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
                const response = await fetch(`/api/refresh`);
                return (response.ok) ? {data: await response.json()}
                                     : {error: await response.json()};

            }
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled

                    
                    setTimeout(() => {

                        dispatch(apiSlice.util.resetApiState())
                        dispatch(logOut())
                        
                        
                    }, 1000);

                    window.location.reload()

                    
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(setCredentials({ ...data }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),

        setPrivacy: builder.mutation({
            query: credentials => ({
                url: '/auth/setPrivacy',
                method: 'POST',
                body: { ...credentials }
            }),

            invalidatesTags: (result, error, arg) => [{ type: 'User', id: 'LIST' }]


        }),

        getPrivateData: builder.query({
            query: credentials => ({
                url: '/auth/getPrivateData',
                method: 'GET',
            }),
            providesTags: (result)=> [{ type: 'User', id: 'LIST' }]
            
        }),


        setGeneralSettings: builder.mutation({
            query: credentials => ({
                url: '/auth/setGeneralSettings',
                method: 'POST',
                body: { ...credentials }
            }),
            
        }),

        sendForgetPassword: builder.mutation({
            query: credentials => ({
                url: '/auth/sendForgetPassword',
                method: 'POST',
                body: { ...credentials }
            }),
            
        }),

        forgetPassword: builder.query({
            query: ({id,token}) => ({
                url: `/auth/forgetPassword/${id}/${token}`,
                method: 'GET',
            }),
            
        }),

        restPassword: builder.mutation({
            query: ({id,token,password}) => ({
                url: `/auth/forgetPassword/${id}/${token}`,
                method: 'POST',
                body: { ...password }
            }),
            
        }),

        changePassword: builder.mutation({
            query: (password) => ({
                url: `/auth/changePassword`,
                method: 'POST',
                body: { password }
            }),
            
        }),




        


        
    })
})

export const {
    useLoginMutation,
    useRegistrationMutation,
    useSendLogoutMutation,
    useRefreshMutation,
    useSetPrivacyMutation,
    useGetPrivateDataQuery,
    useSetGeneralSettingsMutation,
    useSendForgetPasswordMutation,
    useForgetPasswordQuery,
    useRestPasswordMutation,
    useChangePasswordMutation
    
    
    
    
} = authApiSlice 

export { apiSlice }
