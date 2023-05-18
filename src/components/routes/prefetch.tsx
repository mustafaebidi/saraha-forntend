import { store } from '../../store/index'
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { massageApiSlice } from '../../store/massage/massageApiSlice';




const Prefetch = () => {


    const firstTime=useRef(true)


    useEffect(() => {

        if(!firstTime.current){
            ///store.dispatch(massageApiSlice.util.prefetch('getMassages', 0, { force: true }))
        }

        return()=>{
            firstTime.current=false
        }


    }, [])

    return <Outlet />
}   
export default Prefetch