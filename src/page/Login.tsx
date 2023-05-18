import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch } from "../store"
import { useLoginMutation } from "../store/auth/authApiSlice"
import { setCredentials } from "../store/auth/authSlice"



const Login=()=>{

    const [login] = useLoginMutation()
    const [data,setData]=useState({})
    const dispath=useAppDispatch()


    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

        setData((state)=>{
            return {...state,[e.target.name]:e.target.value}
        })

    }   

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        try{
            const response= await login(data).unwrap()
            console.log(response)
            dispath(setCredentials(response))
        }

        catch(err:any){
            toast.error(err?.data?.msg, {
                theme: "colored",
                toastId: "login",
            })

        }

    }


    return(
        <div className="pt-8">
            <div className="container">
                <h2 className="text-center font-bold text-2xl">تسجيل الدخول</h2>
                <div className=" max-w-full w-[300px] m-auto text-center mt-7">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4 mt-4">
                        <input  onChange={handleChange} name="email" placeholder="البريد الالكتروني" className="input" />
                        <input  onChange={handleChange} name="password"  placeholder="الرقم السري" className="input"/>

                        <div className="flex justify-center gap-2">
              
                            <button type="submit" className="text-[#10BBB3] border rounded border-[#10BBB3] px-4 py-2 duration-150 hover:bg-[#10BBB3] hover:text-[white]">دخول</button>

                        </div>   
                    </form>

                    <Link className="text-center  font-light text-[#9da9b0] hover:text-[#10BBB3]" to="/forget-password">نسيت كلمه السر</Link>

                </div>
            </div>
        </div>
    )
}

export default Login