import { Button } from "views/components/button";
import InputBlock from "views/components/input/inputBlock";
import Loading from "views/components/loading";
import { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

const AddInvoiceBatch = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const uploadBatchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      addToast("Invoices added successfully", {
        appearance: "success"
      });
      setLoading(false);
      navigate("../invoices");
    }, 1000);
  };
  return (
    <>
      <Wrapper className="container">
        <h5 className="text-4xlxl">Add Invoices</h5>
        <form className="my-10" onSubmit={uploadBatchHandler}>
          <div className="py-2">
            <label htmlFor="invoicesBatch">Upload Excel Files*</label>
            <InputBlock w="30rem" type="file" id="invoicesBatch" />
          </div>
          <div className="my-4 basis-full shrink-0 flex items-center gap-5">
            <Button type="submit">Submit</Button>
            <div className="flex items-center gap-2 cursor-pointer transition-colors download">
              <BiDownload size={25} />
              <span>Download Template</span>
            </div>
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

  .activeLink,
  .formLink:hover {
    border-color: ${({ theme }) => theme.colors.main.primary[400]};
  }

  .download:hover {
    color: ${({ theme }) => theme.colors.main.primary[400]};
  }
`;

export default AddInvoiceBatch;
