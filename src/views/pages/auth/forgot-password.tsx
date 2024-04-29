import { Button } from "views/components/button";
import Helmet from "views/components/helmet";
import InputAuth from "views/components/input/InputAuth";
import Link from "views/components/link";
import { Link as HomeLink } from "react-router-dom";

const ForgotPassword = (): JSX.Element => {
  return (
    <>
      <Helmet pageTitle="ForgotPassword - Collectam" />
      <div className="h-screen flex justify-center">
        <div
          className="hidden md:flex flex-col justify-between basis-1/2 h-full w-full p-8"
          style={{
            background:
              "linear-gradient(160.03deg, rgba(27, 33, 36, 0.3) 19.78%, rgba(249, 180, 16, 0.3) 84.76%), url(https://res.cloudinary.com/afara-partners-limited/image/upload/v1653657895/collectam/Artboard_3_1_ryouyw.png)",
            backgroundPosition: "center"
          }}
        >
          <HomeLink to="/">
            <img
              src="https://res.cloudinary.com/afara-partners-limited/image/upload/v1653472305/collectam/logo-single_qye6oz.png"
              alt="hero"
              className="w-10"
            />
          </HomeLink>
          <h6>&copy;Copyright 2022. Made by CollectAm</h6>
        </div>
        <div className="p-4 h-full basis-1/2 md:p-8">
          <div className="text-right">
            New User? <Link to="/register">Create Account</Link>
          </div>
          <div className="h-full flex flex-col items-center justify-center gap-2">
            <HomeLink to="/">
              <img
                src="https://res.cloudinary.com/afara-partners-limited/image/upload/v1653471777/collectam/logo_rjbsn9.svg"
                alt="collectam logo"
                className="w-52"
              />
            </HomeLink>
            <h5 className="text-2xl md:text-5xl text-center">
              Forgot Password
            </h5>
            <h6 className="pb-2 md:px-8 lg:px-16 xl:px-32 text-center">
              Enter the email address you used when you joined and we'll send
              you instructions to reset your password.
            </h6>
            <div>
              <label className="font-semibold text-sm pl-2" htmlFor="email">
                Email
              </label>
              <InputAuth type="email" id="email" />
            </div>
            <div className="w-[17.5rem] mt-4">
              <Button
                className="w-full shadow-xl shadow-gray-300"
                variant="secondary"
              >
                Submit
              </Button>
            </div>
            <Link to="/login" className="self-start">
              {"< Back to Login"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
