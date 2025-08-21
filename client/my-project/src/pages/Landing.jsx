import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

const Landing = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [promptText, setPromptText] = useState("");

  const handleFileChange = (event) => {
    console.log(event.target.files)
    setSelectedFile(event.target.files[0]);
  };

  const handlePromptChange = (event) => {
    setPromptText(event.target.value);
  };

//   const handleUploadSubmit = async () => {
//     if (!selectedFile) {
//       alert("Please select a file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert(`Upload successful: ${response.data.message}`);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Upload failed");
//     }
//   };


const handleUploadSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const endpoint = "http://127.0.0.1:8000/upload/"
      const response = await fetch(endpoint,{
        method: "POST",
        body: formData

      });

      if(response.ok){
        console.log("file uploaded sucesfully!")
      }else{
        console.error("Failed to upload file!")
      }

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  const handlePromptSubmit = async () => {
    if (!promptText.trim()) {
      alert("Please enter some text for the prompt.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/submit-text", { text: promptText });
      alert(`Prompt submitted: ${response.data.message}`);
    } catch (error) {
      console.error("Prompt submission failed:", error);
      alert("Prompt submission failed");
    }
  };

  // Motion Variants
  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8, delayChildren: 0.3, staggerChildren: 0.2 }
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#f0f4c3] via-[#c5e1a5] to-[#aed581] py-12 px-6 flex flex-col items-center justify-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <Navbar />
      <motion.p className="text-xl text-center text-gray-800 mb-8 max-w-2xl mt-5" variants={itemVariants}>
        Empowering you with actionable insights to take control of your health.
      </motion.p>

      <motion.div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-2xl flex flex-col space-y-8" variants={itemVariants}>
        {/* Upload Section */}
        <motion.div className="flex flex-col items-center border-2 rounded-xl border-dashed border-gray-300 p-8 hover:bg-gray-50 transition duration-300" variants={itemVariants}>
          <label htmlFor="file-upload" className="cursor-pointer text-xl text-gray-700">
            Upload Your Medical Report (PDF/Image)
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*, application/pdf"
          />
          {selectedFile && <motion.p className="mt-3 text-md text-gray-600 italic" variants={itemVariants}>Selected: {selectedFile.name}</motion.p>}
          <motion.button
            onClick={handleUploadSubmit}
            className="mt-5 bg-[#43a047] hover:bg-[#388e3c] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Analyze Report
          </motion.button>
        </motion.div>

        {/* Prompt Text Section */}
        <motion.div className="flex flex-col border rounded-xl border-gray-300 p-8 hover:shadow-xl transition duration-300" variants={itemVariants}>
          <label htmlFor="prompt-text" className="text-xl text-gray-700 mb-3">
            Or, Tell Us About Your Health Concern
          </label>
          <textarea
            id="prompt-text"
            className="border rounded-md p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#66bb6a] resize-none"
            rows="5"
            placeholder="Describe your health concern or ask a question..."
            value={promptText}
            onChange={handlePromptChange}
          />
          <motion.button
            onClick={handlePromptSubmit}
            className="mt-5 bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Your Query
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.p className="mt-10 text-center text-gray-700 text-lg" variants={itemVariants}>
        Experience personalized health insights powered by advanced AI.
      </motion.p>
    </motion.div>
  );
};

export default Landing;