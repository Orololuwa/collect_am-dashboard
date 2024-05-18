import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./useReduxState";
import toast from "react-hot-toast";
import { DEFAULT_ERROR_MESSAGE } from "data/config";
import { logOut } from "data/store";

/**
 * Custom hook to handler logging a user out
 * @returns function `logoutHandler`
 */
export const useLogoutFunction = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      dispatch(logOut(navigate));
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const msg = error.response?.data?.message || DEFAULT_ERROR_MESSAGE;
      if (!msg) return;
      toast.error(msg);
    }
  };

  return { logoutHandler };
};
