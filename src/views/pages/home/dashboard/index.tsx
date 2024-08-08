import CircularProgress from "views/components/widgets/cicularProgress";
import { colors } from "app/theme";
import { currencyFormatter } from "app/utils";
import DataTable from "views/containers/tables";
import { format } from "date-fns";
import { Button } from "views/components/button";
import { FaEdit } from "react-icons/fa";
import { useEffect } from "react";
import Loading from "views/components/loading";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchInvoices } from "data/store";
import Err from "views/components/error";
import usePageInfo from "app/hooks/usePageInfo";
import Helmet from "views/components/helmet";
import PaginationWrapper from "views/components/pagination/ajna-wrapper";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { usePagination } from "@ajna/pagination";

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // data
  const [state, refreshCount] = useAppSelector((state) => [
    state.invoices.all,
    state.invoices.session.refreshCount
  ]);
  const { data, loading, error, pagination } = state;

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
        {data.length ? (
          <div>
            <DataTable>
              <thead>
                <tr>
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
    </>
  );
};

export default Dashboard;
