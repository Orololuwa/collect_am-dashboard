import { currencyFormatter } from "app/utils";
import DataTable from "views/containers/tables";
import { Button, IconButton } from "views/components/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import Pagination from "views/components/pagination";
import Loading from "views/components/loading";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchProducts } from "data/store";
import Err from "views/components/error";
import { IoAddOutline, IoTrashBinOutline } from "react-icons/io5";
import usePageInfo from "app/hooks/usePageInfo";
import Helmet from "views/components/helmet";
import { Link } from "react-router-dom";

const Products = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // data
  const state = useAppSelector((state) => state.products);
  const { data, loading, error } = state;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // selectable rows
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const array = Array.from(selected);

  console.log(array);
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
  const pageSize = 5;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  // page info
  const pageInfo = usePageInfo([currentPage, pageSize, data.length]);

  return (
    <>
      <Helmet pageTitle="Products - Collectam" />
      <div>
        {currentTableData.length ? (
          <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-5 px-5">
                <IconButton icon={<IoTrashBinOutline size={20} />} />
              </div>
              <Link to="./add" className="flex items-center gap-5 px-5">
                <Button>
                  <span className="flex items-center gap-3">
                    <IoAddOutline size={18} />
                    <span>New Product</span>
                  </span>
                </Button>
              </Link>
            </div>
            <DataTable>
              <thead>
                <tr>
                  <th></th>
                  <th>Product Code</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentTableData.map((el) => (
                  <tr key={el.productCode}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.has(el.productCode)}
                        onChange={(e) => onCheckHandler(e, el.productCode)}
                      />
                    </td>
                    <td>{el.productCode}</td>
                    <td>{el.title}</td>
                    <td className="min-w-[15rem] max-w-lg">{el.description}</td>
                    <td>{currencyFormatter(el.price, "NGN")}</td>
                    <td align="right">
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          variant="secondary"
                          type="submit"
                          className="flex items-center gap-2 px-3 rounded-[0.75rem_!important]"
                        >
                          <FaEdit size={16} />
                          <span className="tracking-wider">Edit</span>
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

export default Products;
