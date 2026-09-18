
import Hero from "./component/Hero";
import Section1 from "./component/Section1";
import Section2 from "./component/Section2";
import Footer from "./component/Footer";
import { useAuth } from "./context/authContext";
import SideMenu from "./component/SideMenu";

export default function Home() {

  return (
    <main className="relative bg-white min-h-screen pt-3 px-15 w-full flex flex-col items-center gap-35">
      <Hero />
      <Section1 />
      <Section2 />
      <Footer />


      <SideMenu />
    </main>
  );
}




