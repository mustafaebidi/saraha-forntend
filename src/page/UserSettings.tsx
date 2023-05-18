import { useState } from "react"
import SettingsCollection from "../components/userSetting/settingsCollection "




const UserSetting=()=>{


    const[choice,setChoice]=useState<number>(0)

    return(

        <div className="container">
            <div className=" max-w-[550px] mx-auto">
                <div className="mb-10 p-1 flex  justify-around flex-wrap rounded gap-5">
                    {["الملف الشخصي","الحساب","الصورة"].map((nama,index:number)=>{
                        return(
                            <div onClick={()=>setChoice(index)} className={` ${index === choice ? "bg-[#0e8b8b] ]" : "bg-[#0cd6cd]"}  duration-300 min-w-[150px] flex-1  flex justify-center items-center p-4 px-4 cursor-pointer text-center  font-bold  rounded  text-[white]`} key={index}>{nama}</div>
                        )
                    })}
  
                </div>
                <SettingsCollection choice={choice}/>

            </div>

        </div>
  
    )
}

export default UserSetting 