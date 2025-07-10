import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignupFormProps {
  onSignup: (email: string, password: string) => Promise<void>;
  onOAuthSignin: (provider: "google") => Promise<void>;
  error?: string;
  loading?: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSignup,
  error,
  loading,
  onOAuthSignin,
}) => {
  const [email, setEmail] = useState("");
  const [passwrod, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(email, passwrod);
  };

  return (
    <div className="relative container mx-auto -mt-50 z-20">
      <div className="mx-auto w-full px-6 md:w-8/12 lg:w-4/12">
        <div className="w-full bg-white p-6 rounded-lg shadow-md font-inter">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
            Register with
          </h2>

          {/* Social Login Buttons (Placeholders for icons) */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              type="button"
              className="cursor-pointer flex items-center justify-center w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-sm hover:-translate-y-1 disabled:bg-gray-400"
              aria-label="Register with Google"
              onClick={() => onOAuthSignin("google")}
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                className="mr-3" // Removed curly braces and comment from within the attribute
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign up with Google
            </button>
          </div>

          {/* OR Separator */}
          <div className="relative w-full my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="mt-6" onSubmit={handleSubmit}>
            {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="p-3 border border-solid border-gray-300 bg-white focus:shadow-md outline-none w-full rounded-md focus:border-blue-500"
                required
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="p-3 border border-solid border-gray-300 bg-white focus:shadow-md outline-none w-full rounded-md focus:border-blue-500"
                required
                aria-label="Password"
                value={passwrod}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Terms and Conditions Checkbox */}
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="cursor-pointer form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-2"
                aria-label="I agree to the Terms and Conditions"
                required
              />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                I agree the
                <a className="cursor-pointer font-semibold hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="transition-all disabled:bg-gray-400 hover:shadow-md ease cursor-pointer bg-gray-800 active:bg-gray-700 hover:-translate-y-1 text-white font-bold p-3 rounded-md focus:outline-none focus:shadow-outline w-full duration-200"
            >
              Sign up
            </button>
          </form>

          <div className="flex gap-1 text-sm text-gray-700 mt-6">
            <p>Already have an account?</p>
            <a
              onClick={() => navigate("/login")}
              className="cursor-pointer font-bold hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
