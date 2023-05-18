import { Link } from "react-router-dom"
import { FaFacebookF, FaFacebookSquare } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';

import { TiMessages } from 'react-icons/ti';
import { RiSettings5Fill } from 'react-icons/ri';
import { FaThList } from 'react-icons/fa';
import { TiArrowUnsorted } from 'react-icons/ti';
import { GrFormClose } from 'react-icons/gr';
import { Fragment, useEffect, useMemo, useState } from "react";
import Massage from "../components/massages/massage";


import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/auth/authSlice";
import {  useGetAllMassgesQuery, useGetMassagesQuery } from "../store/massage/massageApiSlice";
import { deleteAll, selectHasNextPage, selectMessageIds } from "../store/massage/massageSlice";


import mainPhoto from "../image/avatar.png"

import background from "../image/background.jpg"
import ReactLoading from "react-loading";
import LoadingButton from "../components/LoadingButton";
import { useAppDispatch } from "../store";
import { URL } from "../common";






export type massage={
    _id: string,
    to: string,
    body: string,
    favorite: boolean,
    createdAt: string,
    updatedAt: string,
    display:boolean,
    __v: number,
    id:number,
    reply?:string
}


const UserInfoView=({count}:{count:number})=>{
    const {username,_id:id,img} = useSelector(selectCurrentUser)

    const{
        isLoading,
        data,
        refetch
    }=useGetAllMassgesQuery("count")


    const avatar=img ? `${URL}/profile/${img}` : mainPhoto

    console.log(data)

    return(

        <div className="basis-[250px] flex-1  bg-[white] pb-5">
            <div style={{
                backgroundImage: `url(${background})`,
            }} className="bg-cover h-36 relative ">

            </div>

   

            <div className=" px-3">

                <div className="flex justify-center z-10">
                    <img className="z-10 mt-[-54px] w-28 max-w-28 h-28 rounded-full" src={avatar} alt=""/>
                </div>

                <div className="text-center font-bold capitalize">{username}</div>

                <div className="flex justify-center items-center gap-4">
                    <div>
                        <div className="  font-bold text-xs">الرسائل</div>
                        <div className="text-center  text-base">{data?.count ? data.count  :0}</div>
                    </div>
                    <SharFacebook/>
                    
                </div>

                <div className="text-center mb-6">
                    <a target="_blank" className="text-[#0CC8C9] font-bold break-all" href={`${URL}/sendMassage/${id}`} rel="noreferrer">{URL}/sendMassage/{id}</a>
                </div>

                <div className="text-center">
                    <div >لكي نستقبل الرسائل</div>
                    <div>
                        <Link className="flex justify-center items-center gap-1 text-[#0CC8C9]" to="">
                            <FaFacebookSquare/>
                            شارك حسابك علي الفيسوبك
                        </Link>
                    </div>
                    
                    <div>
                        <Link className="flex justify-center items-center gap-1 text-[#0CC8C9]" to="">
                            <BsTwitter/>
                            شارك حسابك علي توتير
                        </Link>
                    </div>

                    <div className="mt-10">
                        <Link className="flex justify-center items-center gap-1 text-[#0CC8C9]" to="/manage">
                            <RiSettings5Fill/>
                            اعدادات الحساب
                        </Link>
                    </div>
        
                </div>

            </div>



        </div>

    )
}


const SharFacebook=()=>{

    return(

        <a className="bg-[#1877f2] flex  gap-1  w-fit  text-xs  rounded  justify-center items-center text-[white] font-bold px-3 py-1" href="https://www.facebook.com/sharer/sharer.php?u=example.org" target="_blank" rel="noreferrer">
            مشاركة
            <div className=" rounded-full  overflow-hidden ">
                <FaFacebookF size="13" color="#1877f2"  className="bg-[white] pt-[2px]"/>
            </div>
        </a>
    )
}

const MessagePage=()=>{
    const dispath=useAppDispatch()


    console.log("from parent")




    useEffect(()=>{


        console.log("from parent")


        return()=>{

            dispath(deleteAll())

        }

    },[dispath])
    

    return(
        <div>
            <div className="container items-start flex flex-wrap gap-3">
                <UserInfoView count={50} />
                <ContainerMassages/>
            </div>
        </div>
    )

}


type Option={
    
    setOption:React.Dispatch<React.SetStateAction<{skip: number,sort: number,}>>
}

const OptionMassage=({setOption}:Option)=>{

    const[open,setOpen]=useState<"main"|"sub" | null >(null)


    const handleOpen=()=>{

        if(open){
            setOpen(null)
            return;
        }
        setOpen("main")

    }


    const sortBy=(value:number)=>{

        setOption((state)=>({skip:0,sort:value}))
        setOpen(null)

    }

    return(
        <div className="bg-[#e8e8e8] relative p-2">
            <div onClick={handleOpen}  className="flex  justify-center items-center gap-2 cursor-pointer">
                <FaThList/>
                <div >خيارات</div>
            </div>
            <div className={`${open === "main" ?"block" :"hidden"} absolute  top-10 left-0 bg-[white] Colored shadow z-50`}>
                <div onClick={()=>setOpen("sub")} className="flex  items-center p-2 cursor-pointer">
                    <TiArrowUnsorted size={20}/>
                    <span className="text-sm">ترتيب الرسائل</span>
                </div>
                <div className="flex justify-center items-center p-2 cursor-pointer">
                    <TiArrowUnsorted size={20}/>
                    <span className=" text-sm">حذف كل الرسائل</span>
                </div>
                <div onClick={ ()=>setOpen(null)} className="p-2 flex  items-center cursor-pointer">
                    <GrFormClose size={20}/>
                    <span className="text-sm">الغاء</span>
                </div>

            </div>

            <div className={`${open === "sub" ?"block" :"hidden"} absolute  top-10 left-0 bg-[white] Colored shadow z-50`}>
                <div onClick={()=>sortBy(1)}  className="flex  items-center p-2 cursor-pointer">
                    <TiArrowUnsorted size={20}/>
                    <span className="text-sm">الاحدث اولا</span>
                </div>
                <div onClick={()=>sortBy(-1)} className="flex justify-center items-center p-2 cursor-pointer">
                    <TiArrowUnsorted size={20}/>
                    <span className=" text-sm">الاقدم اولا</span>
                </div>
                <div onClick={ ()=>setOpen(null)} className="p-2 flex  items-center cursor-pointer">
                    <GrFormClose size={20}/>
                    <span className="text-sm">الغاء</span>
                </div>

            </div>
        </div>
    )

}

const ContainerMassages=()=>{

    const[filter,setFilter]=useState(false)
    const[option,setOption]=useState({skip:0,sort:1})


    return(

        <div className="bg-[white] pt-3 flex-1 basis-[600px]  min-w-[219px] ">

            <div className="text-center p-4 flex justify-center gap-2 items-center ">
                <TiMessages size={25}/>
                <h2 className=" font-medium   text-2xl">الرسائل</h2>
            </div>

                <MessagesControl setOption={setOption} setFilter={setFilter} filter={filter} />
                <Messages  option={option} setOption={setOption}/>

        </div>

    )

}


type PropsMessages={
    option:{
        skip:number,
        sort:number
        
    },
    setOption:React.Dispatch<React.SetStateAction<{
        skip: number;
        sort: number;
    }>>

}


const Messages=({option,setOption}:PropsMessages)=>{


    const {
        data,
        refetch,
        isFetching
    } =useGetMassagesQuery(option,{refetchOnMountOrArgChange:true})


    const hasNextPage=useSelector(selectHasNextPage)
    const orderedMessageIds = useSelector(selectMessageIds)





    const handleLoadMore=async()=>{

        if(orderedMessageIds.length === option.skip){
            await refetch()
        }
        setOption((state)=>({
            ...state,
            skip:orderedMessageIds.length,
        }))
    }



    if((isFetching && !(orderedMessageIds.length > 0) ) ){

        return (
            <div className="flex justify-center items-center py-1">
                <ReactLoading type="bubbles" color="#10BBB3" height={50} width={50} />
            </div>

        )
    }


    if((!(orderedMessageIds.length > 0) && !hasNextPage )){
        return(
            <div className="p-4">
                <h2 className=" font-bold text-center mb-2">لاتوجد لديك رسائل ومصارحات حالياً</h2>
                <p className="text-center font-light  px-5">
                    شارك الرابط الخاص بك على صفحات التواصل الأجتماعي مثل الفيسبوك وتويتر
                    ودع الناس يكتبون لك دون أن تعرف المصدر
                </p>
            </div>
        )
    }



    let newListData=[...orderedMessageIds] as number[]
    let dataOrder;


    if(option.sort === 1){
        dataOrder=newListData.sort(function(a:number, b:number){return a-b});

    }
    else{
        dataOrder=newListData.sort(function(a:number, b:number){return b-a});
    }



    return (
        <div>
            {dataOrder?.map((id)=>{
                return(
                    <Massage key={id} id={id} />
                )
            })}
            {(hasNextPage ) ? <LoadingButton color="#2D2F31C9" loading={isFetching} width="100%" backgroundColor="#e8e8e8" onClick={handleLoadMore} >تحميل المزيد</LoadingButton>:null} 
        </div>
    )


}


const MessagesControl=({filter,setFilter,setOption}:any)=>{


    return(

        <Fragment>

            {/*<div className="flex overflow-hidden  rounded">
                {[{title:"كل الرسائل",filter:false},{title:"المفضلة",filter:true}].map(({title,filter:value},index)=>{
                    return(
                        <div onClick={()=>setFilter(value)} key={index} className={` ${filter === value ?"bg-[#2D2F31] text-[white]" :"text-[#2D2F31C9] bg-[#00000017]" }  font-extrabold flex-1 text-center cursor-pointer bg-[#2D2F31] text-[white] p-2`}>{title}</div>

                    ) 
                })}
            </div>*/}


            <OptionMassage setOption={setOption}/>

        </Fragment>

        

    )
}


export default MessagePage


