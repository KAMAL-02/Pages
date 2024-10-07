import Carousel from "@/components/Carousel";
import { Trending } from "@/section/Trending";
import Info from "@/section/Info";
import Genres from "@/section/Genres";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Footer from "@/section/Footer";
import { div } from "framer-motion/client";
export default function Home() {

  return (
    <div className="bg-[#171717]">
    <TracingBeam>
      <Carousel />
      <Info />
      <h2 className="text-3xl font-bold text-white mb-3 ml-4">Trending</h2>
      <Trending />
      <Genres />
      <Footer />
    </TracingBeam>
    </div>
  );
}
