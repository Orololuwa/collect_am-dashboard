import { useState } from "react";
import styled from "styled-components";
import { Button } from "views/components/button";
import ChangePasswordModal from "./change-password-modal";

const SecuritySetting = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Wrapper>
        <h5 className="mb-4">Verified Information</h5>
        <div className="flex flex-wrap gap-2 flex-col md:flex-row py-2">
          <div className="md:basis-2/5">
            <p className="text-main-primary-400 font-semibold">Email Address</p>
          </div>
          <div className="md:basis-2/5">
            <div>Johndoe@yahoo.com</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 flex-col md:flex-row py-2">
          <div className="md:basis-2/5">
            <p className="text-main-primary-400 font-semibold">
              {"National Identity Number (NIN)"}
            </p>
          </div>
          <div className="md:basis-2/5">
            <div>1234567890</div>
          </div>
        </div>
        <h5 className="my-4 mt-8">Password & PIN</h5>
        <div className="flex flex-wrap py-2">
          <div className="md:basis-2/5">
            <p className="text-main-primary-400 font-semibold">
              Update Password
            </p>
            <p>Change your old password to a new one</p>
          </div>
          <div className="md:basis-2/5">
            <p
              className="text-main-primary-300 hover:text-main-primary-400 font-semibold cursor-pointer transition-colors"
              onClick={onOpen}
            >
              Change Password
            </p>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5 mt-5">
          <div className="md:basis-2/5">&nbsp;</div>
          <div className="md:basis-2/5">
            <Button type="submit" className="py-3">
              Save CHanges
            </Button>
          </div>
        </div>
      </Wrapper>
      <ChangePasswordModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const Wrapper = styled.div`
  h5 {
    color: ${({ theme }) => theme.colors.main.secondary[200]};
    font-size: 24px;
  }
`;

export default SecuritySetting;
