import AsideWrapper from "./styled";
import Link from "views/components/link";
import { Link as HomeLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { FaFileInvoice, FaPowerOff } from "react-icons/fa";
import {
  IoBag,
  IoBook,
  IoPeopleCircle,
  IoReceipt,
  IoSettings,
  IoSpeedometer
} from "react-icons/io5";
import Tooltip from "views/components/tooltip";
import { logOut } from "data/store";
import { faker } from "@faker-js/faker";

const SideBar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isShow = useAppSelector((state) => state.UI.isDesktopOpen);

  const logoutHandler = () => {
    dispatch(logOut(navigate));
  };

  return (
    <AsideWrapper
      className="w-fit h-screen shrink-0 hidden md:block"
      isShow={isShow}
    >
      <div className="flex items-center top  py-4 px-10 ">
        <img
          src={faker.image.avatar()}
          alt="merchant"
          className="w-20 h-20 rounded-full avatar object-cover"
        />
        {isShow ? (
          <div className="flex flex-col px-4 items-center w-fit relative)">
            <HomeLink to="/">
              <img
                src="https://res.cloudinary.com/afara-partners-limited/image/upload/v1654090257/collectam/logosmall_xocgbr.svg"
                alt="collectam logo"
                className="w-8"
              />
            </HomeLink>
            <HomeLink to="/">
              <p className="text-2xl font-light tracking-wide">CollectAm</p>
            </HomeLink>
          </div>
        ) : null}
      </div>
      <div className="links py-10 px-10 flex flex-col gap-10">
        <Tooltip overlay="dashboard" colorMode="light" isActive={!isShow}>
          <Link to="/dashboard" navlink>
            <div className="flex items-center">
              <IoSpeedometer size={35} className="mx-4" />
              {isShow ? <h6 className="text-xl">Dashboard</h6> : null}
            </div>
          </Link>
        </Tooltip>
        <Tooltip overlay="products" colorMode="light" isActive={!isShow}>
          <Link to="/products" navlink>
            <div className="flex items-center">
              <IoBag size={35} className="mx-4" />
              {isShow ? <h6 className="text-xl">Products</h6> : null}
            </div>
          </Link>
        </Tooltip>
        <Tooltip overlay="invoice" colorMode="light" isActive={!isShow}>
          <Link to="/invoices" navlink>
            <div className="flex items-center">
              <FaFileInvoice size={35} className="mx-4" />
              {isShow ? <h6 className="text-xl">Invoice</h6> : null}
            </div>
          </Link>
        </Tooltip>
        <Tooltip overlay="receipts" colorMode="light" isActive={!isShow}>
          <Link to="/receipts" navlink>
            <div className="flex items-center">
              <IoReceipt size={35} className="mx-4" />
              {isShow ? <h6 className="text-xl">Receipt</h6> : null}
            </div>
          </Link>
        </Tooltip>
        <Tooltip overlay="customers" colorMode="light" isActive={!isShow}>
          <Link to="/customers" navlink>
            <div className="flex items-center">
              <IoPeopleCircle size={35} className="mx-4" />
              {isShow ? <h6 className="text-xl">Customers</h6> : null}
            </div>
          </Link>
        </Tooltip>
        <Tooltip overlay="reports" colorMode="light" isActive={!isShow}>
          <Link to="/reports" navlink>
            <div className="flex items-center">
              <IoBook size={35} className="mx-4" />
              {isShow ? <h6 className="text-xl">Report</h6> : null}
            </div>
          </Link>
        </Tooltip>
        <Tooltip overlay="settings" colorMode="light" isActive={!isShow}>
          <Link to="/settings" navlink>
            <div className="flex items-center">
              <IoSettings size={35} className="mx-4" />
              {isShow ? <h6 className="text-xl">Settings</h6> : null}
            </div>
          </Link>
        </Tooltip>
        <Tooltip overlay="logout" colorMode="light" isActive={!isShow}>
          <div className="text-red-500" onClick={logoutHandler}>
            <div className="flex items-center">
              <FaPowerOff size={35} className="mx-4" />
              {isShow ? <h6 className="text-xl">Logout</h6> : null}
            </div>
          </div>
        </Tooltip>
      </div>
    </AsideWrapper>
  );
};

export default SideBar;
