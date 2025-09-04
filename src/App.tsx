import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import ForgetPassword from "./pages/forgot-password";
import Navigation from "./components/navigation";
import PrivateRoute from "./components/private-route";
import ContributeData from "./pages/contribute-data";
import Questions from "./pages/questions";







const App = () => {

  return (
    <div className="h-full">
    <BrowserRouter>
    <Navigation />
      <Routes>
        
      <Route path="/" element={<Home/>} />
      <Route path="/sign-up" element={<SignUp />} />
     <Route path="/sign-in" element={<SignIn />} />
     <Route path="/password-reset" element={<ForgetPassword/>} />
     <Route path="/contribute-data" element={<ContributeData />} >
     </Route>
     <Route path="/view" element={<Questions />} />
     <Route path="*" element={<NotFound />} /> 
     {/* <Route path="/profile" element={<Privateroute />} >
        <Route path="/profile" element={<StartupProfilePage />} />
     </Route>
     
     
{/* 
     <Route path="/upload" element={<Upload />} />
     <Route path="/result" element={<Result />} />
     <Route path="/history" element={<History />} />
    

      */}
      </Routes>
    </BrowserRouter>
    <Toaster />
    </div>
  )
}

export default App

