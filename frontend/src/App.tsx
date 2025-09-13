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
import Question from "./pages/question";
import UpdateCard from "./components/update-card";







const App = () => {

  return (
    <>
    <BrowserRouter>
    <Navigation />
    <main className="pt">

      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/sign-up" element={<SignUp />} />
     <Route path="/sign-in" element={<SignIn />} />
     <Route path="/password-reset" element={<ForgetPassword/>} />
     <Route path="/contribute-data" element={<PrivateRoute />}>
     <Route path="/contribute-data" element={<ContributeData />} >
     </Route>
     </Route>
     <Route path="/view" element={<PrivateRoute />}>
     <Route path="/view" element={<Questions />} />
     </Route>
     <Route path="*" element={<NotFound />} /> 
     <Route path="/cards/:id" element={<Question/>} /> 
     <Route path="/cards/update/:id" element={<UpdateCard />} />
     </Routes>
      </main> 
    </BrowserRouter>
    <Toaster />
    </>
    
  )
}

export default App

