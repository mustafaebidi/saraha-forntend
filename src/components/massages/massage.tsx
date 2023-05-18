import {  useDeleteMassageMutation, useSetStatusMutation, useToggleFavoureMutation } from "../../store/massage/massageApiSlice";
import PopupReply from "./PopupReply";
import { Fragment, memo, useCallback, useRef, useState } from "react"
import {ReactComponent as ReactLogo} from "../../green.svg"
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteOne, selectMessageById, updateOne } from "../../store/massage/massageSlice";
import LoadingButton from "../LoadingButton";
import { toast } from "react-toastify";
import ScreenShotButton from "./ScreenShotButton";
import { useSelector } from "react-redux";



import {RootState} from "../../store/index"





const Massage=({id}:{id:number})=>{


    const {body,createdAt,_id,favorite,display,reply} = useSelector((state:RootState) => selectMessageById(state, id)) as any

    const[toggleFavoure,{status:toggleStaus}]=useToggleFavoureMutation()
    const dispatch=useAppDispatch()



    const domEel = useRef<any>(null);
    const domEl = useRef<HTMLDivElement>(null!);

    const globalInterval=useRef<ReturnType<typeof setTimeout>>()  

    const sendAt = new Date(createdAt).toLocaleString('ar-EG', { day: 'numeric', month: 'long',  year: 'numeric',hour12: false })

    const [active,setActive]=useState(favorite)






    const doAnimation=useCallback(()=>{


        const finishTime=200
        const startTime=new Date()

        clearInterval(globalInterval.current)

        globalInterval.current=setInterval(()=>{

            const now=new Date()

            let counter=now.getTime() - startTime.getTime()

            let value=0.9+(counter/finishTime)*0.1

            domEl.current.style.transform = `scale(${value})`

            let isEnd=counter+2 > finishTime

            if(isEnd){
                clearInterval(globalInterval.current)
            }
    
        },10)

    },[])


    const handleClick=useCallback(async()=>{

        try{

            console.log(navigator.onLine)

            const status=!favorite
            setActive((state:boolean)=>!state)

            doAnimation()
            const res=await toggleFavoure({_id,status:{status}}).unwrap()

            console.log(res)
            dispatch(updateOne(res.msg)) 

        }
        catch(err:any){

            toast.error(err?.data?.msg ,{
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            
        }
    },[_id, dispatch, doAnimation, favorite, toggleFavoure])



    let contentReply;

    if(reply){
        contentReply=<div className="reply mt-4 py-5 bg-[#f0796e] rounded px-1 relative z-40 text-[white]">
                <div className=" absolute bottom-[98%] right-2  border-transparent border-[15px] border-b-[15px] border-b-[#f0796e]"></div>
                <p className="text-center p-6  font-semibold">{reply}</p>
            </div>
    } 


    return(

        <div ref={domEel} className="py-10 px-10 relative bg-[white]">
            <div className="heart_massage absolute left-4 top-4" onClick={handleClick} ref={domEl}>
                <ReactLogo className={`heart_massage ${active ? "heart_massage_active" :""}`}/>

            </div>
            <div className=" pl-7">
                <p className="font-bold">{body}</p>
                <p className="text-[#9da9b0]   mt-2">{sendAt}</p>
            </div>

            <MessageControl id={id}/>
            <ScreenShotButton body={body} reply={reply}/>

        
            <div>
                {display ? contentReply:null}
            </div>
    

        </div>

    )
}


type PropsMessageControl={
    id:number
}


const MessageControl=({id}:PropsMessageControl)=>{

    const {_id,display,reply}=useAppSelector((state:RootState) => selectMessageById(state, id)) as any
    const dispatch=useAppDispatch()


    const[deleteMassage,{status:deleteStaus}]=useDeleteMassageMutation()
    const[setStatus ,{status}]=useSetStatusMutation()
    const [visable,setVisable]=useState(false)

    
    const deleteLoading= deleteStaus === "pending" ? true : false
    const statusLoadibg=status === "pending" ? true :false
    const showMassage=display ?"اخفاء" :"اظهار"



    let disable=(deleteLoading || statusLoadibg) ? true : false



    const handleDelete=async()=>{

        try{

            await deleteMassage({_id}).unwrap()
            console.log(707070)
            dispatch(deleteOne(id))

        }
        catch(err:any){

            toast.error(err?.data?.msg ,{
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

        }
    }

    const showToPublic=async()=>{
        try{

            const res=await setStatus(_id).unwrap()
            dispatch(updateOne(res.msg))

        }
        catch(err:any){
            toast.error(err?.data?.msg ,{
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

        }
    }


    return(

        <Fragment>

            <div className={`option flex justify-center gap-2 mt-3 ${disable ? " pointer-events-none" :""}`} >
                {display ? <div onClick={()=> setVisable(true)} className="px-2 py-1  rounded-[100px] bg-[#1d628bd6] flex justify-center items-center font-bold text-[white] cursor-pointer">رد</div>:null}
                <LoadingButton radius="150px" backgroundColor="#1d628bd6" loading={statusLoadibg} onClick={showToPublic}>{showMassage}</LoadingButton>
                <LoadingButton radius="150px" onClick={handleDelete} backgroundColor="#b06767" loading={deleteLoading} >حذف</LoadingButton>
            </div>

            {visable ? <PopupReply  reply={reply ? reply :""} id={_id} setVisable={setVisable} title="أكتب رد على هذه الرسالة"/>:null}

        </Fragment>


    )

}



export default memo(Massage)

