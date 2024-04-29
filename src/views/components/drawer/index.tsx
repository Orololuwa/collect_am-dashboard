import Backdrop from "views/components/backdrop";
import DrawerCtx from "./styled";
import { Transition, TransitionStatus } from "react-transition-group";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement: "up" | "down" | "left" | "right";
  className?: string;
  children?: React.ReactChildren | React.ReactChild;
}

const Drawer = ({ isOpen, onClose, children, placement }: DrawerProps) => {
  return (
    <>
      <Transition
        in={isOpen}
        timeout={{ appear: 300, enter: 300, exit: 300 }}
        mountOnEnter
        unmountOnExit
      >
        {(state: TransitionStatus) => (
          <>
            <Backdrop onConfirm={onClose} />
            <DrawerCtx placement={placement} state={state}>
              {children}
            </DrawerCtx>
          </>
        )}
      </Transition>
    </>
  );
};

export default Drawer;
