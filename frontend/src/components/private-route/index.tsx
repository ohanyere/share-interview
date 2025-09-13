import useAuthStatusChange from "../../hooks/useAuthStatusChange";
import Htext from "../../utilis/Htext";
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = () => {
    const {checkingStatus, authStatus} = useAuthStatusChange()

    if(checkingStatus){
        return <Htext className="flex justify-center items-center font-semibold text-lg h-screen ">loading...</Htext>
    }

    return  authStatus ? <Outlet /> : <Navigate to="/sign-in"/>;
}
 
export default PrivateRoute;