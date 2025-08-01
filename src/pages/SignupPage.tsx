import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log(error.message);
      setError(error.message);
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
      });

      if (error) {
        setError(error.message);
        console.log(error.message);
      }
    } catch (err) {
      console.log(err);
      setError("Unknown error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
      <main className="m-0">
        <section className="min-h-screen border border-transparent">
          {/** Banner */}
          <div className="bg-top relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-cover min-h-[50vh] rounded-xl bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg')]">
            <span className="absolute top-0 left-0 h-full w-full bg-center bg-cover bg-gradient-to-tl from-zinc-900 to-zinc-800 opacity-60"></span>
            <div className="container mx-auto z-20">
              <div className="flex flex-col w-full mx-auto md:w-8/12 lg:w-4/12 px-6 items-center text-center gap-y-4">
                <h4 className="font-bold text-5xl  text-white">Welcome!</h4>
                <p className="text-white">
                  Use these awesome forms to login or create new account in your
                  project for free.
                </p>
              </div>
            </div>
          </div>
          {/** Signup Form */}
          <SignupForm
            loading={loading}
            error={error || undefined}
            onSignup={handleSignup}
            onOAuthSignin={handleOAuthSignin}
          />
        </section>
      </main>
    </div>
  );
};

export default SignupPage;
