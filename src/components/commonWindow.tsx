import { ReactElement, ReactNode } from "react"

import Right from "../image/format1.png"
import Left from "../image/format2.png"


const CommonWindow=({children ,title,icon}:{children:ReactNode,title?:string,icon?:ReactElement})=>{
    return(
        <div className="p-2  pt-10 bg-[white] relative rounded">

            <img alt="" className=" absolute w-8 h-8 right-1 top-2 opacity-10" src={Left}/>
            <img alt="" className=" absolute w-8 h-8 left-1 top-2 opacity-10" src={Right}/>
            <div>
                <div className=" mx-auto w-fit p-2 mb-3 flex flex-col items-center text-center mt-[-70px]">
                    { icon ? <div>
                        {icon}
                    </div>:null}

                    <h6> {title}</h6>
                </div>
                {children}
            </div>
       
        </div>
    )
}

export default CommonWindow