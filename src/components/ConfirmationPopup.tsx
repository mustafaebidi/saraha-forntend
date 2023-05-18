import ReactDOM from "react-dom"
const popUp=document.getElementById("pop-up")



const ConfirmationPopup=()=>{



    let content=(
        <div className="w-[400px]  px-4 "> 
            <div className="py-2">تاكيد</div>
            <p className="py-2">
             هل انت متأكد من أضهار هذه الرسالة الى العامة؟ ستكون متاحة للمشاهدة على الرابط الخاص بك
            </p>
            <div className="text-[white] flex flex-wrap  gap-3 py-2">
                <div className="bg-[#1d628b]">نعم</div>
                <div className="bg-[#e54028]">لا</div>

            </div>
        </div>
    )
    


    return(
        ReactDOM.createPortal(content,popUp as Element)

    )
}


export default ConfirmationPopup