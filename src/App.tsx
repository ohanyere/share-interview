import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import Navigation from "./components/navigation";
import PrivateRoute from "./components/private-route";
import { Suspense, lazy } from "react";
import Spinner from "./components/spinner";
const Question = lazy(() => import("./pages/question"))
const Questions = lazy(() => import("./pages/questions"))
const UpdateCard = lazy(() => import("./components/update-card"))
const ContributeData = lazy(() => import("./pages/contribute-data"))
const Home = lazy(() => import("./pages/home"))
const ForgetPassword = lazy(() => import("./pages/forgot-password"))
const SignIn = lazy(() => import("./pages/sign-in"))
const SignUp = lazy(() => import("./pages/sign-up"))
const NotFound = lazy(() => import("./pages/not-found"))





const App = () => {

  return (
    <>
    <Suspense fallback={<Spinner /> }>
      <BrowserRouter>
    <Navigation />

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
    </BrowserRouter>
    </Suspense>
    <Toaster />
    </>
    
  )
}

export default App

