import Backdrop from "views/components/backdrop";
import { Button } from "views/components/button";
import InputBlock from "views/components/input/inputBlock";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: () => void;
}

const ChangePasswordModal = ({
  isOpen,
  onClose
}: ChangePasswordModalProps): JSX.Element | null => {
  return isOpen ? (
    <>
      <Backdrop onConfirm={onClose} />
      <div className="bg-white text-black p-4 rounded-lg z-[70000_!important]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h5 className="text-main-primary-400 text-xl py-2 text-center">
          Change Password
        </h5>
        <div className="py-3">
          <InputBlock
            placeholder="Enter old password"
            w="30rem"
            type="password"
          />
        </div>
        <div className="py-3">
          <InputBlock
            placeholder="Enter new password"
            w="30rem"
            type="password"
          />
        </div>
        <Button type="submit" className="py-3 my-3 w-full">
          Change Password
        </Button>
      </div>
    </>
  ) : null;
};

export default ChangePasswordModal;
