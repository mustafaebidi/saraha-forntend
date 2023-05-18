import { useRef } from "react";

type open ={
    open:boolean
}


const SingleMassage=({open}:open)=>{
    const domEl = useRef<HTMLDivElement>(null!);


    return(
        <div className={`${open ? "block" :"hidden"} bg-[#00000074]  z-50 fixed  w-full h-screen flex justify-center items-center`}>
            <div  ref={domEl}   className='bg-[white] w-[640px]'>
                <div className='bg-[white] border-[black] border-b  mb-3 p-2 font-bold text-xl'>الرساله</div>
                <div className='mx-auto bg-no-repeat bg-contain	 overflow-hidden font-extrabold  text-xl text-center px-28 pl-8 min-w-[600px] min-h-[484px]  w-[600px] h-[434px] flex  justify-center items-center' style={{backgroundImage: `url("../../reso/massage.png")`}} >
                </div>
                <div className='bg-[white] mt-5  border-t border-t-[red] '>
                    <div className='flex justify-end p-2  gap-3' >
                        <div className=' px-3 py-[6px] border border-[red] rounded'>اغلاق</div>
                        <div  className=' px-3 py-[6px] border border-[red] rounded'>تحميل</div>
                    </div>
                </div>

            </div>


        </div>



    )
}

export default SingleMassage

