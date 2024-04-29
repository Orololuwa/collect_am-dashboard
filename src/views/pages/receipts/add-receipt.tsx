import { Button } from "views/components/button";
import Dropdown from "views/components/input/dropdown";
import InputBlock, { TextArea } from "views/components/input/inputBlock";
import { FaPlusCircle } from "react-icons/fa";

const AddReceipt = (): JSX.Element => {
  return (
    <form className="flex flex-wrap justify-between">
      <div className="flex flex-col">
        <div className="py-2 inline-block">
          <label htmlFor="receiptDesc" className="flex items-center gap-2">
            <h6>Description</h6>
          </label>
          <TextArea w="30rem" id="receiptDesc" />
        </div>
        <div className="py-2 inline-block">
          <label htmlFor="receiptNo">Receipt No:</label>
          <InputBlock type="text" id="receiptNo" />
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
          <label htmlFor="date">Receipt No:</label>
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

export default AddReceipt;
