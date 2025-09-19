import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import useMediaQuery from "../../hooks/useMediaQuery";
import {signOut } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import useScroll from "../../hooks/useScroll";


const Navigation = () => {
  const isMediaAbove = useMediaQuery("(min-width : 1060px)");
  const [menuToggled, setMenuToggled] = useState<boolean>(false);
  const navigate = useNavigate()
  const {scroll} = useScroll()
  const isTopOfPage = scroll
    ? "bg-transparent drop-shadow backdrop-blur-sm "
    : "";
  const flexConts = "flex items-center justify-between";  


  const dispatch = useDispatch<AppDispatch>();

  const { user, isSucess } = useSelector((state: RootState) => state.auth);
 


  const handleSignout = () => {
    dispatch(signOut());
    navigate('/')
  };

  const AuthButtons = () =>
    user || isSucess ? (
      <button
        onClick={handleSignout}
        className="px-8 py-2  text-white rounded-lg bg-gray-700 transition capitalize"
      >
        sign out
      </button>
    ) : (
      <Link
        to="/view"
        className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition capitalize"
      >
        get started
      </Link>
    );

  return (
    <nav>
      <div className={`w-full py-6 z-[200] fixed top-0 left-0 mb-10 `}>
        <div className={`mx-auto w-[85%] ${isTopOfPage}`}>
          <div className={`${flexConts} w-full gap-20`}>
            <Link to="/">
              <h2 className="font-bold text-2xl text-dark-green-20 capitalize">
                pastquiz ai
              </h2>
            </Link>

            {/* Right side */}
            {isMediaAbove ? (
              <div className="flex items-center justify-between w-3/6 0">
                <div className="flex  items-center justify-between text-[16px] w-3/6 capitalize text-black">
                  <Link to="/view">questions</Link>
                  <Link to="/contribute-data">share question</Link>
                </div>
                <div className={`${flexConts} gap-10 capitalize text-[16px]`}>
                  <AuthButtons />
                </div>
              </div>
            ) : (
              <button
                className="rounded-full bg-green-800 p-2 transition duration-300"
                onClick={() => setMenuToggled(!menuToggled)}
              >
                {!menuToggled ? (
                  <Bars3Icon className="h-6 w-6 text-white" />
                ) : (
                  <XMarkIcon className="h-6 w-6 text-white" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {!isMediaAbove && menuToggled && (
        <div className="fixed z-40 w-full transition-all h-2/3 bg-black/50 drop-shadow-xl right-0 text-white">
          <div className="flex justify-end p-12 text-2xl">
            <button onClick={() => setMenuToggled(false)}>
              {/* <XMarkIcon className="h-6 w-6 text-white" /> */}
            </button>
          </div>
          <div className="flex justify-center h-1/2 items-center flex-col gap-10 text-xl capitalize">
            <Link to="/view">view questions</Link>
            <Link to="/contribute-data">share questions</Link>
            <AuthButtons />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
