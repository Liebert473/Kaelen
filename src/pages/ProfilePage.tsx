import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import Footer from "@/components/common/Footer";
import UserProfileHeader from "@/components/profile/UserProfileHeader";
import EditProfileForm from "@/components/profile/EditProfileForm";

const ProfilePage: React.FC = () => {
  const location = useLocation();
  interface ProfileData {
    name: string;
    avatar_url: string;
  }

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Loading ...",
    avatar_url: "/src",
  });

  const fetchProfileData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.warn("No user logged in to fetch profile.");
        return;
      }

      const {
        data,
        error: ProfileError,
        status,
      } = await supabase
        .from("profiles")
        .select(`avatar_url, name`)
        .eq("id", user.id)
        .single();

      if (ProfileError && status != 406) {
        throw ProfileError;
      }

      setProfileData((prev) => ({ ...prev, avatar_url: data?.avatar_url }));
      setProfileData((prev) => ({ ...prev, name: data?.name }));
    } catch (err) {
      console.log("Error fetching Profile: ", err);
    }
  };

  const onUpdateProfileData = async () => {
    fetchProfileData();
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <div className="m-0 font-sans text-base antialiased font-normal leading-6 bg-gray-50 text-slate-500 border-0 border-transparent">
      <div className="flex bg-center bg-cover absolute w-full h-[40vh] bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg')]">
        <div className="w-full h-full bg-blue-500 opacity-60"></div>
      </div>
      {/** Main Content */}
      <main className="w-auto border-transparent border transition-all duration-200 ease z-50 relative min-h-screen">
        {/** Row-1 */}
        <div className="flex px-4 mb-6 mt-48">
          <UserProfileHeader
            avatarSrc={profileData.avatar_url}
            name={`${profileData.name}`}
            title="Public Relations"
          />
        </div>
        {/** Row-2 */}
        <div className="flex px-4 mb-6 gap-6">
          <EditProfileForm onUpdateProfile={onUpdateProfileData} />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default ProfilePage;
