import React, { useMemo, useState } from "react";
import { Button } from "views/components/button";
import ButtonLink from "views/components/link/button-link";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Option } from "views/components/input/dropdown";
import InputBlock from "views/components/input/inputBlock";
import { useAppSelector } from "app/hooks";
import { currencyFormatter } from "app/utils";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AddOnsProps, ProductDataProps } from "./models";

const initialProductState: ProductDataProps = {
  description: "",
  id: 0,
  price: 0,
  productCode: "",
  quantity: 0,
  title: "",
  total: 0
};

const AddDocument = (): JSX.Element => {
  // get avalaible products from the store
  const products = useAppSelector((state) => state.products.data);

  // map products to dropdown options
  const productOptions = products?.map(
    (el): Option => ({
      label: el.name,
      value: el.id,
      isdisabled: false
    })
  );

  // initialize multiline form state logic
  const [productState, setProductState] = useState<ProductDataProps[]>([
    initialProductState
  ]);

  // handle event change for the product quantity
  const onInputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const { value } = e.target;
    if (+value < 0) return;
    setProductState((prevState) => {
      const prevStateCopy = [...prevState];
      prevStateCopy[idx] = {
        ...prevStateCopy[idx],
        quantity: +value,
        total: +value * prevStateCopy[idx].price
      };
      return prevStateCopy;
    });
  };

  // handle event change for the product title
  const onSelectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    idx: number
  ) => {
    const { value } = e.target;

    if (value === "placeholder") return;
    const singleProduct = products.find((el) => el.id === Number(value));
    if (!singleProduct) return;
    setProductState((prevState) => {
      const prevStateCopy = [...prevState];
      const quantity =
        prevStateCopy[idx].quantity > 1 ? prevStateCopy[idx].quantity : 1;

      prevStateCopy[idx] = {
        ...prevStateCopy[idx],
        ...singleProduct,
        quantity: quantity,
        total: quantity * singleProduct.price
      };
      return prevStateCopy;
    });
  };

  // function to add form to the line
  const addLineHandler = () => {
    setProductState((prevState) => {
      const prevStateCopy = [...prevState];
      prevStateCopy.push(initialProductState);
      return prevStateCopy;
    });
  };

  // function to remove form from the line
  const removeLineHandler = (idx: number) => {
    if (productState.length === 1) {
      setProductState([initialProductState]);
      return;
    }
    setProductState((prevState) => {
      const prevStateCopy = [...prevState];
      if (idx > -1) {
        prevStateCopy.splice(idx, 1);
      }
      return [...prevStateCopy];
    });
  };

  const subtotalAmount = useMemo(
    () =>
      productState.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity;
      }, 0),
    [productState]
  );

  // tax state
  const [addons, setAddons] = useState<AddOnsProps>({
    tax: { checked: false, percentage: 0, amount: 0 },
    discount: { checked: false, percentage: 0, amount: 0 },
    serviceCharge: { checked: false, percentage: 0, amount: 0 }
  });

  const onAddonsCheckedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setAddons((prevState) => {
      const prevStateCopy = { ...prevState };
      prevStateCopy[name as "tax" | "discount" | "serviceCharge"].checked =
        checked;

      return prevStateCopy;
    });
  };

  const onAddonsValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAddons((prevState) => {
      const prevStateCopy = { ...prevState };
      prevStateCopy[name as "tax" | "discount" | "serviceCharge"].percentage =
        +value;
      prevStateCopy[name as "tax" | "discount" | "serviceCharge"].amount =
        +value * 100;

      return prevStateCopy;
    });
  };

  const [discountOption, setDiscountOption] =
    useState<"percentage" | "flatAmount">("percentage");

  const taxAmount = useMemo(
    () =>
      addons.tax.checked ? (addons.tax.percentage / 100) * subtotalAmount : 0,
    [
      subtotalAmount,
      addons.tax.checked,
      addons.tax.percentage,
      addons.tax,
      addons
    ]
  );

  const serviceChargeAmount = useMemo(
    () =>
      addons.serviceCharge.checked
        ? (addons.serviceCharge.percentage / 100) * subtotalAmount
        : 0,
    [
      subtotalAmount,
      addons.serviceCharge.checked,
      addons.serviceCharge.percentage,
      addons.serviceCharge,
      addons
    ]
  );

  const discountAmount = useMemo(
    () =>
      addons.discount.checked && discountOption === "percentage"
        ? (addons.discount.percentage / 100) * subtotalAmount
        : addons.discount.checked && discountOption === "flatAmount"
        ? addons.discount.amount
        : 0,
    [
      subtotalAmount,
      discountOption,
      addons.discount.checked,
      addons.discount.percentage,
      addons.discount,
      addons
    ]
  );

  return (
    <>
      <Wrapper className="container">
        <div className="flex items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-4">
            <ButtonLink to="invoice">Invoice</ButtonLink>
            <ButtonLink to="receipt">Receipt</ButtonLink>
          </div>
          <Button type="submit">Save</Button>
        </div>
        <div className="py-5">
          <Outlet />
        </div>
        <table className="w-full mt-5">
          <tr>
            <th
              align="left"
              className="border-y-[1px] border-y-main-secondary-400 border-opacity-5 p-2"
            >
              Name
            </th>
            <th
              align="left"
              className="border-y-[1px] border-y-main-secondary-400 border-opacity-5 p-2"
            >
              Quantity
            </th>
            <th
              align="left"
              className="border-y-[1px] border-y-main-secondary-400 border-opacity-5 p-2"
            >
              Price
            </th>
            <th
              align="left"
              className="border-y-[1px] border-y-main-secondary-400 border-opacity-5 p-2"
            >
              Total
            </th>
          </tr>
          <tbody>
            {productState.map((_, idx) => (
              <tr key={idx}>
                <td className="p-2">
                  <select
                    className="outline-none px-3 py-3 border-[0.5px] bg-transparent border-main-secondary-100"
                    value={productState[idx].id.toString()}
                    onChange={(e) => onSelectChangeHandler(e, idx)}
                  >
                    <option value="placeholder">Add Product</option>
                    {productOptions.map((el) => (
                      <option
                        key={el.value}
                        value={el.value}
                        disabled={el.isdisabled}
                      >
                        {el.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <InputBlock
                    type="number"
                    value={productState[idx].quantity}
                    onChange={(e) => onInputChangeHandler(e, idx)}
                  />
                </td>
                <td className="p-2">
                  {productState
                    ? currencyFormatter(productState[idx].price, "NGN")
                    : ""}
                </td>
                <td className="p-2">
                  {productState
                    ? currencyFormatter(productState[idx].total, "NGN")
                    : ""}
                </td>
                <td>
                  <IoCloseCircleOutline
                    size={25}
                    className={`${
                      productState.length === 1 && productState[0].title === ""
                        ? "cursor-not-allowed text-red-300"
                        : productState.length === 1 &&
                          productState[0].title != ""
                        ? "cursor-pointer text-red-300"
                        : "cursor-pointer text-red-500 hover:scale-125 transition-transform"
                    }`}
                    onClick={() => removeLineHandler(idx)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td
                className="cursor-pointer hover:text-main-primary-4idx0"
                onClick={addLineHandler}
              >
                + Add line
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="py-10">
                <div className="py-3">
                  <div className="flex items-center gap-2">
                    <input
                      type={"checkbox"}
                      id="taxadded"
                      name="tax"
                      checked={addons.tax.checked}
                      onChange={onAddonsCheckedHandler}
                    />
                    <label htmlFor="taxadded">Tax (%)</label>
                    <InputBlock
                      type={"number"}
                      placeholder="Enter Tax Value"
                      name="tax"
                      value={addons.tax.percentage}
                      onChange={onAddonsValueHandler}
                      disabled={!addons.tax.checked}
                    />
                  </div>
                </div>
                <div className="py-3">
                  <div className="flex items-center gap-2">
                    <input
                      type={"checkbox"}
                      name="serviceCharge"
                      id="serviceChargeremoved"
                      onChange={onAddonsCheckedHandler}
                    />
                    <label htmlFor="serviceChargeremoved">
                      Service Charge (%)
                    </label>
                    <InputBlock
                      type={"number"}
                      placeholder="Value"
                      name="serviceCharge"
                      value={addons.serviceCharge.percentage}
                      onChange={onAddonsValueHandler}
                      disabled={!addons.serviceCharge.checked}
                    />
                  </div>
                </div>
                <div className="py-3">
                  <div className="flex items-center gap-2">
                    <input
                      type={"checkbox"}
                      name="discount"
                      id="discountremoved"
                      onChange={onAddonsCheckedHandler}
                    />
                    <label htmlFor="discountremoved">Discount</label>
                    <select
                      className="outline-none px-3 py-3 border-[0.5px] bg-transparent border-main-secondary-100"
                      placeholder="Discount Type"
                      value={discountOption}
                      onChange={(e) =>
                        setDiscountOption(
                          e.target.value as "percentage" | "flatAmount"
                        )
                      }
                      disabled={!addons.discount.checked}
                    >
                      <option value="" disabled>
                        Discount Type
                      </option>
                      <option value="percentage">Percentage</option>
                      <option value="flatAmount">Flat Amount</option>
                    </select>
                    <InputBlock
                      type={"number"}
                      placeholder="Value"
                      name="discount"
                      value={addons.discount.percentage}
                      onChange={onAddonsValueHandler}
                      disabled={!addons.discount.checked}
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}></td>
              <td>
                <b>Sub Total Amount:</b>
              </td>
              <td>
                <b className="text-transparent">+ </b>
                {currencyFormatter(subtotalAmount, "NGN")}
              </td>
            </tr>
            {addons.tax.checked ? (
              <tr>
                <td colSpan={2}></td>
                <td className="text-red-400">
                  <b>Tax</b>
                </td>
                <td className="text-red-400">
                  + {currencyFormatter(taxAmount, "NGN")}
                </td>
              </tr>
            ) : null}
            {addons.serviceCharge.checked ? (
              <tr>
                <td colSpan={2}></td>
                <td className="text-red-400">
                  <b>Service Charge:</b>
                </td>
                <td className="text-red-400">
                  + {currencyFormatter(serviceChargeAmount, "NGN")}
                </td>
              </tr>
            ) : null}
            {addons.discount.checked ? (
              <tr>
                <td colSpan={2}></td>
                <td className="text-green-400">
                  <b>Discount:</b>
                </td>
                <td className="text-green-400">
                  - {currencyFormatter(discountAmount, "NGN")}
                </td>
              </tr>
            ) : null}
            <tr>
              <td colSpan={2}></td>
              <td className="border-y-[1px] border-y-main-secondary-400 border-opacity-5 py-1">
                <b>Total:</b>
              </td>
              <td className="border-y-[1px] border-y-main-secondary-400 border-opacity-5 py-1">
                <b className="text-transparent">+ </b>
                {currencyFormatter(
                  subtotalAmount +
                    taxAmount +
                    serviceChargeAmount -
                    discountAmount,
                  "NGN"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

export default AddDocument;
