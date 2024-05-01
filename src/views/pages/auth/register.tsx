import { Button } from "views/components/button";
import Helmet from "views/components/helmet";
import InputAuth from "views/components/input/InputAuth";
import Link from "views/components/link";
import { Link as HomeLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import authService from "data/services/auth.service";
import { RegisterBody } from "app/store/models/auth";
import { emailValidation, passwordValidation } from "app/utils";
import Loading from "views/components/loading";

const Register = (): JSX.Element => {
  const navigate = useNavigate();

  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState<RegisterBody>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validatePassword = () => {
    if (document.activeElement !== passwordRef.current) return;
    return !passwordValidation(state.password);
  };

  const validateConfirmPassword = () => {
    if (document.activeElement !== confirmPasswordRef.current) return;
    return confirmPassword !== state.password;
  };

  const validateEmail = () => {
    if (document.activeElement !== emailRef.current) return;
    return !emailValidation(state.email);
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.firstName) {
      firstnameRef.current?.focus();
      if (firstnameRef.current) {
        firstnameRef.current.style.border = "2px solid red";
      }
      return;
    } else if (!state.lastName) {
      lastnameRef.current?.focus();
      if (lastnameRef.current) {
        lastnameRef.current.style.border = "2px solid red";
      }
      return;
    } else if (!state.email || !emailValidation(state.email)) {
      emailRef.current?.focus();
      if (emailRef.current) {
        emailRef.current.style.border = "2px solid red";
      }
      return;
    } else if (!state.phone) {
      phoneRef.current?.focus();
      if (phoneRef.current) {
        phoneRef.current.style.border = "2px solid red";
      }
      return;
    } else if (!state.password || !passwordValidation(state.password)) {
      passwordRef.current?.focus();
      if (passwordRef.current) {
        passwordRef.current.style.border = "2px solid red";
      }
      return;
    } else if (!confirmPassword || confirmPassword !== state.password) {
      confirmPasswordRef.current?.focus();
      if (confirmPasswordRef.current) {
        confirmPasswordRef.current.style.border = "2px solid red";
      }
      return;
    }

    setLoading(true);

    try {
      const res = await authService.register(state);
      setLoading(false);
      toast.success(res.data.message, {
        position: "top-right",
        duration: 500000
      });
      navigate("/login");
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          error.response.data.error.map((err: { message: string }) =>
            toast.error(err.message, {
              duration: 5000
            })
          );
        } else {
          toast.error("Error");
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <Helmet pageTitle="Registration - Collectam" />
      <div className="h-screen flex justify-center items-center">
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
          <form
            className="md:h-full flex flex-col items-center justify-center gap-2"
            onSubmit={register}
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
            <h6 className="pb-2">Create Your Account</h6>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-col gap-y-5">
                <div>
                  <label
                    className="font-semibold text-sm pl-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <InputAuth
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={handleForm}
                    value={state.firstName}
                    ref={firstnameRef}
                  />
                </div>
                <div>
                  <label
                    className="font-semibold text-sm pl-2"
                    htmlFor="lastnanme"
                  >
                    Last Name
                  </label>
                  <InputAuth
                    type="lastName"
                    id="lastName"
                    name="lastName"
                    onChange={handleForm}
                    value={state.lastName}
                    ref={lastnameRef}
                  />
                </div>
                <div className="relative">
                  <label className="font-semibold text-sm pl-2" htmlFor="email">
                    Email
                  </label>
                  <InputAuth
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleForm}
                    value={state.email}
                    ref={emailRef}
                    validationError={validateEmail()}
                  />
                  {validateEmail() ? (
                    <div className="absolute top-[calc(100%+4px)] left-2 text-[10px] leading-[12px] text-red-500 w-[110%]">
                      Email not valid!
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <div>
                  <label className="font-semibold text-sm pl-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <InputAuth
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="080* *** ****"
                    onChange={handleForm}
                    value={state.phone}
                    ref={phoneRef}
                  />
                </div>
                <div className="relative">
                  <label
                    className="font-semibold text-sm pl-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <InputAuth
                    type="password"
                    id="password"
                    name="password"
                    passwordVisibilityIcons
                    onChange={handleForm}
                    value={state.password}
                    validationError={validatePassword()}
                    ref={passwordRef}
                  />
                  {validatePassword() ? (
                    <div className="absolute top-[calc(100%+2px)] left-0 text-[10px] leading-[12px] text-red-500 w-[110%]">
                      Password must contain at least 1 number, 1 uppercase
                      letter, 1 lowercase letter, 1 special character and at
                      least 8.
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    className="font-semibold text-sm pl-2"
                    htmlFor="confirmPassword"
                  >
                    ConfirmPassword
                  </label>
                  <InputAuth
                    type="confirmPassword"
                    id="confirmPassword"
                    passwordVisibilityIcons
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    validationError={validateConfirmPassword()}
                    ref={confirmPasswordRef}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 w-[17.5rem]">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div className="w-[17.5rem]">
              <Button
                className="w-full shadow-xl shadow-gray-300 rounded-[14px_!important]"
                variant="secondary"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
            <p>
              Have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
