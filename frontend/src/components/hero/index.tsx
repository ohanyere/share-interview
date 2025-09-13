import { useNavigate } from "react-router-dom";
import Button from "../button";


export default function Hero() {
const navigate = useNavigate()
const handleNavigate = () : void => {
        navigate("/view")
    }
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-3xl text  ">
        <h1 className="text-4xl  text- md:text-6xl font-extrabold text-gray-700 leading-normal text-center">
          Share <span className="text-blue-600">Past Quiz Questions</span>  
          & Help Others Succeed 
        </h1>
        <p className="mt-6 text-lg text-gray-600 text-center ">
          A community-driven platform where students share real quiz questions 
          from courses to help each other prepare better.
        </p>
        <div className="mt-8 flex sm:justify-center w-full flex-col sm:flex-row gap-7">
          <Button
            onClick={handleNavigate}
            className="px-12 py-3 bg-black  text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </Button>
          <Button
            onClick={handleNavigate}
            className="px-8 py-3 border  border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-500 hover:text-white transition"
          >
            Explore Questions
          </Button>
        </div>
      </div>
    </section>
  )
}

// export default function Hero() {
//   return (
//     <section className="bg-gradient-to-b from-indigo-50 to-white min-h-screen flex items-center justify-center px-6">
//       <div className="text-center max-w-2xl">
//         <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
//           Share <span className="text-indigo-600">Interview Questions</span>  
//           & Help Others Succeed 🚀
//         </h1>
//         <p className="mt-6 text-lg text-gray-700">
//           A community-driven platform where candidates share real interview questions 
//           from top companies to help each other prepare better.
//         </p>
//         <div className="mt-8 flex justify-center gap-4">
//           <a
//             href="/signup"
//             className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
//           >
//             Get Started
//           </a>
//           <a
//             href="/explore"
//             className="px-6 py-3 border border-indigo-200 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition"
//           >
//             Explore Questions
//           </a>
//         </div>
//       </div>
//     </section>
//   )
// }
