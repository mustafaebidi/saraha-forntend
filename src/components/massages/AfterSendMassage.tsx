



import { useEffect, useState } from 'react';
import { ImCheckmark } from 'react-icons/im';


import send from "../../image/send.gif"

import complete from "../../image/complete.gif"


const AfterSendMassage=()=>{

    const [loading,setLoading]=useState(true)


    useEffect(()=>{

        setTimeout(() => {
            setLoading(false)
            
        }, 4000 );

    },[])

    if(loading){
        return (

                <div className="bg-[white] p-4 text-center">
                    <h4 className=' font-bold text-xl'>انتظر من فضلك</h4>
                    <img className=" m-auto" alt="" src={send}/>
                    <p className='text-lg'>توصيل رسالتلك الي <span>Mustafa Ebid</span></p>
                </div>
        )
    }

    return (
        <div className='relative bg-[white] mt-6 p-4  text-center'>
            
            <div className='bg-green-500 rounded-full p-4  w-fit mx-auto mt-[-55px]'> 
                <ImCheckmark color='white' size="55" />
            </div>

            <div className='p-2'>
                <h3 className=' font-bold text-xl'>تم ارسال المصراحة بنجاح</h3>
                <img className='m-auto' src={complete} alt=""/>
                <h5 className=' text-lg'>شكرا علي مصارحتك</h5>
            </div>
        </div>
    )


  
}
export default AfterSendMassage