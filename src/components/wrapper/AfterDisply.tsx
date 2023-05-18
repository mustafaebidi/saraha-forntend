import { Fragment, ReactNode, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import ReactLoading from "react-loading"
import { useSelector } from "react-redux"
import { useRefreshMutation } from "../../store/auth/authApiSlice"
import { selectCurrentUser } from "../../store/auth/authSlice"
import GlobalLoading from "../GlobaLoading"

const loadingPage=document.getElementById("loading")




const AfterDisply=({children}:{children:ReactNode})=>{


    const {token} = useSelector(selectCurrentUser)
    const effectRan = useRef(false)
    const[loading,setloading]=useState(token ? false : true)


    const firstTime=useRef<any>(true)


    const [refresh, {
        status,
    }] = useRefreshMutation()



    useEffect(()=>{

        let dada: string | number | NodeJS.Timeout | undefined;

        dada=setTimeout(() => {
            setloading(false)
            clearTimeout(dada)
        }, 1000);



        return () => {
            clearTimeout(dada)
        }

    },[])



    useEffect(()=>{
        let dada: string | number | NodeJS.Timeout | undefined;


 

        const verifyRefreshToken = async () => {
            try {
                await refresh(undefined).unwrap()
                console.log(555)

                
            }
            catch (err) {
                console.log(err)
            }
        }

        if (!token && firstTime.current ){

            firstTime.current=false
            verifyRefreshToken()
            
        }
        
        return () => {
            effectRan.current = true
            clearTimeout(dada)
        }
    
    },[refresh, token])


    if((loading ) || status === "pending"){

        return(

            <GlobalLoading/>

            )
        
    }
  

    return(
        <Fragment>
            {children}
        </Fragment>

    )

}

export default AfterDisply