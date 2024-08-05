import {
  Pagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator
} from "@ajna/pagination";
import React from "react";
import { HStack, Icon, Select } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

const PaginationWrapper = ({
  p,
  pages,
  jumpSize,
  pageSize,
  isDisabled,
  pagesCount,
  currentPage,
  setPageSize,
  setCurrentPage,
  handlePageChange,
  justify = "space-between"
}: any) => {
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPageSize(e.target.value);
  };

  return (
    <>
      <HStack
        p={p ?? "10px 20px"}
        justifyContent="space-between"
        borderRadius="0px 0px 16px 16px"
      >
        <HStack>
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            isDisabled={isDisabled}
            onPageChange={handlePageChange}
          >
            <PaginationContainer
              p={4}
              w="full"
              align="center"
              justify={justify}
            >
              <PaginationPrevious
                mr="8px"
                boxSize="32px"
                _focus={{ shadow: "0 0 0 3px var(--focusColor)" }}
                _active={{ bg: "transparent" }}
                _hover={{
                  bg: "transparent"
                }}
                bg="transparent"
                border={"2px"}
                size={"sm"}
              >
                <Icon as={ChevronLeftIcon} w={5} h={5} />
              </PaginationPrevious>

              <PaginationPageGroup
                isInline
                align="center"
                separator={
                  <PaginationSeparator
                    border="1px solid #DFE3E8"
                    color="brand.grayScale"
                    bg="transparent"
                    fontSize="sm"
                    boxSize="32px"
                    jumpSize={jumpSize ?? 4}
                    _active={{ bg: "transparent" }}
                    _hover={{
                      bg: "transparent"
                    }}
                    _focus={{
                      borderColor: "transparent",
                      shadow: "0 0 0 3px var(--focusColor)"
                    }}
                  />
                }
              >
                {pages.map((page: any) => (
                  <PaginationPage
                    boxSize="32px"
                    bg="gray.100"
                    border="2px"
                    key={`pagination_page_${page}`}
                    page={page}
                    fontSize="sm"
                    color="brand.grayScale"
                    _active={{ bg: "primary.500", color: "white" }}
                    _hover={{
                      borderColor: "primary.500",
                      bg: "primary.500",
                      color: "white"
                    }}
                    _focus={{
                      borderColor: "primary.500",
                      background: "primary.500",
                      shadow: "0 0 0 3px var(--focusColor)"
                    }}
                    _current={{
                      borderColor: "primary.500",
                      bg: "primary.500",
                      fontSize: "sm",
                      boxSize: "32px",
                      color: "#fff",
                      _hover: {
                        borderColor: "#DFE3E8",
                        bg: "transparent",
                        color: "black"
                      }
                    }}
                  />
                ))}
              </PaginationPageGroup>

              <PaginationNext
                size={"sm"}
                ml="8px"
                boxSize={"32px"}
                _active={{ bg: "transparent" }}
                _focus={{ shadow: "0 0 0 3px var(--focusColor)" }}
                _hover={{
                  bg: "transparent"
                }}
                bg="transparent"
                border={"2px"}
                p="0"
              >
                <Icon as={ChevronRightIcon} w={5} h={5} />
              </PaginationNext>

              <Select
                ml="8px"
                h="32px"
                _focus={{ shadow: "0 0 0 3px var(--focusColor)" }}
                border={"2px"}
                onChange={handlePageSizeChange}
                value={pageSize}
                w="fit-content"
                color={"#141D3E"}
                borderColor={"#141D3E !important"}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Select>
            </PaginationContainer>
          </Pagination>
        </HStack>
      </HStack>
    </>
  );
};

export default PaginationWrapper;
