import { Button } from "views/components/button";
import Dropdown from "views/components/input/dropdown";
import InputBlock from "views/components/input/inputBlock";
import Loading from "views/components/loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const CompanyForm = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const addCustomerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      addToast("Customer added successfully", {
        appearance: "success"
      });
      setLoading(false);
      navigate("../customers");
    }, 1000);
  };
  return (
    <>
      <form
        className="flex items-start gap-x-20 flex-wrap"
        onSubmit={addCustomerHandler}
      >
        <div>
          <div className="py-2">
            <label htmlFor="companyName">Company Name*</label>
            <InputBlock w="30rem" type="text" id="companyName" />
          </div>
          <div className="py-2">
            <label htmlFor="companyContactName">Contact Person*</label>
            <InputBlock
              w="30rem"
              type="text"
              id="companyContactName"
              placeholder="Name"
            />
            <InputBlock
              w="30rem"
              type="text"
              id="companyContactEmail"
              placeholder="Email"
            />
          </div>
          <div className="py-2">
            <label htmlFor="companyPhone">Phone*</label>
            <InputBlock w="30rem" type="text" id="companyPhone" />
          </div>
        </div>
        <div>
          <div className="py-2">
            <label htmlFor="companyCountry">Country*</label>
            <div>
              <Dropdown
                className="md:w-[30rem]"
                options={[
                  { value: "Nigeria", label: "Nigeria", isdisabled: false },
                  { value: "USA", label: "USA", isdisabled: false }
                ]}
              />
            </div>
          </div>
          <div className="py-2">
            <label htmlFor="companyStreet">Address*</label>
            <InputBlock
              w="30rem"
              type="text"
              id="companyStreet"
              placeholder="Street"
            />
            <div className="inline-block">
              <InputBlock
                w="15rem"
                type="text"
                id="companyZIP"
                placeholder="ZIP"
              />
            </div>
            <div className="inline-block">
              <InputBlock
                w="15rem"
                type="text"
                id="companyCity"
                placeholder="City"
                className="inline-block"
              />
            </div>
            <InputBlock
              w="30rem"
              type="text"
              id="companyState"
              placeholder="State"
              className="inline-block"
            />
          </div>
        </div>
        <div className="my-10 basis-full shrink-0">
          <Button type="submit">Approve</Button>
        </div>
      </form>
      {loading ? <Loading /> : null}
    </>
  );
};

export default CompanyForm;
