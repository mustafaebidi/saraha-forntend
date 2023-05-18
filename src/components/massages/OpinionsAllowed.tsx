import {  useOpinionsAllowedQuery } from "../../store/massage/massageApiSlice"
import { GiEarthAfricaEurope } from 'react-icons/gi';


type Data={
    username:string,
    id:string | undefined
}


const OpinionsAllowed=({username,id}:Data)=>{
    const{data,isFetching,isSuccess}=useOpinionsAllowedQuery(id)

    let content;


    if(isFetching){
        content=(<div>Loading ... </div>)

    }

    console.log(data?.msg)

    if(isSuccess){
        const OpinionsAllowed=data?.msg
        content=OpinionsAllowed.length > 0 ? OpinionsAllowed.map(({reply,body,index,id}:any)=>{
            return(
                <div key={id} className="bg-[white]">
                    <p className="p-4 font-bold">{body}</p>
                    {reply ? <Reply reply={reply}/> :null}
                </div>
            )

        }) :<NoFoundOpinionsAllowed/>   

    }


    return(
        <div className="mt-12 w-[550px] max-w-full  mx-auto ">
            <h2 className="text-center mb-3  font-bold flex gap-4 items-center">
                <div className="h-[1px] flex-1 bg-[black]"></div>
                 <p>من الرسائل التي سمح بها <span className="capitalize">{username}</span> بعرضها</p>
                 <div className="h-[1px] flex-1 bg-[black]"></div>
            </h2>
            <div className="flex flex-col gap-4">
                {content}
            </div>
     
        </div>

    )

}


const Reply=({reply}:{reply:string})=>{
    return(
        <div className="p-4"> 
            <p className="bg-[#f0796e] text-[white] p-8 rounded-md relative text-center">
                <div className=" absolute bottom-[100%] right-4  border-transparent border-[15px] border-b-[15px] border-b-[#f0796e]"></div>
                {reply}
            </p>
        </div>
    )
}


const NoFoundOpinionsAllowed=()=>{

    return(

        <div className="p-6 text-center">

            
                <GiEarthAfricaEurope className=" mx-auto" size="70"/>
                <h3 className=" font-bold  my-2">لاتوجد رسائل ومصارحات علنية ...</h3>
                <p>
                لايرغب Nada Khaled بعرض اي مصارحات للعامة
اي رسائل يقوم هذا المستخدم بضبطها متاحة للعامة ستظهر هنا
                </p>
            


        </div>


    )
}


export default OpinionsAllowed