import { Button } from "views/components/button";
import InputBlock from "views/components/input/inputBlock";
import Loading from "views/components/loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const IndividualForm = (): JSX.Element => {
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
            <label htmlFor="individualFirstName">First Name*</label>
            <InputBlock w="30rem" type="text" id="individualName" />
          </div>
          <div className="py-2">
            <label htmlFor="individualLastName">Last Name*</label>
            <InputBlock
              w="30rem"
              type="text"
              id="individualLastName"
              placeholder="Name"
            />
          </div>
          <div className="py-2">
            <label htmlFor="individualEmail">Email Address*</label>
            <InputBlock w="30rem" type="text" id="individualEmail" />
          </div>
        </div>
        <div>
          <div className="py-2">
            <label htmlFor="individualPhone">Phone Number*</label>
            <InputBlock w="30rem" type="tel" id="individualPhone" />
          </div>
          <div className="py-2">
            <label htmlFor="individualStreet">Address*</label>
            <InputBlock
              w="30rem"
              type="text"
              id="individualStreet"
              placeholder="Street"
            />
            <div className="inline-block">
              <InputBlock
                w="15rem"
                type="text"
                id="individualZIP"
                placeholder="ZIP"
              />
            </div>
            <div className="inline-block">
              <InputBlock
                w="15rem"
                type="text"
                id="individualCity"
                placeholder="City"
                className="inline-block"
              />
            </div>
            <InputBlock
              w="30rem"
              type="text"
              id="individualState"
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

export default IndividualForm;
