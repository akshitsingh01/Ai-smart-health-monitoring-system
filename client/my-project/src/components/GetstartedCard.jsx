
import { Button } from "@/components/ui/button";

export default function GetstartedCard() {
    return (
        <div class="flex justify-center border-2 border-black p-4 mt-20 h-150">
            {/* <div class="border-2 border-black p-4 w-100 m-2 justify-center">

                <div class="text-3xl font-bold font-serif">Improve your mental well-being with Calmerry</div>
                <div class="tect-m mt-3">Take a step to feeling better with the help of a licensed mental health professional. Benefit from online therapy sessions and self-therapy tools.</div>
                <div class="self-end mt-5">
                    <Button
                        variant="secondary"
                        className="px-8 py-4 bg-gradient-to-r from-[#D946EF] to-[#6B21A8] text-white rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300 mt-5"
                    >
                        Get Started
                    </Button>
                </div>

            </div> */}

            <div class="border-2 border-black p-4 w-100 m-2 flex flex-col">
                <div class="text-3xl font-bold font-serif">
                    Improve your mental well-being with Calmerry
                </div>
                <div class="mt-2">
                    Take a step to feeling better with the help of a licensed mental health professional. Benefit from online therapy sessions and self-therapy tools.
                </div>
                <div class="mt-3">
                    <Button
                        variant="secondary"
                        className="mt-5 w-90 h-11 px-8 py-4 bg-gradient-to-r from-[#D946EF] to-[#6B21A8] text-white rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        Get Started
                    </Button>
                </div>
            </div>


            <div className="border-4 border-purple-600 w-1/2 m-2 h-[400px] relative overflow-hidden rounded-lg">
  {/* Main Image */}
  <img
    src="/images/img-1.png"
    alt="Main Image"
    className="w-full h-full object-cover rounded-lg"
  />

  {/* Floating Image (Slightly Outside the Main Image) */}
  <div className="absolute bottom-[-10px] right-[-10px] w-1/3 border-4 border-white rounded-lg shadow-xl">
    <img
      src="/images/img-2.png"
      alt="Floating Image"
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
</div>




        </div>
    );
}