import { currencyFormatter } from "app/utils";
import DataTable from "views/containers/tables";
import { Button, IconButton } from "views/components/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import Loading from "views/components/loading";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchProducts } from "data/store";
import Err from "views/components/error";
import { IoAddOutline, IoTrashBinOutline } from "react-icons/io5";
import usePageInfo from "app/hooks/usePageInfo";
import Helmet from "views/components/helmet";
import { usePagination } from "@ajna/pagination";
import PaginationWrapper from "views/components/pagination/ajna-wrapper";
import { useDisclosure } from "@chakra-ui/react";
import AddProductForm from "./add";

const Products = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // data
  const [state, newProductSessionCount] = useAppSelector((state) => [
    state.products.all,
    state.products.session.newProductCount
  ]);
  const { data, loading, error, pagination } = state;

  // selectable rows
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const array = Array.from(selected);

  const logSelected = useCallback(() => {
    if (selected.size === 0) return;

    console.log({ selected, array });
  }, [selected]);

  logSelected();

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
    dispatch(fetchProducts({ page: currentPage, pageSize: pageSize }));
  }, [pageSize, currentPage, newProductSessionCount]);

  //
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Helmet pageTitle="Products - Collectam" />
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
              <Button onClick={onOpen}>
                <span className="flex items-center gap-3">
                  <IoAddOutline size={18} />
                  <span>New Product</span>
                </span>
              </Button>
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
                {data.map((el) => (
                  <tr key={el.code}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.has(el.code)}
                        onChange={(e) => onCheckHandler(e, el.code)}
                      />
                    </td>
                    <td>{el.code}</td>
                    <td>{el.name}</td>
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
      <AddProductForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Products;
