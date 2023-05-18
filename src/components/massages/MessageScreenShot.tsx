import Popup from "../popup"
import {toJpeg} from 'html-to-image';
import { useRef } from "react";



const MessageScreenShot=({body,toggleWindow,reply}:any)=>{

    const domEl = useRef<any>(null);



    const downloadImage = async () => {
        const dataUrl = await toJpeg(domEl?.current);
    
        const link = document.createElement('a');
        link.download = 'html-to-img.png';
        link.href = dataUrl;
        link.click();
    };



    return(
        <Popup>
            <div className="bg-[white]  basis-[500px] scale-[0.85] ">
                <div className="p-4 font-bold">الرسالة</div>

                <div ref={domEl} className="py-4 p-4  text-center  font-bold bg-[white]">
                    <p>
                        {body}

                    </p>

                    <div className="bg-[#ff00008e] p-4 text-center text-[white] mt-5">
                        {reply}
                    </div>

                </div>


                <div className=" p-4  flex gap-1 justify-end">
                    <div className="bg-[#1d628b] text-[white] p-1 px-3 cursor-pointer" onClick={downloadImage}>تحميل</div>
                    <div className="bg-[#e54028] text-[white] p-1 px-3 cursor-pointer" onClick={toggleWindow} >الغاء</div>
                </div>

        
            </div>
        </Popup>
    )

}

export default MessageScreenShot