import { Button } from "views/components/button";
import Dropdown from "views/components/input/dropdown";
import InputBlock from "views/components/input/inputBlock";
import styled from "styled-components";

const BankAccountSetting = (): JSX.Element => {
  return (
    <Wrapper>
      <form>
        <div className="py-2">
          <label htmlFor="bankName">Bank Name</label>
          <div>
            <Dropdown placeholder="Bank Name..." />
          </div>
        </div>
        <div className="py-2">
          <label htmlFor="accountName">Account Name*</label>
          <InputBlock w="30rem" type="text" id="accountName" />
        </div>
        <div className="py-2">
          <label htmlFor="accountNumber">Account Number*</label>
          <InputBlock w="30rem" type="number" id="accountNumber" />
        </div>
        <Button type="submit" className="py-3 my-5">
          Approve
        </Button>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  h5 {
    color: ${({ theme }) => theme.colors.main.secondary[200]};
  }
`;
export default BankAccountSetting;
