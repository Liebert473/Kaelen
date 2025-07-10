/** Elements Imports */
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { supabase } from "./lib/supabaseClient";

/** Pages Imports */
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LoadingPage from "./pages/LoadingPage";
import DashboardPage from "./pages/DashboardPages";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);
  return (
    <Router>
      <Routes>
        {/** Blank Route */}
        <Route
          path="/"
          element={
            loading ? (
              <LoadingPage />
            ) : session ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        {/** Sigup Route */}
        <Route
          path="/signup"
          element={
            loading ? (
              <LoadingPage />
            ) : session ? (
              <Navigate to="/dashboard" />
            ) : (
              <SignupPage />
            )
          }
        ></Route>
        {/** Login Route */}
        <Route
          path="/login"
          element={
            loading ? (
              <LoadingPage />
            ) : session ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage />
            )
          }
        ></Route>
        {/** Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            loading ? (
              <LoadingPage />
            ) : session ? (
              <DashboardPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        {/** Profile Route */}
        <Route
          path="/profile"
          element={
            loading ? (
              <LoadingPage />
            ) : session ? (
              <ProfilePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
