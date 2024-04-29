import { useMemo } from "react";

const usePageInfo = ([currentPage, pageSize, totalCount]: [
  number,
  number,
  number
]) => {
  const firstPage = 1;
  const lastPage = Math.ceil(totalCount / pageSize);

  const pageInfo = useMemo(() => {
    return `Showing ${
      totalCount ? currentPage * pageSize - pageSize + 1 : 0
    } - ${
      (currentPage === firstPage && totalCount < pageSize) ||
      (currentPage === lastPage && totalCount < currentPage * pageSize)
        ? totalCount
        : currentPage * pageSize
    } of ${totalCount.toLocaleString()} item(s)`;
  }, [currentPage, pageSize, totalCount, lastPage]);

  return pageInfo;
};

export default usePageInfo;
