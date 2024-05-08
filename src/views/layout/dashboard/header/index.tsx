import { useLayoutEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { toggleSideBar } from "data/store";
import Drawer from "views/components/drawer";
import { useAppDispatch } from "app/hooks";
import InputBlock from "views/components/input/inputBlock";
import { Button } from "views/components/button";
import { FaPlusCircle } from "react-icons/fa";
import { Link as HomeLink, useLocation } from "react-router-dom";

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isMobileOpen, setMobileState] = useState<boolean>(false);

  const toggleMobileNav = (): void => {
    setMobileState((prevState) => !prevState);
  };

  useLayoutEffect(() => {
    const closeMobileNavOnResize = () => {
      if (window.innerWidth < 768) {
        setMobileState(false);
      }
    };
    window.addEventListener("resize", closeMobileNavOnResize);

    return () => {
      window.removeEventListener("resize", closeMobileNavOnResize);
    };
  }, []);

  return (
    <>
      <header className="mobile md:hidden p-4 shadow-md sticky top-0 left-0 z-50 bg-white">
        <div className="flex justify-between items-center z-50">
          <HomeLink to="/">
            <img
              src="https://res.cloudinary.com/afara-partners-limited/image/upload/v1654090257/collectam/logosmall_xocgbr.svg"
              alt="collectam logo"
              className="w-6"
            />
          </HomeLink>
          <IoMenuOutline size={27} onClick={toggleMobileNav} />
        </div>
        <Drawer
          isOpen={isMobileOpen}
          placement="right"
          onClose={() => setMobileState(false)}
        />
      </header>
      <header className="desktop hidden md:flex justify-between py-4 px-8 shadow-md sticky top-0 left-0 z-50 bg-white">
        <IoMenuOutline
          size={35}
          onClick={() => dispatch(toggleSideBar())}
          className="cursor-pointer"
        />
        <div className="flex items-center gap-4">
          <InputBlock type="search" bg placeholder="Search" />
          {location.pathname === "/dashboard" ? (
            <Button type="submit" className="h-full px-3">
              <FaPlusCircle size={20} />
            </Button>
          ) : null}
        </div>
      </header>
    </>
  );
};

export default Header;
