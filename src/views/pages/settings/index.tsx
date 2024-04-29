import SettingLink from "views/components/link/setting-link";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Settings = (): JSX.Element => {
  return (
    <>
      <Wrapper className="container">
        <div className="flex items-center justify-between gap-4 py-5 overflow-x-scroll">
          <div className="flex items-center gap-4">
            <SettingLink to=".">Account</SettingLink>
            <SettingLink to="./business">Business</SettingLink>
            <SettingLink to="./bank-account">Bank Account</SettingLink>
            <SettingLink to="./security">Security</SettingLink>
          </div>
        </div>
        <div className="py-10">
          <Outlet />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

export default Settings;
