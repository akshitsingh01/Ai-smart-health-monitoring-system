import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Otp from "./pages/Otp"
import Landing from "./pages/Landing";

function App(){
return(
  
  <Router>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/otp" element={<Otp />}/>
    <Route path="/landing" element={<Landing/>}/> 
  </Routes>
</Router>
  
);

}

export default App