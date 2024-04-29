import styled from "styled-components";
import { useState } from "react";
import classNames from "classnames";
import CompanyForm from "./company-form";
import IndividualForm from "./individual-form";

const AddCustomerForm = (): JSX.Element => {
  const [isIndexForm, setIndexForm] =
    useState<"company" | "individual" | undefined>("company");

  const toggleActiveFormHandler = () => {
    setIndexForm((prevState) => {
      if (prevState === "company") {
        return "individual";
      } else if (prevState === "individual") {
        return "company";
      }
    });
  };

  return (
    <>
      <Wrapper className="container">
        <h5 className="text-4xlxl">Add Customer</h5>
        <div className="flex items-center gap-4 mt-5">
          <span
            className={classNames({
              "border-b-4 cursor-pointer formLink transition-colors": true,
              activeLink: isIndexForm === "company"
            })}
            onClick={toggleActiveFormHandler}
          >
            Company
          </span>
          <span
            className={classNames({
              "border-b-4 cursor-pointer formLink transition-colors": true,
              activeLink: isIndexForm === "individual"
            })}
            onClick={toggleActiveFormHandler}
          >
            Individual
          </span>
        </div>
        <div className="my-10">
          {isIndexForm === "company" ? <CompanyForm /> : null}
          {isIndexForm === "individual" ? <IndividualForm /> : null}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  h5 {
    color: ${({ theme }) => theme.colors.main.secondary[200]};
  }

  .activeLink,
  .formLink:hover {
    border-color: ${({ theme }) => theme.colors.main.primary[400]};
  }
`;

export default AddCustomerForm;
