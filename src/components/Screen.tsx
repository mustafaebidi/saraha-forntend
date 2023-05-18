import {ReactNode } from "react"


type Props={
    children:ReactNode

}

const Screen=({children}: Props)=>{

    return(
        <div className=" min-h-[94vh]  pt-20">
            {children}
        </div>
       
    )
    
}

export default Screen