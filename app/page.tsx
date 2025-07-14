'use client'
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Section } from "@/components/home/Section";
import { Navbar } from "@/components/NavBar";
import Product from "@/components/Product";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const {user} = useAuth()
  return (
    <>
  {/* {user !== null ? "" :<Navbar />}    */}
  
    <main>
      <Hero />

      <Features />

      <Section id="how-it-works" title="Nasıl Çalışır?" children={<HowItWorks />} />


      {/* <Section id="about" title="Hakkımızda" children={} /> */}
<About />
      <Section id="contact" title="İletişim" children={<Contact />} />

    </main>
      <Footer />
      {/* <Product/> */}
    </>
  );
}
