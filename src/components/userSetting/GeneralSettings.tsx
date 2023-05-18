import React, {  useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { RiSettings2Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../store';
import {  useSetGeneralSettingsMutation } from '../../store/auth/authApiSlice';
import { selectCurrentUser, setCredentials } from '../../store/auth/authSlice';
import CommonWindow from '../commonWindow';
import LoadingButton from '../LoadingButton';

const fields=[
    {
        placeholer:"اكتب الاسم او اللفب",
        name:"username",
        icon:<FaUserAlt color={"#b9b9b9"} size={20}/>
    },
    {
        placeholer:"اكتب الحاله التي تود ان تظهر فوق حقل الكتابة عند مصراحتك",
        typeOffields:"textArea",
        name:"brief",
    },
    
]







const GeneralSettings=()=>{




    const[setGeneralSettings,{status}]=useSetGeneralSettingsMutation()
    const dispath=useAppDispatch()


    const loading= status === "pending" ? true :false

    const {username,brief} = useSelector(selectCurrentUser)



    const [data,setData]=useState({
        username,
        brief
    } )


    
    const handleChange=(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)=>{
        setData((state:any)=>({...state,[e.target.name]:e.target.value}))
    }


    const handleSubmit=(e:any)=>{
        e.preventDefault()
        handleClick()


    }

    const handleClick=async()=>{

        try{

            await setGeneralSettings(data).unwrap() 
            dispath(setCredentials(data))


            toast.success('تم حفظ التغيرات بنجاح', {
                draggable: true,
                theme: "colored",
            });


        }catch(err:any){

            toast.error(err.data.msg, {
                draggable: true,
                theme: "colored",
            });

        }

    }

    return(

        <CommonWindow title="معلومات" icon={<RiSettings2Fill size={40}/>}>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {fields.map(({placeholer,typeOffields,icon,name})=>{
                    return(
                        <div className=" relative rounded">
                            {typeOffields ? <textarea 
                                                name={name} 
                                                className="border border-[#e5e5e5] outline-none rounded p-2 w-full min-h-[150px]"
                                                onChange={handleChange} 
                                                value={data[name as  keyof typeof data]}
                                                placeholder={placeholer}                                              


                                            /> 
                                            :<input 
                                                placeholder={placeholer}
                                                value={data[name as  keyof typeof data]}
                                                onChange={handleChange} 
                                                name={name} className="outline-none border border-[#e5e5e5] focus:border-[green]  p-2 bg-transparent relative z-50 rounded w-full"
                                            />
                            } 

                            {icon ? <div className=" absolute left-2 bottom-3 z-10">
                                        {icon}
                                    </div> :null }                 
                        </div>
                    )
                })}


                    <LoadingButton width="100%" backgroundColor="#0cd6cd" onClick={handleClick} loading={loading}>
                            حفظ التغيرات
                    </LoadingButton>


            </form>
        </CommonWindow>

    )
}


export default GeneralSettings