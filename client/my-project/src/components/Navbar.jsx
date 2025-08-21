import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full fixed top-0 left-0 bg-white shadow-lg px-8 py-4 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-wide font-[Poppins] drop-shadow-lg"
        >
          Calmerry
        </Link>

        {/* NAVIGATION MENU */}
        <ul className="flex space-x-6">
          {["Home", "About", "Services", "Login"].map((item, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                asChild
                className="bg-transparent text-gray-800 text-lg font-medium font-[Poppins] hover:scale-110 transition-transform duration-300 hover:text-blue-600"
              >
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
