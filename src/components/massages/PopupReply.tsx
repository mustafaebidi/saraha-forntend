import { useState } from "react"
import { toast } from "react-toastify"
import { useAppDispatch } from "../../store"
import { useAddReplyMutation } from "../../store/massage/massageApiSlice"
import { updateOne } from "../../store/massage/massageSlice"
import LoadingButton from "../LoadingButton"
import Popup from "../popup"


type Props={
    title:string
    setVisable:React.Dispatch<React.SetStateAction<boolean>>,
    id:string
    reply:string,
}

const PopupReply=({title,setVisable,id,reply:res}:Props)=>{

    const[addReply,{status}]=useAddReplyMutation()


    const loading= status === "pending" ? true : false

    const [reply,setReply]=useState<string>(res)

    const dispatch=useAppDispatch()

    const handleSumbit=async()=>{

        try{
            const res =await addReply({id,reply:{reply:reply}}).unwrap()
            console.log(res)
            dispatch(updateOne(res.msg))
            setVisable(false)

        }
        catch(err:any){

            toast.error(err.data.msg, {
                draggable: true,
                theme: "colored",
            });

        }

    }



    let content=(
        <Popup>
            <div className="bg-[white] w-[450px] max-w-full p-3 rounded">
                <h3 className="text-[#635a56] mb-2">{title}</h3>
                <textarea value={reply} onChange={(e)=>setReply(e.target.value)} className="w-full  p-2 rounded boxShadow outline-none focus:bg-[#80808012] duration-200 min-h-[100px] resize-none">

                </textarea>
                <div className="flex gap-2 justify-end">
                    <div className="cursor-pointer bg-[#1d628b] rounded px-3 py-1 text-[white] font-bold flex  items-center justify-center " onClick={()=>setVisable(false)}>الغاء</div>
                    <LoadingButton backgroundColor="#e54028" color="white" loading={loading} onClick={handleSumbit}>تم</LoadingButton>
                </div>
            </div>
        </Popup>

    )
    return(
        content
    )
}

export default PopupReply