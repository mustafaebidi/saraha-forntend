import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { useSendForgetPasswordMutation } from "../store/auth/authApiSlice"


const ForgetPassword=()=>{


    const[sendForgetPaswword]=useSendForgetPasswordMutation()

    const [email,setEmail]=useState("")


    const handleSumbit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        try{

            const res=await sendForgetPaswword({email}).unwrap()
            console.log(res)
            toast.success('تم ارسال رابط التغعيل', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }
        catch(err){
            console.log(err)
        }


    }

    return(
        <div>
            <div className="container">
                <div className="text-[#1e3948] text-center  pt-36 font-bold  text-2xl">استرجاع الرقم السري</div>
                <div>
                    <form onSubmit={handleSumbit} className="max-w-full m-auto flex flex-col gap-4 mt-9 w-[600px]">
                        <input onChange={(e)=>setEmail(e.target.value)} className="w-full rounded py-1 px-2 border border-[#c3cfce] " name="email" placeholder="البريد الالكتروني"/>
                        <button className="m-auto py-1 w-[80px]  px-2 duration-200 text-[#10BBB3] border border-[#10BBB3] rounded hover:bg-[#10BBB3] hover:text-[white]">ارسال</button>
                    </form>
                </div>

            </div>
        </div>
    )

}

export default ForgetPassword