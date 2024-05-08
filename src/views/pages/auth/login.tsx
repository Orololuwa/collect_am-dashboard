import { Button } from "views/components/button";
import InputAuth from "views/components/input/InputAuth";
import Link from "views/components/link";
import { Link as HomeLink, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { login } from "data/store";
import Helmet from "views/components/helmet";
import { useRef, useState } from "react";
import { LoginRequestBody } from "data/store/models/auth";
import { emailValidation, passwordValidation } from "app/utils";

interface LocationState {
  from?: {
    pathname?: string;
  };
}

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { loading } = useAppSelector((state) => state.auth);

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [state, setState] = useState<LoginRequestBody>({
    email: "",
    password: ""
  });

  const from =
    (location.state as LocationState)?.from?.pathname || "/dashboard";

  const validatePassword = () => {
    if (document.activeElement !== passwordRef.current) return;
    return !passwordValidation(state.password);
  };

  const validateEmail = () => {
    if (document.activeElement !== emailRef.current) return;
    return !emailValidation(state.email);
  };

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.email || !emailValidation(state.email)) {
      emailRef.current?.focus();
      if (emailRef.current) {
        emailRef.current.style.border = "2px solid red";
      }
      return;
    } else if (!state.password || !passwordValidation(state.password)) {
      passwordRef.current?.focus();
      if (passwordRef.current) {
        passwordRef.current.style.border = "2px solid red";
      }
      return;
    }
    dispatch(login(navigate, from, state, rememberMe));
  };

  return (
    <>
      <Helmet pageTitle="Login to your Dashboard - Collectam" />
      <div className="h-screen flex justify-center">
        <div
          className="hidden md:flex flex-col justify-between basis-1/2 h-full w-full p-8"
          style={{
            background:
              "linear-gradient(160.03deg, rgba(27, 33, 36, 0.3) 19.78%, rgba(249, 180, 16, 0.3) 84.76%), url(https://res.cloudinary.com/afara-partners-limited/image/upload/v1653639653/collectam/Artboard_4_bzauko.png)",
            backgroundPosition: "center"
          }}
        >
          <HomeLink to="/">
            <img
              src="https://res.cloudinary.com/afara-partners-limited/image/upload/v1653472305/collectam/logo-single_qye6oz.png"
              alt="logo"
              className="w-10"
            />
          </HomeLink>
          <h6>&copy;Copyright 2022. Made by CollectAm</h6>
        </div>
        <div className="p-4 h-full basis-1/2 md:p-8">
          <div className="text-right">
            New User? <Link to="/register">Create Account</Link>
          </div>
          <form
            onSubmit={loginHandler}
            className="h-full flex flex-col items-center justify-center gap-2"
          >
            <HomeLink to="/">
              <img
                src="https://res.cloudinary.com/afara-partners-limited/image/upload/v1653471777/collectam/logo_rjbsn9.svg"
                alt="collectam logo"
                className="w-52"
              />
            </HomeLink>
            <h5 className="text-2xl md:text-5xl text-center">
              Welcome to CollectAm
            </h5>
            <h6 className="pb-2">Kindly fill in your Log in details</h6>
            <div>
              <label className="font-semibold text-sm pl-2" htmlFor="email">
                Email
              </label>
              <InputAuth
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleForm}
                value={state.email}
                ref={emailRef}
                validationError={validateEmail()}
              />
            </div>
            <div>
              <label className="font-semibold text-sm pl-2" htmlFor="password">
                Password
              </label>
              <InputAuth
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                passwordVisibilityIcons
                onChange={handleForm}
                value={state.password}
                validationError={validatePassword()}
                ref={passwordRef}
              />
            </div>
            <div className="flex items-center gap-4 w-[17.5rem] ">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                id="rememberMe"
              />
              <label htmlFor="rememberMe" className="cursor-pointer">
                Remember me
              </label>
            </div>
            <div className="w-[17.5rem]">
              <Button
                className="w-full shadow-xl shadow-gray-300 rounded-[14px_!important]"
                variant="secondary"
                type="submit"
                disabled={loading}
              >
                {loading ? "loading..." : "Sign In"}
              </Button>
            </div>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
