import React, { Fragment, useState } from "react"

import CommonWindow from "../commonWindow"
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { selectCurrentUser, setCredentials } from "../../store/auth/authSlice";
import { useSetPrivacyMutation } from "../../store/auth/authApiSlice";
import { toast } from "react-toastify";
import LoadingButton from "../LoadingButton";

import { SiPrivateinternetaccess } from "react-icons/si";



const privacy=[

    {
        id:1,
        title:"السماح بالمصارحات الجديدة ",
        name:"accept_msg"

    },
    {
        id:2,
        title:" السماح ارسال صور مع الرسال",
        name:"accept_photo"

    },
    {
        id:3,
        title:"السماح بالرسائل التي تحتوي كلمات سيئة",
        name:"accept_bad"
        
    },
    {
        id:4,
        title:"أخفاء عدد زوار الرابط الخاص بي",
        name:"show_visit"
        
    },
    {
        id:5,
        title:"أخفاء اخر ظهور لي",
        name:"show_seen"
        
    } ,
    {
        id:6,
        title:"الظهور بالبحث",
        name:"accept_search"
        
    } 
] 




const PrivacySettings=()=>{


    const {privacy:userPrivacy} = useSelector(selectCurrentUser)
    const dispath=useAppDispatch()
    const[setPrivacy,{status}]=useSetPrivacyMutation()
    const [checkBoxs,setCheckBoxs]=useState(userPrivacy) 


    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

        setCheckBoxs((state)=>({...state,[e.target.name]:e.target.checked}))

    }


    const loading= status === "pending" ? true :false


    
    const handleClick=async()=>{

        try{
            await setPrivacy({privacy:checkBoxs}).unwrap()
            dispath(setCredentials({privacy:checkBoxs}))

            toast.success('تم حفظ التغيرات بنجاح', {
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });


        }
        catch(err){
            console.log(err)
            return toast.error((err as any)?.data?.msg, {
                theme: "colored",
                toastId: "changePhoto",
            });
        }
    }


    return(
        <Fragment>
            <CommonWindow icon={<SiPrivateinternetaccess size={40} />} title="اعدادت الخصوصية">

                <div className="mb-4">
                    {privacy.map(({title,id,name }: any)=>{

                        return (
                            <div className="flex gap-2  items-baseline" key={id}>
                                <input  type="checkbox" onChange ={handleChange} name={name} id={name} checked={checkBoxs[name as  keyof typeof userPrivacy]}/>
                                <label htmlFor={name}>
                                    <span>{title}</span>
                                </label>
                            </div>
                        )
                    })}
                </div>


            <LoadingButton width="100%" backgroundColor="#0cd6cd" onClick={handleClick} loading={loading}>
                            حفظ التغيرات
            </LoadingButton>

            </CommonWindow>
    </Fragment>
    )
}


export default PrivacySettings