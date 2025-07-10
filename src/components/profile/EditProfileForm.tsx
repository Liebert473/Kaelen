import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
interface EditProfileFormProps {
  onUpdateProfile: () => Promise<void>;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  onUpdateProfile,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState(""); // Email usually comes from auth.user, not editable here
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  // State to store the original profile data for discard functionality
  const [originalProfile, setOriginalProfile] = useState<any | null>(null);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        console.warn("No user logged in to fetch profile.");
        return;
      }

      const {
        data,
        error: ProfileError,
        status,
      } = await supabase
        .from("profiles")
        .select(`name, username, email, about_me`)
        .eq("id", user.id)
        .single();

      if (ProfileError && status != 408) {
        throw ProfileError;
      }

      setAboutMe(data?.about_me);
      setEmail(data?.email);
      setFullName(data?.name);
      setUsername(data?.username);
      setOriginalProfile(data);
    } catch (err) {
      console.log("Error fetching profile:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while fetching profile.");
      }
    }
    setLoading(false);
  }

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        console.log("No user logged in.");
        return;
      }

      const updates = {
        id: user.id,
        email: email,
        username: username,
        about_me: aboutMe,
        name: fullName,
        updated_at: new Date().toISOString(),
      };

      const { error: UpdateError } = await supabase
        .from("profiles")
        .upsert(updates);

      if (UpdateError) {
        throw UpdateError;
      }

      setSuccessMessage("Profile updated successfully!");
      onUpdateProfile();
      setOriginalProfile(updates);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while saving profile changes.");
      }
      console.log("Error saving profile changes:", err);
    }
    setLoading(false);
  };

  const handleDiscard = () => {
    setError(null);
    setSuccessMessage(null);
    if (originalProfile) {
      setAboutMe(originalProfile.about_me || "");
      setEmail(originalProfile.email || "");
      setFullName(originalProfile.name || "");
      setUsername(originalProfile.username || "");
    } else {
      setAboutMe("");
      setEmail("");
      setFullName("");
      setUsername("");
    }
    console.log("Discarded changes.");
  };

  return (
    <div className="flex w-full">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <div className="flex space-x-3">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:shadow-sm hover:bg-gray-300 transition-all cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleDiscard}
              disabled={loading}
            >
              Discard
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-md hover:bg-indigo-700 transition-all cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}
        {successMessage && (
          <p className="text-sm text-green-600 text-center mb-4">
            {successMessage}
          </p>
        )}

        {loading && !originalProfile ? ( // Show initial loading spinner
          <p className="text-center text-gray-600 py-10">
            Loading profile data...
          </p>
        ) : (
          <>
            {/* User Information Section */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4">
                USER INFORMATION
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                    value={email} // Display email from state
                    disabled // Email is typically not editable here
                  />
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="text-gray-800 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="text-gray-800 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* About Me Section */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4">
                ABOUT ME
              </h3>
              <div>
                <label htmlFor="aboutMe" className="sr-only">
                  About me
                </label>
                <textarea
                  id="aboutMe"
                  rows={4}
                  className="text-gray-800 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  disabled={loading}
                ></textarea>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfileForm;
