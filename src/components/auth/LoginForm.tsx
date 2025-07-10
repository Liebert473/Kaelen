import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface SigninFormProps {
  onSignin: (email: string, password: string) => Promise<void>;
  error?: string;
  loading?: boolean;
  onOAuthSignin: (provider: "google") => Promise<void>;
}

const LoginForm: React.FC<SigninFormProps> = ({
  onSignin,
  error,
  loading,
  onOAuthSignin,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignin(email, password);
  };

  return (
    <div className="flex w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
      <div className="w-full space-y-8 bg-white p-8 rounded-lg">
        <div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Log in</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and password to log in
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className=" duration-200 appearance-none relative block w-full p-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-fuchsia-300 sm:text-sm transition-all ease focus:shadow-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className=" duration-200 appearance-none relative block w-full p-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-fuchsia-300 sm:text-sm transition-all ease focus:shadow-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Switch
                id="remenberMe"
                className="cursor-pointer data-[state=checked]:bg-blue-500"
              />
              <Label htmlFor="rememberMe" className="ml-2">
                Remember me
              </Label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className=" active:opacity-85 transition-all ease duration-200 cursor-pointer group relative w-full flex justify-center p-4 rounded-md text-white text-sm font-bold bg-blue-500 disabled:bg-gray-400 hover:-translate-y-0.5 hover:shadow-md focus:outline-none"
              disabled={loading}
            >
              log in
            </button>
          </div>
        </form>

        {/* OR Separator */}
        <div className="relative w-full my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        {/* Social log in Buttons (Placeholders for icons) */}
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
            Log in with Google
          </button>
        </div>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
