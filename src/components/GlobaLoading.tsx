

import ReactDOM from "react-dom"
import ReactLoading from "react-loading"
const loadingPage=document.getElementById("loading")




const GlobalLoading=()=>{

    return(
        ReactDOM.createPortal(

            <div className="absolute h-full z-[5555] w-full  min-h-screen flex bg-[white] justify-center items-center">       
                <ReactLoading type="bubbles" color="#10BBB3" height={100} width={100} /> 
            </div>,loadingPage as Element

        )
    )
}

export default GlobalLoading