import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { resetFlags, signUp, signUpWithGoogle } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";
import type { AppDispatch, RootState } from "../../store/store";
import Button from "../../components/button";
import { useEffect } from "react";


const schema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

type FormValues = z.infer<typeof schema>;

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isError, isSucess, user,message} = useSelector((state :RootState) => state.auth)
  const navigate = useNavigate();


  useEffect(() => {
    if(user || isSucess){
      navigate("/view")
      toast.success("Welcome to ShareQuestions!");
      dispatch(resetFlags())
    }

    if(isError){
      toast.error(message || "failed to sign up");
      dispatch(resetFlags())
    }
  }, [navigate, dispatch, isError, isSucess, user])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const handleGoogle = async () => {
      dispatch(signUpWithGoogle());
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { name: displayName, email, password } = data;
      dispatch(signUp({ displayName, email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Create Your ShareQuestions Account
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Join the community and start sharing real quiz questions today.
        </p>

        {/* Google Sign Up */}
        <Button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 mb-4 border border-gray-300 text-gray-700 hover:bg-gray-100 py-3 rounded-lg transition font-medium"
        >
          <LogIn className="w-5 h-5 text-indigo-600" />
          Sign up with Google
        </Button>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

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
            {isSubmitting ? "Signing up..." : "Continue"}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-blue-700 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
