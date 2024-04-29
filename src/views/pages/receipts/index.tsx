import { currencyFormatter } from "app/utils";
import DataTable from "views/containers/tables";
import { Button, IconButton } from "views/components/button";
import { FaEye, FaTrash } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import Pagination from "views/components/pagination";
import Loading from "views/components/loading";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchReceipts } from "app/store";
import Err from "views/components/error";
import { IoTrashBinOutline } from "react-icons/io5";
import usePageInfo from "app/hooks/usePageInfo";
import Helmet from "views/components/helmet";
import { Link } from "react-router-dom";

const Receipts = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // data
  const state = useAppSelector((state) => state.receipts);
  const { data, loading, error } = state;

  useEffect(() => {
    dispatch(fetchReceipts());
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
      <Helmet pageTitle="Rceepts - Collectam" />
      <div>
        {currentTableData.length ? (
          <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-5 px-5">
                <IconButton icon={<IoTrashBinOutline size={20} />} />
              </div>
              <div className="flex items-center gap-5 px-5">
                <Link to="/add-document/receipt">
                  <Button>New Receipt</Button>
                </Link>
              </div>
            </div>
            <DataTable>
              <thead>
                <tr>
                  <th></th>
                  <th>Receipt Number</th>
                  <th>First Name</th>
                  <th>Amount</th>
                  <th>Customer Email</th>
                  <th>Phone Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentTableData.map((el) => (
                  <tr key={el.receiptNo}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.has(el.receiptNo)}
                        onChange={(e) => onCheckHandler(e, el.receiptNo)}
                      />
                    </td>
                    <td>{el.receiptNo}</td>
                    <td>{el.firstName}</td>
                    <td>{currencyFormatter(el.amount, "NGN")}</td>
                    <td>{el.customerEmail}</td>
                    <td>{el.phone}</td>
                    <td align="right">
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          variant="secondary"
                          type="submit"
                          className="flex items-center gap-2 px-3 rounded-[0.75rem_!important]"
                        >
                          <FaEye size={16} />
                          <span className="tracking-wider">view</span>
                        </Button>
                        <Button
                          variant="danger"
                          type="submit"
                          className="flex items-center gap-2 px-3 rounded-[0.75rem_!important]"
                        >
                          <FaTrash size={16} />
                          <span className="tracking-wider">Delete</span>
                        </Button>
                      </div>
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

export default Receipts;
