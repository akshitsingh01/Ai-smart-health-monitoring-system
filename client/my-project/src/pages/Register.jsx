// Register.jsx
import Navbar from "@/components/Navbar";
import { frameData, motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let OTP = ""
  const [error, setError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "confirmPassword") {
      setPasswordMatch(formData.password === value);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const requestOTP = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/otp", // ✅ Correct Endpoint
        {
          username: formData.username, // ✅ Use the variables from formData
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" }, // ✅ Ensures JSON format
        }
      );

      // ✅ Save OTP from server
      setGeneratedOtp(response.data); // Access the OTP from response data correctly

      console.log("register : Generated OTP:", response.data);
      OTP = response.data;
      console.log("OTP",OTP)
      setError(null);
      alert("✅ OTP Sent Successfully!");
      // console.log("Received Data:", username, email, password, confirmPassword);

    } catch (error) {
      console.error("Error:", error.response?.data?.detail || error.message);
      setError(error.response?.data?.detail || "❌ Failed to send OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    // First request the OTP
    await requestOTP();

    // Then navigate to the OTP page with the form data and generated OTP
    navigate("/otp", { state: { ...formData, firstOtp: OTP, service: "register" } });
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-['Inter']">
      <Navbar />

      <div className="flex justify-center w-full h-full mx-auto rounded-lg bg-white/10 backdrop-blur-lg mt-15">

        {/* Left Section with Neon Background */}
        <div className="relative w-1/2 h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-[#000428] via-[#004e92] to-[#4E54C8]">

          {/* Floating Bubble Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute bottom-0 bg-white bg-opacity-20 w-4 h-4 rounded-full shadow-[0_0_10px_#93c5fd]"
                style={{
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                }}
                animate={{
                  y: [0, -800],
                  scale: [1, 1.6],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: Math.random() * 6 + 5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          {/* Sign Up Form */}
          <div className="absolute z-10 w-96 p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-white">
            <h2 className="text-4xl font-bold text-center mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Sign Up
            </h2>

            {/* Error Message Box */}
            {error && (
              <motion.div
                className="w-full p-3 mb-3 text-center text-white bg-red-600 rounded-md shadow-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white text-lg placeholder-white/70 focus:ring-2 focus:ring-blue-400 shadow-inner transition-all duration-200"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white text-lg placeholder-white/70 focus:ring-2 focus:ring-blue-400 shadow-inner transition-all duration-200"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white text-lg placeholder-white/70 focus:ring-2 focus:ring-blue-400 shadow-inner transition-all duration-200"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg text-white text-lg placeholder-white/70 focus:ring-2 ${
                  passwordMatch === null
                    ? "border-white/30 bg-white/20"
                    : passwordMatch
                    ? "border-green-500 bg-green-900/20 focus:ring-green-400"
                    : "border-red-500 bg-red-900/20 focus:ring-red-400"
                } shadow-inner transition-all duration-200`}
              />

              {/* Sign Up Button (Now triggers OTP request and navigation) */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-[#004e92] via-[#4E54C8] to-[#6A82FB] rounded-lg text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:from-[#4E54C8] hover:to-[#000428] border border-white/20"
              >
                Sign Up
              </motion.button>
            </div>

            {/* Links */}
            <div className="text-center mt-4 text-white/80">
              <p className="text-sm">
                Already have an account? <Link to={"/login"} className="text-blue-300 hover:underline hover:text-blue-500 transition-all duration-200">Log In</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-1/2">
          <img src="/images/img-3.png" alt="Floating Image" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}