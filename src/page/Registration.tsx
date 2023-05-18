import {  FormEvent, useState } from "react"
import {  useNavigate,  } from "react-router-dom"

import { signup } from "../store/auth/authSlice";
import { store, useAppDispatch } from "../store";
import {  toast } from 'react-toastify';




type IData={
    email:string,
    password:string,
    username:string,
    file?:File

} 


const fields=[
    {
        id:1,
        name:"email",
        title:"البريد الإلكتروني",
        type:""

    },
    {
        id:2,
        name:"password",
        title:"الرقم السري",
        type:""

    },
    {
        id:3,
        name:"username",
        title:"الاسم",
        type:""


    },
    {
        id:4,
        name:"file",
        title:"الصورة الشخصية",
        type:"file"

    },

]
export type AppDispatch = typeof store.dispatch;


const Registration=()=>{

    const navigate = useNavigate();
    const dispatch=useAppDispatch()
    const[data,setData]=useState<IData | null>({
            email:"",
            password:"",
            username:"",
            
        
        } as IData)

    const handleChange=(e: any)=>{

        setData((state:any)=>{
            if(e.target.name === "file"){
                return {
                    ...state,
                    [e.target.name]:e.target.files[0]
                }

            }
            else{
                return {
                    ...state,
                    [e.target.name]:e.target.value
                }
            }
        })
    }


    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const {username,email,password,file}=data as IData
        
        const formDatas = new FormData();
        formDatas.append("username", username);
        formDatas.append("email", email);
        formDatas.append("password",password)

        if(file){
            formDatas.append("avatar", file as any); 
        }
        

        
        try{

            const result=await dispatch(signup(formDatas)).unwrap()

            if(result)
                navigate("/login");
                toast.success('تم التسجيل بنجاح', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
        }
        catch(err:any){
            console.log(err)
            return toast.error((err as any)?.msg, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                toastId: "registration",
            });

        }
    }



    return(
        <div>
            <div className="container">
                <h2 className=" mb-10 text-xl  font-bold">احصل على صفحتك في صراحة</h2>
                <div className=" py-8 border-t border-[#d4dbe0]">
                    <form className="" onSubmit={handleSubmit} encType="multipart/form-data" >
                        {fields.map(({id,title,name,type})=>{
                            return(
                                <div key={id} className="flex mb-3 flex-wrap gap-3 items-center">
                                    <label className="w-36  font-semibold">{title}</label>
                                    
                                    <input onChange={handleChange}  type={type} className="input flex-1 basis-96" name={name}/>
                                </div>
                            )
                        })}
                        <div className=" mr-[155px] md:mr-[0px]   mt-6">
                            <button type="submit" className=" text-[#10BBB3] rounded border border-[#10BBB3] py-1 px-3 hover:bg-[#10BBB3] hover:text-[white]">تسجيل</button>
                        </div>

                
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration


