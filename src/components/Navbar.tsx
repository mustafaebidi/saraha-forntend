import { FC, Fragment, useEffect, useRef } from 'react';
import { ReactElement } from 'react';
import { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiToggles } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSendLogoutMutation } from '../store/auth/authApiSlice';
import { selectCurrentUser } from '../store/auth/authSlice';
import { IoIosSettings } from 'react-icons/io';
import { HiLockOpen } from 'react-icons/hi';

import Logo from "../image/Main.png"





 type navbarLi={
    id:number,
    title:string,
    icon:ReactElement,
    to?:string | any,
    auth:Boolean
    type?:string,
    hanldeClickUi:()=> void
 }



const navLi=[
    {
        id:1,
        title:"تسجيل",
        icon:<BsFillPersonFill/>,
        to:"registration",
        auth:false,

        
    },
    {
        id:2,
        title:"دخول",
        icon:<BsFillPersonFill/>,
        to:"login",
        auth:false,


    }
    ,
    {
        id:3,
        title:"اتصل بنا",
        icon:<BsFillPersonFill/>,
        to:"login",
        auth:false,




    },
    {
        id:30,
        title:"الرسائل",
        icon:<BsFillPersonFill/>,
        to:"massage",
        auth:true,


    },
    {
        id:4,
        title:"اعدادات الحساب",
        icon:<IoIosSettings/>,
        to:"manage",
        auth:true,

    },
    {
        id:5,
        title:"خروج",
        icon:<HiLockOpen/>,
        type:"div",
        auth:true,

    },
    {
        id:6,
        title:"عن الموقع",
        icon:<BsFillPersonFill/>,
        to:"about",
        auth:false,
        public:true,
    }
]





const Navbar=()=>{

    const {token} = useSelector(selectCurrentUser)
    const[open,setOpen]=useState(false)

    console.log(        window.matchMedia("(max-width: 767px))").matches)
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 767px))").matches
      )

    const nav=useRef<HTMLUListElement>(null)
    const containerNav=useRef<HTMLDivElement>(null)


    const handleClick=()=>{

        if( nav.current !== null && containerNav.current !== null  ){
            console.log(nav.current.offsetHeight)
            containerNav.current.style.height=open ? "0px" :`${nav.current.offsetHeight}px`
            setOpen((staet)=>!staet)
        }

    }




    const hanldeClickUi=()=>{

        console.log(matches)
        if( nav.current !== null && containerNav.current !== null  )
            if(open){
                containerNav.current.style.height="0px"
                setOpen(false)
            }


    }

    useEffect(() => {
        window
        .matchMedia("((max-width: 767px))")
        .addEventListener('change', e => {
            setMatches(e.matches)
            if( nav.current !== null && containerNav.current !== null  ){
                if(!e.matches){
                    containerNav.current.style.height="auto"
                    setOpen(false)

                }
                if(e.matches){

                    containerNav.current.style.height="0px"
                    setOpen(false)

                }


            }


            
        });
        
      }, []);





    return(
        <div className='bg-[#10BBB3] text-[white] absolute w-full  z-[4000]'>
            <div className="container flex justify-between flex-wrap">
                <div className='flex justify-between md:w-full items-center'>
                    <Link className='flex py-4 gap-1' to="/">
                        <img className='w-[41px] h-[32px]' alt="" src={Logo}/>
                        <span className='text-2xl font-bold'>صراحة</span>

                    </Link>
                    <div onClick={handleClick} className='hidden md:block cursor-pointer'>
                        <GiToggles/>
                    </div>
                </div>
     
                <div ref={containerNav}   className="md:h-0 md:w-full flex items-center overflow-hidden  duration-200">
                    <ul ref={nav}  className={`items-center duration-300 overflow-hidden flex gap-6 md:flex-col md:gap-0 h-fit `}>
                        {navLi.map((li,index)=>{
                            if(token && li.auth )
                                return <Navbaritem hanldeClickUi={hanldeClickUi} key={index} {...li} />
                            if(!token && !li.auth )
                                return <Navbaritem hanldeClickUi={hanldeClickUi} key={index} {...li} />
                            return li?.public ? <Navbaritem hanldeClickUi={hanldeClickUi} key={index} {...li} /> : null 

                        })}
                    </ul>
                </div>

            </div>
        </div>
 
    )
}

const Navbaritem : FC<navbarLi>  =({title,icon,id,to,type,hanldeClickUi})=>{


    const[logout]=useSendLogoutMutation()

    return(

        
        <Fragment>
            {type === "div" 
                ? <li className='md:w-full md:py-4 cursor-pointer flex gap-1  items-center' onClick={logout}>
                    <div>{icon}</div>   
                    <div>{title}</div>


                  </li>
            
                : <li onClick={hanldeClickUi} className='md:w-full md:py-4'  key={id}>
                    <Link className='flex items-center gap-1' to={to}>
                        <div>{icon}</div>   
                        <div>{title}</div>
                    </Link>
                </li>
            }

        </Fragment>


    )
}


export default Navbar