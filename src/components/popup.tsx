import React, { ReactNode, useEffect } from "react"
import ReactDOM from "react-dom"

const popUp=document.getElementById("pop-up")


const Popup=({children}:{children:ReactNode})=>{


    useEffect(()=>{

        document.querySelector("body")?.classList.add("noScroll")

        return ()=>{
            document.querySelector("body")?.classList.remove("noScroll")
        }

        
    },[])

    return(

        ReactDOM.createPortal(
            <div className="fixed min-h-screen  flex justify-center items-center w-full bg-[#00000029] z-[1000] px-3 py-5">
                    <div className="animate-[bounceIn_0.35s_ease] w-full flex justify-center items-center">
                        {children }
                    </div>
                </div>
            ,popUp as Element)

        
    )
}

export default Popup