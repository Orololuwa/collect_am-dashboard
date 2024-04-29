import { Button } from "views/components/button";
import InputBlock, { TextArea } from "views/components/input/inputBlock";
import InputCurrency from "views/components/input/inputCurrency";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
import Loading from "views/components/loading";
import { useNavigate } from "react-router-dom";

const AddProductForm = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const submitProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      addToast("Product added successfully", {
        appearance: "success"
      });
      setLoading(false);
      navigate("../products");
    }, 1000);
  };

  return (
    <>
      <Wrapper className="container">
        <h5 className="text-4xlxl">Create Product</h5>
        <form className="my-10" onSubmit={submitProduct}>
          <div className="flex gap-5 flex-wrap">
            <div className="py-2 inline-block">
              <label htmlFor="productName">
                Name of the product or service*
              </label>
              <InputBlock w="30rem" type="text" id="productName" />
            </div>
            <div className="py-2 inline-block">
              <label htmlFor="productCode">ProductCode</label>
              <InputBlock w="30rem" type="text" id="productCode" />
            </div>
          </div>
          <div className="flex gap-5 flex-wrap mt-5">
            <div className="py-2 inline-block">
              <label htmlFor="productDesc" className="flex items-center gap-2">
                <h6>Description</h6>
                <small className="text-xs">
                  Automatically inserted as default for new invoices
                </small>
              </label>
              <TextArea w="30rem" id="productDesc" />
            </div>
            <div className="py-2 inline-block">
              <label htmlFor="price">Price (&#x20A6;)</label>
              <InputCurrency
                thousandSeparator={true}
                prefix="₦"
                inputMode="numeric"
                fixedDecimalScale={false}
                decimalScale={2}
                allowLeadingZeros={false}
                displayType="input"
                id="price"
                w="30rem"
              />
            </div>
          </div>
          <div className="my-10">
            <Button type="submit">Save Product</Button>
          </div>
        </form>
      </Wrapper>
      {loading ? <Loading /> : null}
    </>
  );
};

const Wrapper = styled.div`
  h5 {
    color: ${({ theme }) => theme.colors.main.secondary[200]};
  }
`;

export default AddProductForm;
