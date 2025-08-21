import Navbar from "@/components/Navbar";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("🔹 Attempting login:", formData.username);

      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        username: formData.username, // FastAPI's OAuth2PasswordRequestForm expects 'username' as email
        password: formData.password,
      });

      if (response.status === 200) {
        console.log("🟢 Login successful, JWT received:", response.data.access_token);
        localStorage.setItem("authToken", response.data.access_token);
        navigate("/landing");
      } else {
        setError(response.data?.detail || "❌ Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("❌ Error during login:", error);
      setError(error.response?.data?.detail || "An error occurred during login. Please try again.");
    }
  };

  const requestLoginOtp = async () => {
    try {
      console.log("🔹 Requesting login OTP for:", formData.username);

      const response = await axios.post("http://127.0.0.1:8000/auth/login-otp", {
        username: formData.username, // Include the username
        email: formData.username,   // Sending "Email or Username" as email for OTP
        password: formData.password,
      });

      if (response.status === 200) {
        console.log("🟢 Login OTP request successful:", response.data);
        navigate("/otp", { state: { email: formData.username, password: formData.password, firstOtp: response.data, service: "login" } });
      } else {
        setError(response.data?.detail || "❌ Failed to request login OTP.");
      }
    } catch (error) {
      console.error("❌ Error requesting login OTP:", error);
      setError(error.response?.data?.detail || "An error occurred while requesting login OTP.");
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-['Inter']">
      <Navbar />
      <div className="flex justify-center w-full h-full mx-auto rounded-lg bg-white/10 backdrop-blur-lg mt-15">
        <div className="relative w-1/2 h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-[#000428] via-[#004e92] to-[#4E54C8]">
          {error && (
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-3 rounded-lg shadow-lg flex items-center">
              <span>{typeof error === 'string' ? error : JSON.stringify(error)}</span>
              <button className="ml-3 text-white font-bold" onClick={() => setError(null)}>✖</button>
            </div>
          )}
          <div className="absolute z-10 w-96 p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-white">
            <h2 className="text-4xl font-bold text-center mb-6">Sign In</h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Email or Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white"
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={requestLoginOtp} // Changed to request OTP
                className="w-full py-3 bg-gradient-to-r from-[#004e92] via-[#4E54C8] to-[#6A82FB] rounded-lg text-white font-bold"
              >
                Sign In with OTP
              </motion.button>
              {/* You might want to add a direct login option (without OTP) later */}
              {/* <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleLogin}
                className="w-full py-3 bg-gray-600 rounded-lg text-white font-bold"
              >
                Sign In
              </motion.button> */}
            </div>
            <div className="text-center mt-4 text-white/80">
              <p className="text-sm">Don't have an account? <Link to="/register">Sign Up</Link></p>
              <p className="text-sm mt-2">
                <a href="#" className="text-blue-300 hover:underline">Forgot Password?</a>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img src="/images/img-3.png" alt="Floating Image" className="w-full h-full object-fit" />
        </div>
      </div>
    </div>
  );
}