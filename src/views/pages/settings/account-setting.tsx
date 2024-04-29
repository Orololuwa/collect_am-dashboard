import { faker } from "@faker-js/faker";
import { Button } from "views/components/button";
import InputBlock from "views/components/input/inputBlock";
import styled from "styled-components";

const AccountSetting = (): JSX.Element => {
  return (
    <Wrapper>
      <h5>Personal Details</h5>
      <form>
        <div className="flex flex-wrap  items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Change Profile Picture
            </h6>
            <p>Choose a new avatar to be used across collectam</p>
          </div>
          <div className="md:basis-2/5">
            <img
              src={faker.image.avatar()}
              alt="merchant"
              className="w-28 h-28 rounded-full avatar object-cover"
            />
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Full Name
            </h6>
            <p>Customize your full name</p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <label htmlFor="fullName">Full Name</label>
              <InputBlock
                w="30rem"
                type="text"
                id="fullName"
                placeholder="Eg. John Doe"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Phone Number
            </h6>
            <p>Let's keep in touch</p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <label htmlFor="phone">Phone</label>
              <InputBlock
                w="30rem"
                type="text"
                id="phone"
                placeholder="+234 XXX XXX XXXX"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Gender
            </h6>
            <p>How would you like to be identified</p>
          </div>
          <div className="md:basis-2/5">
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <input id="male" type="radio" />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex gap-2 items-center">
                <input id="female" type="radio" />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Date of Birth
            </h6>
            <p>{"For your birthday :)"}</p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <label htmlFor="dob">DOB</label>
              <InputBlock w="30rem" type="date" id="dob" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row  md:items-center gap-2 py-5">
          <div className="md:basis-2/5">
            <h6 className="text-main-primary-400 text-lg font-semibold">
              Postal Address
            </h6>
            <p>For goodies and gift deliveries</p>
          </div>
          <div className="md:basis-2/5">
            <div>
              <label htmlFor="postalAddress">Address</label>
              <InputBlock
                w="30rem"
                type="text"
                id="postalAddress"
                placeholder="House number and street…"
              />
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
