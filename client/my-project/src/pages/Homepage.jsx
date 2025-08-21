
import Navbar from "@/components/Navbar";
import GetstartedCard from "@/components/GetstartedCard"




export default function Homepage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#000428] via-[#004e92] to-[#4E54C8] rounded-b-lg ">
        <Navbar/>
        <GetstartedCard/>
    </div>
  );
}
