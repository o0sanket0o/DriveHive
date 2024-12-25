import React, { useEffect } from "react";
import { useState } from "react";
import companyLogo from "../../Images/VistaLogos/logo-png.png";
import companySvg from "../../Images/VistaLogos/logo-svg.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { USER_LOGOUT_API } from "../../utils/constants";
import toast from "react-hot-toast";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const strUser = localStorage.getItem("user");
    const userObj = JSON.parse(strUser);
    dispatch(setUser(userObj));
  }, [])
  const logout = async () => {
    try {
      localStorage.removeItem("user");
      dispatch(setUser(null));
      navigate("/loginUser");
      let token = localStorage.getItem("token");
      // console.log("Token is", token);
      localStorage.removeItem("token");
      const res = axios.get(USER_LOGOUT_API, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      toast.success("Logged out successfully");
    } catch (err) {
      console.log("Error", err);
      toast.error("Internal Server Error occured.");
    }
  };
  return (
    <div className="bg-[rgb(64,64,64)] w-[100vw]">
      <div className="max-w-full flex justify-between">
        <div className="w-[50%]">
          <img src={companyLogo} alt="" width={"320px"} />
        </div>
        {user ? (
          <div className="flex w-full justify-end pr-10 items-center">
            <ul className="flex gap-4 text-white">
              <li className="hover:opacity-60 cursor-pointer hover:duration-500">
                <button onClick={() => navigate("/")}>Home</button>
              </li>
              <li className="hover:opacity-60 cursor-pointer hover:duration-500">
                <button onClick={() => navigate('/about')}>About</button>
              </li>
              <li className="hover:opacity-60 cursor-pointer hover:duration-500">
                <button onClick={() => navigate('/contact')}>Contact</button>
              </li>
              <li className="flex items-center flex-col text-[25px]">
                <button onClick={() => setDropdownOpen(!isDropdownOpen)}>
                  <FaUser />
                </button>
                {isDropdownOpen && (
                  <div className="">
                    <ul className="absolute text-lg min-w-12 rounded right-4 w-auto bg-[#5a5a5a]">
                      <li className="py-1 px-4 hover:opacity-60 hover:duration-500">
                        <button
                          onClick={() => {
                            navigate("/profile");
                          }}
                        >
                          Profile
                        </button>
                      </li>
                      <li className="py-1 px-4 hover:opacity-60 hover:duration-500">
                        <button onClick={logout}>Log Out</button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex justify-center gap-4 items-center text-white mr-4">
            <button
              className=" bg-white py-2 px-4 text-black rounded"
              onClick={() => {
                navigate("/loginUser");
              }}
            >
              LogIn
            </button>
            <button
              className="bg-white py-2 px-4 w-full text-black rounded"
              onClick={() => {
                navigate("/signUser");
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
