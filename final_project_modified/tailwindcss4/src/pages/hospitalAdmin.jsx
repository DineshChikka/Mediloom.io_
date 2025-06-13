import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GSAPcomponent from "../components/GSAPcomponent";
import Header from "../components/Header";
import Fotter from "../components/Fotter";
import axios from "axios";
import config from "../urlConfig.js";
import Details from "../components/Details.jsx";

export default function HospitalAdminPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = Details();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${config.backendUrl}/api/status`, { withCredentials: true })
      .then(response => {
        console.log("User is authenticated:", response.data.message);
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert("Session expired. Please login again.");
          window.location.href = '/login';
        } else {
          console.error("Unexpected error:", error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
            </div>
    );
  }

  return (
    <>
      <GSAPcomponent />
      <Header />
      <section className="hero-section relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-md:mt-[50px] mt-[80px]">
        <div className="flex flex-col place-content-center items-center mb-12">
          <div className="reveal-up gradient-text text-center text-6xl font-semibold uppercase leading-[80px] max-lg:text-4xl max-md:leading-snug">
            <span>Welcome to Mediloom.io</span>
            <br />
            {user ? (
                        <span className="reveal-up bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">{user.first_name}</span>
                        ) : ( <span>Patient</span>)}
          </div>
          <div className="reveal-up mt-10 max-w-[750px] p-2 text-center text-gray-300 max-lg:max-w-full text-3xl">
           You can access and update hospital resources and staff here.
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={() => navigate("/resources")}
              className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03]"
            >
              Resources
            </button>
            <button
              onClick={() => navigate("/staff")}
              className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03]"
            >
              Staff
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-white py-3 px-8 rounded-xl bg-primary hover:bg-primary/80 text-lg font-semibold transition duration-200 shadow-lg hover:scale-[1.03]"
            >
              Dashboard
            </button>
          </div>
        </div>
      </section>
      <Fotter />
    </>
  );
}
