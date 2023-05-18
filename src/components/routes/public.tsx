import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/auth/authSlice"


const Public = () => {

    const {token} = useSelector(selectCurrentUser)
    const location = useLocation()

    return (
        token
            ? <Navigate to="/" state={{ from: location }} replace />
            : <Outlet/>
    )
}
export default Public

