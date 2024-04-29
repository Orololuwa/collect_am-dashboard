import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import { Outlet } from "react-router";

const LandingPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </>
  );
};

export default LandingPage;
