import { Fragment, useEffect, useRef, useState } from "react"
import {  useParams } from "react-router-dom"
import AfterSendMassage from "../components/massages/AfterSendMassage"
import OpinionsAllowed from "../components/massages/OpinionsAllowed"
import { massageApiSlice, useCheckExsitUserMutation, useCreateMassageMutation } from "../store/massage/massageApiSlice"
import ErrorPage from "./Error"
import { BiMailSend } from 'react-icons/bi';
import { MdAddAPhoto } from 'react-icons/md';
import mainPhoto from "../image/avatar.png"
import moment from 'moment';
import 'moment/locale/ar'
import { store } from "../store"
import LoadingButton from "../components/LoadingButton"
import { toast } from "react-toastify"
import GlobalLoading from "../components/GlobaLoading"
import { URL  as MainUrl} from "../common"

moment.locale('ar')



export type Privacy={

    accept_msg:boolean,
    accept_photo:boolean,
    accept_bad:boolean,
    show_visit:boolean,
    show_seen:boolean,
    accept_search:boolean,


}

type Props={
    userInfo:Data,
    setSend:React.Dispatch<React.SetStateAction<boolean>>
    id:string | undefined
}

type Data={
    username:string
    brief:string
    img:string,
    privacy:Privacy
    visits:number
    isOnline:boolean,
    lastSeen:Data,
}


const SendMassage=()=>{

    const {id}=useParams()
    const [checkExsitUser,{error,data:userInfo,status}]=useCheckExsitUserMutation()
    const [loading,setLoading]=useState(true)
    const[send,setSend]=useState(false)

    const firstTime=useRef(true)



    
    useEffect(()=>{

        if(!firstTime.current){
            store.dispatch(massageApiSlice.util.prefetch('opinionsAllowed', id, { force: true }))

            const getData=async()=>{

                try{
                    console.log(id)
                    await checkExsitUser(id).unwrap()
    
    
                }catch(err){
                    console.log(err)
     
                }
                finally{
                    setLoading(false)
                }
            }
    
            getData()

        }


        return()=>{

            firstTime.current=false

        }
        



    },[checkExsitUser, id])


    if(error){
        return <ErrorPage/>
    }


    console.log(status)

    if(loading  || status === "pending"){
        return (
            <GlobalLoading/>

        )
    }

    return(
        
            <div className=" max-w-[650px] mx-auto p-2 pt-8">
                {!send ?(
                        <Fragment>
                            <MassageTyping id={id} setSend={setSend} userInfo={userInfo?.msg}/>
                            <OpinionsAllowed id={id} {...userInfo?.msg}/>
                        </Fragment>

                    ) : <AfterSendMassage/> 
                }
            </div>
        
    )
}


const MassageTyping=({userInfo,setSend,id}:Props)=>{
    const dom=useRef<HTMLTextAreaElement>(null)
    const[text,setText]=useState<string>("")
    const[createMassage,{status}]=useCreateMassageMutation()


    const handleSend=async()=>{

        try{
            await createMassage({id,body:{body:text}}).unwrap()
            setSend(true)

        }
        catch(err){
            console.log(err)

            toast.error((err as any)?.data?.msg, {
                theme: "colored",
                toastId: "handleSend",
            });

            
        }

    }


    const {privacy,isOnline,lastSeen} = userInfo

    const avatar=userInfo?.img ? `${MainUrl}/profile/${userInfo?.img}` : mainPhoto
    const [file, setFile] = useState<File | undefined>(undefined);


    const now=new Date()
    let last :Date | string =lastSeen.toLocaleString()
    last=new Date(last)
    const durationLastSeen=now.getTime() - last.getTime()


    const isLessThanMinute=durationLastSeen < 60000



    const statusOfUser=(isOnline && isLessThanMinute) ? (

            <Fragment>
                <div className=" w-3 h-3 rounded-full bg-[green]"></div>
                <div>نشط الان</div>
            </Fragment>
        
            ):<div>
                    اخر ظهور  : {moment(new Date(last)).fromNow()}
            </div>
     
    const deletePhoto=()=>{
        setFile(undefined)
    }
    
    const handleDom=()=>{
        dom.current?.focus()
    }


    return(
        <div className="w-[550px] max-w-full p-4 bg-[white] mx-auto relative rounded">

            {!(userInfo?.privacy?.show_visit) ? <div className=" absolute font-bold"><span>الزيارات </span>  {userInfo?.visits}</div>:null}

            <img alt="" className=" absolute w-8 h-8 right-1 top-2 opacity-10" src="../../reso/r.png"/>

            <img alt="" className=" absolute w-8 h-8 left-1 top-2 opacity-10" src="../../reso/l.png"/>

            <div>
                <img className=" mx-auto z-10 mt-[-60px] w-28 max-w-28 h-28 rounded-full" src={avatar} alt=""/>
            </div>

            <h2 className="text-center font-bold capitalize text-xl mt-2">{userInfo?.username }</h2>

            <div className="flex justify-center items-center gap-1 my-2">
                {statusOfUser}
            </div>

            <p className="text-center  p-4 pt-2 ">{userInfo?.brief}</p>

            <textarea
                ref={dom}
                value={text}
                className="w-full h-[270px] border border-[black]  overflow-hidden p-2 rounded"
                onChange={(e)=>setText(e.target.value)}
                placeholder={`هنالك شئ تريد ان تقوله ل ${userInfo?.username} بدون ان يعرف`}

            />

            <Emoji setText={setText} handleDom={handleDom}/>

            {file ? <div>
                <img className=" w-28 mx-auto my-3"  alt=""  src={file ? URL.createObjectURL(file) : ''}/>
                <div onClick={deletePhoto} className="mx-auto w-fit"> ازالة الصورة؟</div>
            </div> : null}

 
            {privacy?.accept_photo ? <div className="  p-7 py-5">
                <input onChange={(e:any)=>setFile(e.target.files[0])} type="file" id="actual-btn" hidden/>
                <label htmlFor="actual-btn">
                    <div className="border-dashed  flex justify-center  p-1 bg-[#F6F6F6] items-center gap-1 cursor-pointer border border-[#C6C6C6] rounded">
                        <span>
                            اضافة صورة
                        </span>
                        <MdAddAPhoto size={25}/>
                    </div>
                </label>
            </div> :null}

 
            {(userInfo?.privacy?.accept_msg)? 
                <LoadingButton loading={status === "pending" ? true :false} onClick={handleSend} width="100%" color="white"  backgroundColor="black">
                    <span>صارح</span>
                    <BiMailSend size={40}/>
                </LoadingButton>
            :null}


            {!(userInfo?.privacy?.accept_msg) ? <p className="text-center p-2 font-bold" >هذا المستخدم لا يود حاليا ان يقبل رسائل</p>:null}

        </div>
    )

}


const Emoji=({setText,handleDom}:any)=>{
    const emojis=["😀","😅","😂","🙂","😍","😘","😎","🤨","😳","💩","😡","💋","🙈","❤️","❤"]
    


    const handleClick=(emoji:string)=>{
        handleDom()

        setText((state:any)=>{
            if(state){
                return state+emoji
            }
            return emoji
        })

    }

    let listofemoj=emojis.map((emoji,index)=>{
        return(
            <div className="cursor-pointer" key={index} onClick={()=>handleClick(emoji)}>{emoji}</div>
        )
    })


    return(
        <div className="flex gap-2 font-bold  text-2xl flex-wrap justify-center py-4">
            {listofemoj}
        </div>
    )
}

export default SendMassage