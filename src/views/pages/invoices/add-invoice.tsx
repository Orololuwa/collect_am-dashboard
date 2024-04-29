import { Button } from "views/components/button";
import Dropdown from "views/components/input/dropdown";
import InputBlock, { TextArea } from "views/components/input/inputBlock";
import { FaPlusCircle } from "react-icons/fa";

const AddInvoice = (): JSX.Element => {
  return (
    <form className="flex flex-wrap justify-between">
      <div className="flex flex-col">
        <div className="py-2 inline-block">
          <label htmlFor="invoiceDesc" className="flex items-center gap-2">
            <h6>Description</h6>
          </label>
          <TextArea w="30rem" id="invoiceDesc" />
        </div>
        <div className="py-2 inline-block">
          <label htmlFor="invoiceNo">Invoice No:</label>
          <InputBlock type="text" id="invoiceNo" />
        </div>
        <div className="py-2 inline-block">
          <label>Select Customer</label>
          <div className="flex items-stretch gap-3">
            <Dropdown placeholder={<div>Add Customer</div>} />
            <Button type="submit" className="px-3">
              <FaPlusCircle size={20} />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-x-5 flex-wrap">
        <div className="py-2 inline-block">
          <label htmlFor="date">Invoice No:</label>
          <InputBlock type="date" id="date" />
        </div>
        <div className="py-2 inline-block">
          <label>Due</label>
          <div>
            <Dropdown placeholder={<div>Due on</div>} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddInvoice;
