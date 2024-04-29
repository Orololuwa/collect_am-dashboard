import { currencyFormatter } from "app/utils";
import DataTable from "views/containers/tables";
import { format } from "date-fns";
import { Button } from "views/components/button";
import { FaEdit } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import Pagination from "views/components/pagination";
import Loading from "views/components/loading";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchReports } from "app/store";
import Err from "views/components/error";
import usePageInfo from "app/hooks/usePageInfo";
import Helmet from "views/components/helmet";
import Dropdown from "views/components/input/dropdown";

const Reports = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // data
  const state = useAppSelector((state) => state.reports);
  const { data, loading, error } = state;

  useEffect(() => {
    dispatch(fetchReports());
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
      <Helmet pageTitle="Report - Collectam" />
      <div>
        {currentTableData.length ? (
          <div>
            <div className="flex flex-col md:flex-row items-stretch justify-end">
              <div className="flex items-stretch gap-5 flex-wrap">
                <Dropdown placeholder={<div>This Month</div>} />
                <Dropdown placeholder={<div>Status</div>} />
                <Dropdown
                  options={[
                    { value: "invoice", label: "Invoice", isdisabled: false },
                    { value: "receipt", label: "Receipt", isdisabled: false },
                    { value: "product", label: "Product", isdisabled: false },
                    { value: "customer", label: "Customer", isdisabled: false }
                  ]}
                  placeholder={<div>Select Document</div>}
                />
                <Button type="submit">Search</Button>
              </div>
            </div>
            <DataTable>
              <thead>
                <tr>
                  <th></th>
                  <th>Document Number</th>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th>Amount</th>
                  <th>Date Sent</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentTableData.map((el) => (
                  <tr key={el.documentNo}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.has(el.documentNo)}
                        onChange={(e) => onCheckHandler(e, el.documentNo)}
                      />
                    </td>
                    <td>{el.documentNo}</td>
                    <td>{el.customerName}</td>
                    <td>{el.customerEmail}</td>
                    <td>{currencyFormatter(el.amount, "NGN")}</td>
                    <td>{format(new Date(el.dateSent), "dd MMM, yyyy")}</td>
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

export default Reports;
