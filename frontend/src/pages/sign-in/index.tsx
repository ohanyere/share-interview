import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { resetFlags, signIn, signUpWithGoogle } from "../../features/auth/authSlice";
import type { AppDispatch, RootState } from "../../store/store";
import Button from "../../components/button";
import { useEffect } from "react";


const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

type FormValues = z.infer<typeof schema>;

const Signin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSucess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if(isSucess || user){
      navigate("/view")
      dispatch(resetFlags())
    }
    if(isError){
      toast.error(message || "login failed")
      dispatch(resetFlags())
    }
  }, [isError, isSucess, navigate, user])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
      dispatch(signIn(data))
  };

  const handleGoogle = () => {
      dispatch(signUpWithGoogle()).unwrap();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Sign in to ShareQuestions
        </h2>

        {/* Google Sign In */}
        <Button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 mb-4 border border-gray-300 text-gray-700 hover:bg-gray-100 py-3 rounded-lg transition font-medium"
        >
          <LogIn className="w-5 h-5 text-indigo-600" />
          Sign in with Google
        </Button>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="text-right">
            <Link
              to="/password-reset"
              className="text-sm text-indigo-700 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {isLoading ? "Signing in..." : "Continue"}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-700 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
