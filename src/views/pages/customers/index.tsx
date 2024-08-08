import DataTable from "views/containers/tables";
import { Button, IconButton } from "views/components/button";
import { FaEdit } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import Loading from "views/components/loading";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchCustomers } from "data/store";
import Err from "views/components/error";
import usePageInfo from "app/hooks/usePageInfo";
import Helmet from "views/components/helmet";
import { IoTrashBinOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { usePagination } from "@ajna/pagination";
import PaginationWrapper from "views/components/pagination/ajna-wrapper";
import AddCustomer from "./drawers/add-customer";
import { useDisclosure } from "@chakra-ui/react";
import EditAddress from "./drawers/edit-address";
import { AddressEntity, CustomerEntity } from "data/store/models/customers";
import EditDetails from "./drawers/edit-details";

const Customers = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // data
  const [state, refreshCount] = useAppSelector((state) => [
    state.customers.all,
    state.customers.session.refreshCount
  ]);
  const { data, loading, error, pagination } = state;

  // selectable rows
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const array = Array.from(selected);

  const logSelected = useCallback(() => {
    if (selected.size === 0) return;

    console.log({ selected, array });
  }, [selected]);

  logSelected();

  const onCheckHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.target.checked) {
      setSelected((prevState) => {
        prevState.add(id);
        return new Set(prevState);
      });
    } else {
      setSelected((prevState) => {
        prevState.delete(id);
        return new Set(prevState);
      });
    }
  };

  const clearSelected = () => {
    setSelected(() => {
      return new Set();
    });
  };

  // page info
  const pageInfo = usePageInfo([
    pagination.currPage,
    pagination.pageSize,
    pagination.total
  ]);

  const {
    pages,
    offset,
    pageSize,
    pagesCount,
    isDisabled,
    currentPage,
    setPageSize,
    setCurrentPage
  } = usePagination({
    limits: { inner: 2, outer: 1 },
    total: pagination?.total,
    initialState: {
      currentPage: 1,
      pageSize: pagination?.pageSize
    }
  });

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
    setTimeout(() => {
      window.scrollTo({ top: 10, behavior: "smooth" });
    }, 500);
  };

  //
  useEffect(() => {
    dispatch(fetchCustomers({ page: currentPage, pageSize: pageSize }));
  }, [pageSize, currentPage, refreshCount]);

  // add customer modal
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [isAddressView, setAddressView] = useState<AddressEntity | null>(null);

  const onOpenAddressView = (el: AddressEntity) => {
    setAddressView(el);
  };
  const onCloseAddressView = () => {
    setAddressView(null);
  };

  const [isEditCustomerView, setEditCustomerView] =
    useState<CustomerEntity | null>(null);

  const onOpenEditCustomerView = (el: CustomerEntity) => {
    setEditCustomerView(el);
  };
  const onCloseEditCustomerView = () => {
    setEditCustomerView(null);
  };

  return (
    <>
      <Helmet pageTitle="Customers - Collectam" />
      <div>
        {data.length ? (
          <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-5 px-5">
                <IconButton
                  icon={<IoTrashBinOutline size={20} />}
                  onClick={clearSelected}
                />
              </div>
              <div className="flex items-center gap-5 px-5">
                <Button onClick={onOpen}>New Customer</Button>
                <Link to="./batch">
                  <Button>Upload Batch</Button>
                </Link>
              </div>
            </div>
            <DataTable>
              <thead>
                <tr>
                  <th></th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el) => (
                  <tr key={el.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.has(el.id)}
                        onChange={(e) => onCheckHandler(e, el.id)}
                      />
                    </td>
                    <td>{el.id}</td>
                    <td>
                      {el.type === "individual"
                        ? `${el.firstName} ${el.lastName}`
                        : el.name}
                    </td>
                    <td>{el.email}</td>
                    <td>{el.phone}</td>
                    <td>{el.status}</td>
                    <td>
                      <Button
                        variant="secondary"
                        outline
                        className="flex items-center gap-2 px-3 rounded-[0.75rem_!important]"
                        onClick={() => onOpenAddressView(el.address)}
                      >
                        <span className="tracking-wider">View</span>
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        type="submit"
                        className="flex items-center gap-2 px-3 rounded-[0.75rem_!important]"
                        onClick={() => onOpenEditCustomerView(el)}
                      >
                        <FaEdit size={16} />
                        <span className="tracking-wider">Edit</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
            <div className="flex items-center justify-between px-5">
              <div>{pageInfo}</div>
              <PaginationWrapper
                handlePageChange={handlePageChange}
                totalDataCount={pagination?.total}
                currentPage={currentPage}
                isDisabled={isDisabled}
                pagesCount={pagesCount}
                setCurrentPage={setCurrentPage}
                offset={offset}
                pages={pages}
                setPageSize={setPageSize}
                pageSize={pageSize}
              />
            </div>
          </div>
        ) : null}
        {loading ? <Loading /> : null}
        {error ? <Err /> : null}
      </div>
      <AddCustomer isOpen={isOpen} onClose={onClose} />
      <EditDetails
        isOpen={!!isEditCustomerView}
        onClose={onCloseEditCustomerView}
        customer={isEditCustomerView}
      />
      <EditAddress
        isOpen={!!isAddressView}
        onClose={onCloseAddressView}
        address={isAddressView}
      />
    </>
  );
};

export default Customers;
