import { apiSlice } from "../apiSlice"
import { addMassagesAndUpdate, deleteAll } from "./massageSlice";





export const massageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
    getMassages: builder.query({
            query: ({skip,sort}) => {

                console.log(skip,sort)

                

                return {url: `massage/getAll/${skip}?sort=${sort}`}
            },

            providesTags: (result)=>
                result?.msg 
                ?  [...result.msg.map(({ _Id }:any) => ({ type: 'Massage', _Id })), { type: 'Massage', id: 'LIST' }]
                :  [{ type: 'Massage', id: 'LIST' }],



            async onQueryStarted({skip}, { dispatch, queryFulfilled }) {
                try {
                    
                    console.log(skip,"rania ramdan")
                    
                    if(skip === 0){
                        await dispatch(deleteAll())
                    }
                    const {data}=await queryFulfilled

                    await dispatch(addMassagesAndUpdate(data))

                    console.log(data.msg)
                } catch(err) {
                    console.log(err)
                }

            },

    }),

    checkExsitUser: builder.mutation({
        query: (id) => ({
            url: `/massage/${id}`,
            method: 'GET',
        }),
    }), 

    createMassage: builder.mutation({
        query: ({ id, body }) => ({

            url: `/massage/${id}`,
            method: 'POST',
            body: { ...body }
        }),
        ///invalidatesTags: (result, error, arg) => [{ type: 'Massage', _id: arg.id }]

    }),

    addReply: builder.mutation({
        query: ({ id, reply }) => ({

            url: `/massage/addReply/${id}`,
            method: 'POST',
            body:{...reply}
        }),
        /*invalidatesTags: (result, error, arg) => [{ type: 'Massage', _id: arg.id }]*/

    }),


    deleteMassage: builder.mutation({
        query: ({_id}) => ({
            url: `/massage/${_id}`,
            method: 'DELETE',
        }),
        invalidatesTags: () => [{ type: 'Count', id: 'LIST' }],

        //invalidatesTags: (result, error, arg) => [{ type: 'Massage', _id: arg.id }]
    }),
    setStatus: builder.mutation({
        query: (_id) => ({
            url: `/massage/setStatus/${_id}`,
            method: 'POST',
        }),
        /*invalidatesTags: (result, error, arg) =>{
            return [{ type: 'Massage', _id: arg }]

        }*/
    }),
    toggleFavoure: builder.mutation({
        query: ({ _id, status }) => ({
            url: `massage/toggleFavoure/${_id}`,
            method: 'PATCH',
            body: { ...status }

        }),
        ///invalidatesTags: (result, error, arg) => [{ type: 'Massage', id: 'LIST' }],

        /*async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
            console.log(54545)
    

            // `updateQueryData` requires the endpoint name and cache key arguments,
            // so it knows which piece of cache state to update
            const patchResult = dispatch(
                massageApiSlice.util.updateQueryData('getMassages', 2, (draft: any) => {
                    console.log(54545)
                    console.log(status.status)
                    const red=[...draft.msg]
                    const massages = red.map((massage: any) => {
                        if (massage["_id"] === id) {
                            massage.favorite = status.status
                            return massage
                        }
                        return massage

                    })
                    console.log(current(draft),{msg:massages})

                    Object.assign(draft, {msg:massages})
                })
            )
            try {
                const {data}=await queryFulfilled
                console.log(data)
            } catch {
                patchResult.undo()
            }
        }*/
    }),
    opinionsAllowed: builder.query({
        query: (id) => ({
            url: `/massage/opinionsAllowed/${id}`,
            method: 'GET',
        }),
        providesTags: () => [{ type: 'Massage', id: 'LIST' }]
    }),


    getAllMassges: builder.query({
        query: () => ({
            url: `/massage/getAll`,
            method: 'GET',
        }),
        providesTags: () => [{ type: 'Count', id: 'LIST' }]
    }),

    /*getAllSongs: builder.mutation<{}, void>({
        queryFn: async(_, { getState }) => { 
            let state = getState();
            console.log(state)
            for(let offset = 1; offset < 3; offset += 1){
                console.log(offset)
                const { data } = massageApiSlice.endpoints.getMassages.select(offset)(state as any);
                console.log(data)
            }
            const { data } = massageApiSlice.endpoints.getMassages.select("massage")(state as any);
            console.log(data)

            return {data:4}
        },

    })*/

    
}),


})





export const {
    useCheckExsitUserMutation,
    useGetMassagesQuery,
    useCreateMassageMutation,
    useToggleFavoureMutation,
    useDeleteMassageMutation,
    useOpinionsAllowedQuery,
    useSetStatusMutation,
    useAddReplyMutation,
    useLazyGetMassagesQuery,
    useGetAllMassgesQuery
    
} = massageApiSlice







export { apiSlice }
