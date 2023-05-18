import {  useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useForgetPasswordQuery, useRestPasswordMutation } from "../store/auth/authApiSlice"



type Data={
    newPassword:string,
    confirmPassword:string
}


const ChangePassword=()=>{

    const{id,token}=useParams()

    const{isLoading,error}=useForgetPasswordQuery({id,token})
    const[restPassword]=useRestPasswordMutation()
    const [loading,setLoading]=useState()
    const navigate = useNavigate();




    const [data,setData]=useState({} as Data )



    console.log(data)

    if(isLoading){
        return <div>Loding ...</div>
    }

    if(error){
        return <div>error</div>
    }



    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

        setData((state)=>({...state,[e.target.name]:e.target.value}))


    }


    const handleSumbit=async(e:any)=>{

        e.preventDefault()

        if(!(data.newPassword === data.confirmPassword)){
            toast.error("يجب ان تكون كلمة السر مطابقة", {
 
                theme: "colored",

            });

            return;
        }

        try{

            await restPassword({password:{password:data.newPassword},id,token})
            toast.success("تم تغير كلمة السر بنجاح", {
                theme: "colored",
            });

            navigate("/")



        }

        catch(err){

        }

    }





    return(
        <div className="container  pt-[250px]">
            <div className=" max-w-[500px] mx-auto">
                <h2 className="text-center  text-3xl  font-bold mb-7">اعاده تعين كلمة السر</h2>

                <form className="flex flex-col gap-2" onSubmit={handleSumbit}>
                    <input className="w-full rounded py-1 px-2 border border-[#c3cfce] " placeholder="كلمة السر الجديدة" onChange={handleChange} name="newPassword" id="newPassword"/>
                    <input className="w-full rounded py-1 px-2 border border-[#c3cfce] " placeholder="تاكيد كلمة السر" onChange={handleChange} name="confirmPassword" id="confirmPassword"/>

                    <button className="m-auto py-1 w-[80px]  px-2 duration-200 text-[#10BBB3] border border-[#10BBB3] rounded hover:bg-[#10BBB3] hover:text-[white]" type="submit" >Change</button>
                </form>
            </div>
        </div>
    )

}

export default ChangePassword