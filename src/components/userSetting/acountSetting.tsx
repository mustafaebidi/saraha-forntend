import { useState } from "react"
import CommonWindow from "../commonWindow"
import { FaLock } from 'react-icons/fa';
import { FaUnlock } from 'react-icons/fa';




const fields=[
    {
        icon:<FaLock/>,
        placeholder:"كلمة السر القديمة",
        name:"oldpassword"
    
    },
    {
        icon:<FaUnlock/>,
        placeholder:"كلمة السر الجديدة",
        name:"newpassword"
    },
    {
        icon:<FaUnlock/>,
        placeholder:"تاكيد كلمة السر الجديدة",
        name:"repassword"
    }
]


const AcountSetting=()=>{

    const [data,setData]=useState()

    return(
        <div className="container">
            {/*<CommonWindow>
                <div>
                    <h6>معلومات </h6>
                    <div>4</div>
                </div>
            
                <form>

                    {fields.map(({icon,placeholder,name})=>{
                        return(
                            <div key={name}>
                                <input placeholder={placeholder} name={name} id={name}/>
                                <div>
                                    {icon}
                                </div>
                            </div>
                        )
                    })}


                    <button>
                            تغير كلمه السر
                    </button>
                </form>
                </CommonWindow>*/}
        </div>
    )
}

export default AcountSetting


