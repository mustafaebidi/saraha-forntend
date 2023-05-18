import { Outlet, Link, useLocation, Navigate } from "react-router-dom"
import {  useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from "../../store/auth/authSlice"
import { useRefreshMutation } from "../../store/auth/authApiSlice"
import ReactDOM from "react-dom"
const loadingPage=document.getElementById("loading")


const PersistLogin = ({children}:any) => {

    const {token} = useSelector(selectCurrentUser)
    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isSuccess,
    }] = useRefreshMutation()


    const[loading,setloading]=useState(true)
    const location=useLocation()


    useEffect(()=>{

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            const verifyRefreshToken = async () => {
                try {
                    //const response = 
                    await refresh(undefined)
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                    console.log(4444)
                    setTimeout(() => {
                        setloading(false)
                    }, 200);
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token ){
                verifyRefreshToken()
            }
        }


        return () => {
            effectRan.current = true
        }
    
    },[refresh, token])

    console.log(loading)
    if(loading){

        return(
            ReactDOM.createPortal(<div className=" absolute h-full z-[1500] w-full  min-w-[100vh]  min-h-screen flex bg-[white] justify-center items-center">loading</div>,loadingPage as Element)
        )
        
    }

    const ssss=location?.state?.from?.pathname ? <Navigate to={`${location?.state?.from?.pathname }`}  /> :  children

    if (isSuccess && trueSuccess) { //persist: yes, token: yes
        return ssss
    }
    if (token && isUninitialized) { //persist: yes, token: yes
        return ssss
    }

    return ssss


  
}
export default PersistLogin