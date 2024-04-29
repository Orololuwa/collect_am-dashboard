import BackdropCtx from "./styled";
import { useEffect } from "react";

// const backdropRoot = document.getElementById("backdrop");

interface BackdropProps {
  children?: React.ReactChildren;
  onConfirm?: () => void;
}

const Backdrop = (props: BackdropProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  });

  return <BackdropCtx onClick={props.onConfirm}>{props.children}</BackdropCtx>;
};

export default Backdrop;
