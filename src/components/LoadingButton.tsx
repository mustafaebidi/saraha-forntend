import { useRef, useState } from "react";

interface Props {
    border?: string,
    height?: string,
    onClick?: (e?:any) => void,
    radius?: string,
    width?: string,
    loading?:boolean,
    children?: React.ReactNode;
    disable?:boolean
    backgroundColor?:string,
    color?:string,
    hover?:boolean
    
  }


const LoadingButton=({children,loading,color,onClick,disable,width="fit-content",backgroundColor,hover=true,radius}:Props)=>{


    const[load,setlLoad]=useState(false)


    const global=useRef<any>()






    const handleClick=()=>{

        

        console.log(navigator.onLine)


        clearTimeout(global.current)
        setlLoad(false)

        global.current=setTimeout(() => {
            setlLoad(true)
        }, 200);

        

        if(onClick)
            onClick()



    }


    return(

        <div
            onClick={handleClick}
            style={{width,backgroundColor,borderRadius:radius,color}}
            className={` overflow-hidden rounded relative flex  gap-2 py-2 px-4 items-center ${ loading || disable ? "pointer-events-none"  :" cursor-pointer" } text-[white]  text-center justify-center font-bold `}
        >
            {children}
            {(hover) ? <div className=" w-full  h-full absolute top-0 left-0 bg-[#0000000e]  duration-200 z-[50] opacity-0 hover:opacity-100 "></div>:null}
            {(disable) ? <div className=" w-full  h-full absolute top-0 left-0 bg-[#ffffff5d]  duration-200 z-[50] "></div>:null}

            {(loading && load) ? <div className={`w-4 h-4 border-[3px]  border-[white] border-r-transparent  rounded-full animate-spin`}>
                
            </div> : null}
        </div>
    )   
}

export default LoadingButton