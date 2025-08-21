import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Otp() {
  const [generatedOtp, setGeneratedOtp] = useState(""); // OTP from server
  const [userOtp, setUserOtp] = useState(""); // OTP entered by user
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30); // Reset countdown to 30
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const location = useLocation();

  const { username, email, password, firstOtp, service } = location.state || {};

  // Request OTP function
  const requestOTP = async () => {
    try {
      let response;
      if (service === "register") {
        response = await axios.post("http://127.0.0.1:8000/auth/otp", { // Changed endpoint to /auth/otp
          username,
          email,
          password,
        });
        const newOtp = response.data;
        console.log("Generated OTP (Resend) extracted (register):", newOtp);
        setGeneratedOtp(newOtp);
        console.log("Generated OTP (Resend) set (register):", newOtp);
        setError(null);
        alert("✅ OTP Sent Successfully!");
      } else {
        response = await axios.post("http://127.0.0.1:8000/auth/login-otp", { // Changed endpoint to /auth/login-otp
          username,
          email,
          password,
        });
        const newOtp = response.data;
        console.log("Generated OTP (Resend) extracted (login):", newOtp);
        setGeneratedOtp(newOtp);
        console.log("Generated OTP (Resend) set (login):", newOtp);
        setError(null);
        alert("✅ OTP Sent Successfully!");
      }
    } catch (error) {
      console.error("Error (Resend):", error.response?.data?.detail || error.message);
      setError(error.response?.data?.detail || "❌ Failed to send OTP.");
    }
  };

  useEffect(() => {
    if (firstOtp) {
      console.log("Initial OTP from Register:", firstOtp);
      setGeneratedOtp(firstOtp);
    }
  }, [firstOtp]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [countdown]);

  const handleResend = () => {
    console.log("Resend OTP");
    setCountdown(30);
    setIsResendEnabled(false);
    requestOTP();
  };

  const handleChange = (e) => setUserOtp(e.target.value);

  const handleSubmit = async () => {
    console.log("Pressed");
    console.log("User OTP:", userOtp);
    console.log("Generated OTP:", generatedOtp);

    if (userOtp.length !== 6) {
      setError("Invalid OTP. Please enter a 6-digit code.");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/verify-otp", { // New endpoint for OTP verification
        email,
        otp: userOtp,
      });
      console.log("OTP Verification Response:", response.data);
      alert(response.data.message); // Show OTP verification success message

      if (response.status === 200) {
        if (service === "register") {
          try {
            const registerResponse = await axios.post("http://127.0.0.1:8000/register", {
              username,
              email,
              password,
            });
            console.log("Registration Success:", registerResponse.data);
            localStorage.setItem("authToken", registerResponse.data.access_token); // Store JWT
            alert("✅ Registration successful!");
            setTimeout(() => navigate("/landing"), 1000);
          } catch (error) {
            console.error("Registration Error:", error.response?.data?.detail || error);
            setError(error.response?.data?.detail || "❌ Registration failed!");
          }
        } else if (service === "login") {
          try {
            const loginResponse = await axios.post("http://127.0.0.1:8000/check_user", {
              username: email, // Use email as username for login with OAuth2PasswordRequestForm
              password,
            });
            console.log("Login Success:", loginResponse.data);
            localStorage.setItem("authToken", loginResponse.data.access_token); // Store JWT
            alert("✅ Login successful!");
            setTimeout(() => navigate("/landing"), 1000);
          } catch (error) {
            console.error("Login Error:", error.response?.data?.detail || error);
            setError(error.response?.data?.detail || "❌ Login failed!");
          }
        }
      } else {
        setError("❌ OTP Verification Failed!");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error.response?.data?.detail || error);
      setError(error.response?.data?.detail || "❌ OTP Verification Failed!");
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-['Inter']">
      <Navbar />
      <div className="flex justify-center w-full h-full mx-auto rounded-lg bg-white/10 backdrop-blur-lg mt-15">
        <div className="relative w-1/2 h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-[#000428] via-[#004e92] to-[#4E54C8]">
          <div className="absolute z-10 w-96 p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-white">
            <h2 className="text-4xl font-bold text-center mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">OTP Verification</h2>
            {error && <motion.div className="w-full p-3 mb-3 text-center text-white bg-red-600 rounded-md shadow-md">{error}</motion.div>}
            <div className="flex flex-col space-y-4">
              <input type="text" name="otp" placeholder="Enter OTP" value={userOtp} onChange={handleChange} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white text-lg placeholder-white/70" />
              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={handleSubmit} className="w-full py-3 bg-gradient-to-r from-[#004e92] via-[#4E54C8] to-[#6A82FB] rounded-lg text-white font-bold text-lg shadow-lg">Verify OTP</motion.button>
            </div>
            <div className="text-center mt-4 text-white/80">
              <p className="text-sm">Didn't receive an OTP? {isResendEnabled ? <span onClick={handleResend} className="text-blue-300 cursor-pointer hover:underline">Resend OTP</span> : <span className="text-gray-400">Resend in {countdown}s</span>}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2"><img src="/images/img-3.png" alt="Floating Image" className="w-full h-full object-cover" /></div>
      </div>
    </div>
  );
}