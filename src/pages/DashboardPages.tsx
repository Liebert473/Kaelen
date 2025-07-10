import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Loader2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
    } else {
      navigate("/login");
    }
    setLoggingOut(false);
  };
  return (
    <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="flex flex-col gap-4">
          {" "}
          <Button
            className="cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            Profile Page
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="cursor-pointer"
                disabled={loggingOut ? true : false}
              >
                {loggingOut ? <Loader2Icon className="animate-spin" /> : null}
                {loggingOut ? "Logging out" : "Log out"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive hover:bg-destructive/90 cursor-pointer"
                  onClick={handleLogout}
                >
                  Log out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
