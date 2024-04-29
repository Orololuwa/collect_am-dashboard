import { currencyFormatter } from "app/utils";
import DataTable from "views/containers/tables";
import { format } from "date-fns";
import { Button } from "views/components/button";
import { FaEdit } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import Pagination from "views/components/pagination";
import Loading from "views/components/loading";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchInvoices } from "app/store";
import Err from "views/components/error";
import usePageInfo from "app/hooks/usePageInfo";
import Helmet from "views/components/helmet";
import { Link } from "react-router-dom";

const Invoices = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // data
  const state = useAppSelector((state) => state.invoices);
  const { data, loading, error } = state;

  useEffect(() => {
    dispatch(fetchInvoices());
  }, []);

  // selectable rows
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const onCheckHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
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

  // pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  // page info
  const pageInfo = usePageInfo([currentPage, pageSize, data.length]);

  return (
    <>
      <Helmet pageTitle="Invoice - Collectam" />
      <div>
        {currentTableData.length ? (
          <div>
            <div className="flex justify-end">
              <div className="flex items-center gap-5 px-5">
                <Link to="/add-document/invoice">
                  <Button>New Single Invoice</Button>
                </Link>
                <Link to="./batch">
                  <Button>Upload Schedule</Button>
                </Link>
              </div>
            </div>
            <DataTable>
              <thead>
                <tr>
                  <th></th>
                  <th>Invoice Number</th>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th>Amount</th>
                  <th>Date Sent</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentTableData.map((el) => (
                  <tr key={el.invoiceNo}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.has(el.invoiceNo)}
                        onChange={(e) => onCheckHandler(e, el.invoiceNo)}
                      />
                    </td>
                    <td>{el.invoiceNo}</td>
                    <td>{el.customerName}</td>
                    <td>{el.customerEmail}</td>
                    <td>{currencyFormatter(el.amount, "NGN")}</td>
                    <td>{format(new Date(el.dateSent), "dd MMM, yyyy")}</td>
                    <td>{format(new Date(el.dueDate), "dd MMM, yyyy")}</td>
                    <td>{el.status}</td>
                    <td>
                      <Button
                        variant="secondary"
                        type="submit"
                        className="flex items-center gap-2 px-3 rounded-[0.75rem_!important]"
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
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={pageSize}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            </div>
          </div>
        ) : null}
        {loading ? <Loading /> : null}
        {error ? <Err /> : null}
      </div>
    </>
  );
};

export default Invoices;
