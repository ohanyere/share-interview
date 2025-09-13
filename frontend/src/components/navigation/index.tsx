import { Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react"
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid"
import useMediaQuery from "../../hooks/useMediaQuery";
import { type props } from "./navigationTypes";
import useAuthStatusChange from "../../hooks/useAuthStatusChange";
import  {signOut}  from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";


const Navigation = ({scroll} : props) => {
    const isMediaAbove = useMediaQuery("(min-width : 1060px)")
    const [menuToggled, setMenuToggled] = useState<boolean>(false)
    const isTopOfPage = scroll ? "bg-transparent drop-shadow backdrop-blur-sm" : null
    const flexConts = "flex items-center justify-between"
    const {authStatus} = useAuthStatusChange()
    const dispatch = useDispatch<AppDispatch>()
    const {user, isSucess} = useSelector((state : RootState) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isSucess || !user){
            navigate("/")
        }
    }, [isSucess, user])

    const handleSignout = () => {
        dispatch(signOut())
    }
    
    
     return ( 
        <nav >
            <div className={`w-full py-6 z-[200] fixed top-0   left-0  mb-10  `}>
                <div className={`mx-auto w-[85%]   ${isTopOfPage}`}>
                    
                    <div className={`${flexConts} w-full gap-20`}>
                            
                            <Link
                                to={`/`}
                                >
                                    <h2 className="font-bold text-2xl text-dark-green-20 capitalize">pastquiz ai</h2>
                                </Link>

                        {/* right side */}
                        {
                            isMediaAbove ? (
                        <div className={`flex items-center justify-between w-3/6`}>
                            <div className={`flex items-center justify-between  text-[16px] w-3/6 capitalize text-black`}>
                               
                                <Link
                                    to={`/view`}
                                >
                                    view
                                </Link>
                                
                                <Link 
                                    to={`/contribute-data`}
                               
                                >
                                    contribute Data
                                </Link>

                                
                            </div>
                            <div className={`${flexConts} gap-10 capitalize text-[16px]`}>
                               {
                                    !authStatus ? (
                                        <Link
                                      to="/view"
                                      className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition capitalize"
                                    >
                                      get started
                                    </Link>
                                    ) : <Link
                                      
                                      className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition capitalize"
                                    >
                                      <button onClick={handleSignout}>sign out</button>
                                    </Link>
                               }
                            </div>
                        </div>
                            ) : 
                          <button className={`rounded-full bg-[#0A8080] p-2 transition duration-300 `}
                                    onClick={() => setMenuToggled(!menuToggled)}
                                >
                                    { !menuToggled ? <Bars3Icon  className="h-6 w-6 text-white"></Bars3Icon>: <XMarkIcon className="h-6 w-6 text-white"></XMarkIcon>}
                                
                                </button>  
                          
                                
                            
                        }
                    </div>
                </div>
            </div>
            {
                !isMediaAbove && menuToggled && (
                    <div className="fixed z-40   w-full transition-all    h-2/3 bg-black/50 drop-shadow-xl right-0 text-white">
                        <div className="flex justify-end p-12 text-2xl">
                            <button onClick={() => setMenuToggled(!menuToggled)}>
                                <XMarkIcon  className="h-6 w-6 text-white"/>
                            </button>
                        </div>
                        <div className={`flex justify-center h-1/2 items-center flex-col gap-10 text-xl capitalize`}>
                            
                               <Link
                                    to={`/view`}
                                >
                                    view
                                </Link>
                                
                                <Link 
                                    to={`/contribute-data`}
                               
                                >
                                    contribute Data
                                </Link>
                                
                                 {
                                    !authStatus ? (
                                        <Link
                                      to="/view"
                                      className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition capitalize"
                                    >
                                      get started
                                    </Link>
                                    ) : <Link
                                      
                                      className=" text-white py-2 px-4 border border-white rounded-xl capitalize"
                                    >
                                      <button onClick={handleSignout}>sign out</button>
                                    </Link>
                               }
                                
                            </div>
                    
                    </div>
                ) 
            }
        </nav>
     );
}
 
export default Navigation;