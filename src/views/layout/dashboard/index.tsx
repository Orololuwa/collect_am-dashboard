import Content from "./content";
import Footer from "./footer";
import Header from "./header";
import SideBar from "./sideBar";

const Dashboard = (): JSX.Element => {
  return (
    <div className="flex w-screen overflow-hidden">
      <SideBar />
      <div className="w-full grow max-h-screen overflow-x-hidden overflow-y-scroll">
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
