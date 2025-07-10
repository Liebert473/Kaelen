import React from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      console.log("Login error: ", error.message);
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const handleOAuthSignin = async (provider: "google") => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: "http://localhost:5173/dashboard",
        },
      });

      if (error) {
        console.log(error.message);
        setError(error.message);
      }
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred during social login.");
    }
    setLoading(false);
  };

  return (
    <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
      {/** Main Section */}
      <main className="mt-0 transition-all duration-200 ease-in-out">
        <section>
          <div className="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
            <div className="container z-1 mx-auto">
              <div className="flex flex-wrap px-2">
                {/** SigninForm */}
                <LoginForm
                  onSignin={handleLogin}
                  error={error || undefined}
                  loading={loading}
                  onOAuthSignin={handleOAuthSignin}
                />
                {/** Banner */}
                <div className="absolute top-0 right-0 hidden h-full w-6/12 lg:flex p-4">
                  <div className="px-24 text-center relative flex flex-col justify-center items-center bg-cover h-full w-full overflow-hidden rounded-xl bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')]">
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-blue-500 to-violet-500 opacity-60 bg-cover"></span>
                    <h4 className="mt-8 text-white font-bold text-2xl z-20">
                      "Attention is the new currency"
                    </h4>
                    <p className="mt-2 z-20 text-white">
                      The more effortless the writing looks, the more effort the
                      writer actually put into the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
