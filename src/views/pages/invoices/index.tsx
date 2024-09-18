import DataTable from "views/containers/tables";
import { Button, IconButton } from "views/components/button";
import { FaEdit } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import Loading from "views/components/loading";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchInvoices } from "data/store";
import Err from "views/components/error";
import usePageInfo from "app/hooks/usePageInfo";
import Helmet from "views/components/helmet";
import { IoTrashBinOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { usePagination } from "@ajna/pagination";
import PaginationWrapper from "views/components/pagination/ajna-wrapper";
import { Flex, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import { currencyFormatter } from "app/utils";
import CreateInvoice from "./drawers/new-invoice";

const Invoices = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // data
  const [state, refreshCount] = useAppSelector((state) => [
    state.invoices.all,
    state.invoices.session.refreshCount
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
    dispatch(fetchInvoices({ page: currentPage, pageSize: pageSize }));
  }, [pageSize, currentPage, refreshCount]);

  //
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Helmet pageTitle="Invoices - Collectam" />
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
                <Button onClick={onOpen}>New Invoice</Button>
                <Link to="./batch">
                  <Button>Upload Batch</Button>
                </Link>
              </div>
            </div>
            <DataTable>
              <thead>
                <tr>
                  <th></th>
                  <th className="whitespace-nowrap">Id</th>
                  <th className="whitespace-nowrap">Invoice no.</th>
                  <th className="whitespace-nowrap">Customer</th>
                  <th className="whitespace-nowrap">Description</th>
                  <th className="whitespace-nowrap">Due Date</th>
                  <th className="whitespace-nowrap">Price</th>
                  <th className="whitespace-nowrap">Amount Paid</th>
                  <th className="whitespace-nowrap">Date Created</th>
                  <th className="whitespace-nowrap">Status</th>
                  <th className="whitespace-nowrap">Action</th>
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
                    <td className="whitespace-nowrap">{el.id}</td>
                    <td className="whitespace-nowrap w-max">{el.code}</td>
                    <td className="whitespace-nowrap">
                      <Stack>
                        <Text>
                          {el.customer.type === "individual"
                            ? `${el.customer.firstName} ${el.customer.lastName}`
                            : el.customer.name}
                        </Text>
                        <Text color={"gray"}>{el.customer.email}</Text>
                      </Stack>
                    </td>
                    <td className="whitespace-nowrap min-w-[15rem] max-w-lg">
                      {el.description}
                    </td>
                    <td className="whitespace-nowrap">
                      {format(new Date(el.dueDate), "dd MMM, yyyy")}
                    </td>
                    <td className="whitespace-nowrap">
                      {currencyFormatter(el.price, "NGN")}
                    </td>
                    <td className="whitespace-nowrap">
                      {currencyFormatter(el.total, "NGN")}
                    </td>
                    <td className="whitespace-nowrap">
                      {format(new Date(el.createdAt), "dd MMM, yyyy")}
                    </td>
                    <td className="whitespace-nowrap">{el.status}</td>
                    <td className="whitespace-nowrap">
                      <Flex gap="2">
                        <Button
                          variant="secondary"
                          outline
                          className="flex items-center gap-2 px-3 rounded-[0.75rem_!important]"
                        >
                          <span className="tracking-wider">View</span>
                        </Button>
                        <Button
                          variant="secondary"
                          type="submit"
                          className="flex items-center gap-2 px-3 rounded-[0.75rem_!important]"
                        >
                          <FaEdit size={16} />
                          <span className="tracking-wider">Edit</span>
                        </Button>
                      </Flex>
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
      <CreateInvoice isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Invoices;
