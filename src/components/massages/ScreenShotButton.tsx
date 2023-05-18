import { BiScreenshot } from "react-icons/bi"
import { Fragment, useState } from "react";
import MessageScreenShot from "./MessageScreenShot";




type Props={
    body:string,
    reply:string
}

const ScreenShotButton=({body,reply}:Props)=>{



    const[visable,setVisable]=useState(false)


    const toggleWindow=()=>{

        setVisable((state)=>!state)

    }






    return(

        <Fragment>


            <div className="shot cursor-pointer flex justify-end" onClick={toggleWindow}>
                <BiScreenshot size={25}/>
            </div>

            {visable ? <MessageScreenShot reply={reply} toggleWindow={toggleWindow} body={body}/>:null}

        </Fragment>


    )

}

export default ScreenShotButton