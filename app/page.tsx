import Carousel from "@/components/Carousel";
import { Trending } from "@/section/Trending";
import Info from "@/section/Info";
import Genres from "@/section/Genres";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Footer from "@/section/Footer";
export default function Home() {

  return (
    <div className="bg-[#171717]">
    <TracingBeam>
      <Carousel />
      <Info />
      <Trending />
      <Genres />
      <Footer />
    </TracingBeam>
    </div>
  );
}
