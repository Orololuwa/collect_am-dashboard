import { Button } from "views/components/button";
import Dropdown from "views/components/input/dropdown";
import InputBlock from "views/components/input/inputBlock";
import styled from "styled-components";

const AccountSetting = (): JSX.Element => {
  return (
    <Wrapper>
      <h5>Business Details</h5>
      <form>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Registration
            </h6>
            <p>
              Is your business registered with the corporate affairs commission
              ?
            </p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <Dropdown placeholder="Select" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Business Name
            </h6>
            <p>Enter your Business name</p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <label htmlFor="businessName">Business Name</label>
              <InputBlock
                w="30rem"
                type="text"
                id="businessName"
                placeholder="Business Name..."
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Business Address
            </h6>
            <p>
              Is your business registered with the corporate affairs commission
              ?
            </p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <label htmlFor="businessAddress">Business Address...</label>
              <InputBlock
                w="30rem"
                type="text"
                id="businessAddress"
                placeholder="House number and street…"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Business Sector
            </h6>
            <p>How would you like to be business sector</p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <Dropdown placeholder="Select" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Business Description
            </h6>
            <p>Tell us about your business</p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <label htmlFor="businessDesc">Business Description</label>
              <InputBlock
                w="30rem"
                type="text"
                id="businessDesc"
                placeholder="Business Description..."
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Directors BVN
            </h6>
            <p>{"For your birthday :)"}</p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <label htmlFor="directorsBVN">DOB</label>
              <InputBlock
                w="30rem"
                type="tel"
                id="directorsBVN"
                placeholder="123456789"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Certificate of Registration/Incorporation
            </h6>
            <p>Certificate of Registration/Incorporation</p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <InputBlock type="file" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Proof of Address
            </h6>
            <p>Your utility bill</p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <InputBlock type="file" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">&nbsp;</div>
          <div className="md:basis-2/5">
            <Button type="submit" className="py-3">
              Save CHanges
            </Button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h5 {
    color: ${({ theme }) => theme.colors.main.secondary[200]};
  }

  .avatar {
    border: 4px solid ${({ theme }) => theme.colors.main.primary[300]};
  }
`;

export default AccountSetting;
