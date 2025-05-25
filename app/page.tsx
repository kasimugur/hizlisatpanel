import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <>
    <div className=" w-screen">
  <TopBar /> 
  
    <Dashboard />
  </div>
  
    </>
  );
}
