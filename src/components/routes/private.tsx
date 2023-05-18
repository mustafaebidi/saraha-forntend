import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/auth/authSlice"


const Private = () => {

    const {token} = useSelector(selectCurrentUser)
    const location = useLocation()

    return (
        token
            ? <Outlet/>
            : <Navigate to="/" state={{ from: location }} replace />
    )
}
export default Private

