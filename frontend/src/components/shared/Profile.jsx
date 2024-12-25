import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Fetching user from global state
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/loginUser"); // Redirect to login if no user is logged in
    } else {
      // Simulating API call to fetch user-specific data
      if (user.role === "captain") {
        setProfileData({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: "Captain",
          experience: "5 years",
          missionsCompleted: 50,
          teamName: "Team Alpha",
          avatar: "https://via.placeholder.com/150", // Replace with actual avatar URL
        });
      } else {
        setProfileData({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: "User",
          subscription: "Premium",
          usage: "10 GB of 50 GB",
          avatar: "https://via.placeholder.com/150", // Replace with actual avatar URL
        });
      }
    }
  }, [user, navigate]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <div className="flex flex-col items-center">
          <img
            src={profileData.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full shadow-md"
          />
          <h2 className="text-2xl font-bold mt-4">{profileData.name}</h2>
          <p className="text-gray-600">{profileData.email}</p>
          <p className="text-sm text-gray-500 mt-2">{profileData.role}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Details</h3>
          <ul className="mt-3 text-gray-600 space-y-2">
            {user.role === "captain" ? (
              <>
                <li>
                  <span className="font-bold">Experience:</span>{" "}
                  {profileData.experience}
                </li>
                <li>
                  <span className="font-bold">Missions Completed:</span>{" "}
                  {profileData.missionsCompleted}
                </li>
                <li>
                  <span className="font-bold">Team Name:</span>{" "}
                  {profileData.teamName}
                </li>
              </>
            ) : (
              <>
                <li>
                  <span className="font-bold">Subscription:</span>{" "}
                  {profileData.subscription}
                </li>
                <li>
                  <span className="font-bold">Usage:</span> {profileData.usage}
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/edit-profile")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
