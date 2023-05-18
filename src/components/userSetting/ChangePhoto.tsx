import { useState } from "react"
import { MdAddAPhoto } from "react-icons/md"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useAppDispatch } from "../../store"
import { selectCurrentUser,changePhoto, selectStaus } from "../../store/auth/authSlice"
import CommonWindow from "../commonWindow"

import mainPhoto from "../../image/avatar.png"
import LoadingButton from "../LoadingButton"
import { URL as MainUrl } from "../../common"




const ChangePhoto=()=>{


    const {img} = useSelector(selectCurrentUser)
    const status = useSelector(selectStaus)


    const [file, setFile] = useState<Blob | MediaSource>()
    const dispath=useAppDispatch()


    const loading= status === "pending" ? true :false


    const avatar=img ? `${MainUrl}/profile/${img}` : mainPhoto 
    const photo=file ? URL.createObjectURL(file as any)  : avatar

    
    const handleChangePhoto=async()=>{

        const formData = new FormData();
        formData.append("photo", file as any); 

        try{

            await dispath(changePhoto(formData)).unwrap()
            toast.success('تم تغير الصورة بنجاح', {
            
                theme: "colored",
                toastId: "changePhoto",

            });
        }
        catch(err:any){
            console.log(err)
            return toast.error((err as any)?.msg, {
                theme: "colored",
                toastId: "changePhoto",
            });

        }

        finally{
            setFile(undefined)
        }

    }

    
    return(
        <CommonWindow >
            <div className=" pt-8">

                <h2 className="text-center  font-bold">تغير الصوره الشخصية</h2>
                <img className="rounded-full  w-[200px] h-[200px] mx-auto mt-3 mb-3" src={ file ?  URL.createObjectURL(file) : photo} alt=""/>


                <div className="  p-7 py-5">
                    <input onChange={(e:any)=>setFile(e.target.files[0])} type="file" id="actual-btn" hidden/>
                    <label htmlFor="actual-btn">
                        <div className="border-dashed  flex justify-center  p-1 bg-[#F6F6F6] items-center gap-1 cursor-pointer border border-[#C6C6C6] rounded">
                            <span>
                                اضافة صورة
                            </span>
                            <MdAddAPhoto size={25}/>
                        </div>
                    </label>
                </div>

                
   

                
                <LoadingButton hover={false} width="100%" backgroundColor="#0cd6cd" onClick={handleChangePhoto} loading={loading} disable={!file ? true :false}>
                    غير الصوره الشخصية
                </LoadingButton>

            </div>


        </CommonWindow>
    )
}

export default ChangePhoto