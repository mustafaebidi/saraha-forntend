import { ChangeEvent, useState } from "react"
import { RiSettings2Fill } from "react-icons/ri"
import CommonWindow from "../commonWindow"


import { AiFillLock } from "react-icons/ai"
import { AiFillUnlock } from "react-icons/ai"
import { useChangePasswordMutation } from "../../store/auth/authApiSlice"
import { toast } from "react-toastify"
import LoadingButton from "../LoadingButton"




type Data={
    password:string,
    confirm:string

}


const ChangePassword=()=>{


    const [changePassword,{status}] =useChangePasswordMutation()

    const[data,setData]=useState({} as Data)

    const [disable,setDisable]=useState(true)

    const loading= status === "pending" ? true :false


    const isMatch=data.password ? data.password === data.confirm :false


    console.log(isMatch)

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{

        setData((state)=>({...state,[e.target.name]:e.target.value}))

    }



    const handleSumbit=(e:any)=>{
        e.preventDefault()
        handleClick()

        

    }
    const handleClick=async()=>{


        const {password}=data
        try{

            await changePassword(password).unwrap()

            toast.success('تم حفظ التغيرات بنجاح', {
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });


        }
        catch(err){

            toast.error('رقم السري غير صالج', {
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

        }
        finally{
            setData({
                password:"",
                confirm:""
            })
        }
    }

    return(

        <CommonWindow title="تغير كلمة السر" icon={<RiSettings2Fill size={40}/>}>
            
            <form className=" flex flex-col gap-4" onSubmit={handleSumbit}>

                <div className=" relative">
                    <input 
                        value={data.password} 
                        placeholder="كلمة سر الجديدة"
                        onChange={handleChange} 
                        name={"password"} className="outline-none border border-[#e5e5e5] focus:border-[green]  p-2 bg-transparent relative z-50 rounded w-full"
                    />
                    <AiFillUnlock size={20} color={"#b9b9b9"} className=" absolute  left-2 top-2"/>
                </div>
   
                <div className="relative">
                    <input
                        value={data.confirm} 
                        placeholder="تاكيد كلمة السر"
                        onChange={handleChange} 
                        name={"confirm"} className="outline-none border border-[#e5e5e5] focus:border-[green]  p-2 bg-transparent relative z-50 rounded w-full"
                    />
                    <AiFillLock size={20}  color={"#b9b9b9"} className="absolute left-2 top-2"/>
                </div>



                <LoadingButton width="100%" backgroundColor="#0cd6cd" onClick={handleClick} loading={loading} disable={!isMatch}>
                    غير كلمة السر
                </LoadingButton>

            </form>
            
        </CommonWindow>

      
    )

}


export default ChangePassword