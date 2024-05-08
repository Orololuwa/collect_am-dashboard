import CircularProgress from "views/components/widgets/cicularProgress";
import { colors } from "app/theme";
import { currencyFormatter } from "app/utils";
import DataTable from "views/containers/tables";
import { format } from "date-fns";
import { Button } from "views/components/button";
import { FaEdit } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import Pagination from "views/components/pagination";
import Loading from "views/components/loading";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchInvoices } from "data/store";
import Err from "views/components/error";
import usePageInfo from "app/hooks/usePageInfo";
import Helmet from "views/components/helmet";

const Dashboard = (): JSX.Element => {
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
      <Helmet pageTitle="Dashboard - Collectam" />
      <div>
        <div className="overflow-hidden">
          <div className="flex items-center justify-evenly gap-28 px-10 w-full overflow-auto">
            <div className="flex flex-col w-max items-center gap-4">
              <CircularProgress
                color={colors.gradient.secondary.from}
                progress={100}
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="https://res.cloudinary.com/afara-partners-limited/image/upload/v1654097364/collectam/merchant%20dashboard/Combined_shape_21345_xsxgnb.svg"
                    alt="invoice"
                  />
                  <p>20 invoice</p>
                </div>
              </CircularProgress>
              <div>Total Invoice</div>
              <h5 style={{ color: colors.gradient.secondary.from }}>
                {currencyFormatter(132500, "NGN")}
              </h5>
            </div>
            <div className="flex flex-col w-max items-center gap-4">
              <CircularProgress color={colors.state.danger[400]} progress={75}>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="https://res.cloudinary.com/afara-partners-limited/image/upload/v1654097364/collectam/merchant%20dashboard/Combined_shape_21346_zerwzf.svg"
                    alt="invoice"
                  />
                  <p>06 invoice</p>
                </div>
              </CircularProgress>
              <div>Overdue</div>
              <h5 style={{ color: colors.state.danger[400] }}>
                {currencyFormatter(425000, "NGN")}
              </h5>
            </div>
            <div className="flex flex-col w-max items-center gap-4">
              <CircularProgress color={colors.main.primary[400]} progress={50}>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="https://res.cloudinary.com/afara-partners-limited/image/upload/v1654097364/collectam/merchant%20dashboard/Combined_shape_21347_tqnjkp.svg"
                    alt="invoice"
                  />
                  <p>08 invoice</p>
                </div>
              </CircularProgress>
              <div>Paid</div>
              <h5 style={{ color: colors.main.primary[400] }}>
                {currencyFormatter(600000, "NGN")}
              </h5>
            </div>
            <div className="flex flex-col w-max items-center gap-4">
              <CircularProgress color={colors.state.success[400]} progress={25}>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="https://res.cloudinary.com/afara-partners-limited/image/upload/v1654097364/collectam/merchant%20dashboard/Combined_shape_21348_ptbxgh.svg"
                    alt="invoice"
                  />
                  <p>06 invoice</p>
                </div>
              </CircularProgress>
              <div>Unpaid</div>
              <h5 style={{ color: colors.state.success[400] }}>
                {currencyFormatter(300000, "NGN")}
              </h5>
            </div>
          </div>
        </div>
        {currentTableData.length ? (
          <div className="py-10 mt-10">
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

export default Dashboard;
