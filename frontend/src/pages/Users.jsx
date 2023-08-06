import React, { useEffect, useState } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Select,
  Button,
  HStack,
  Box,
  Spinner,
  Thead,
  Flex,
  Text,
  Center,
  Heading,
  Th,
  TableContainer,
} from "@chakra-ui/react";
export const Users = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterValue, setFilterValue] = useState("");

  const fetchData = async (page, filter) => {
    setIsLoading(true);
    fetch(`http://localhost:8080/user/?page=${page}`)
      .then((res) => res.json())
      .then((actualData) => {
        // console.log(actualData);
        setData(actualData.data);
        setTotalPages(Math.ceil(actualData.total / 10));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(currentPage, filterValue);
  }, [currentPage, filterValue]);

  const handlePageChange = (page) => {
    console.log(totalPages);
    setCurrentPage(page);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  return (
    <>
      <Center>
        <Heading as={"h4"}>User Details</Heading>
      </Center>
      <Flex alignItems={"center"} gap={"40px"} mx={"40px"} mt={"60px"}>
        <Text>Filter By Country</Text>
        <Select
          onChange={handleFilterChange}
          border={"1px dotted gray"}
          width={"20%"}
          value={filterValue}
        >
          <option value="">All</option>
          <option value="United States">United States</option>
          <option value="India">India</option>
          <option value="Norway">Norway</option>
          <option value="Ireland">Ireland</option>
          <option value="Finland">Finland</option>
          {/* Add more filter options here */}
        </Select>
      </Flex>

      <Box mt={"50px"}>
        {isLoading ? (
          <Spinner size={"xl"} />
        ) : (
          <TableContainer>
            <Table
              width={"95%"}
              margin={"auto"}
              variant="striped"
              colorScheme="teal"
              size="sm"
            >
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Age</Th>
                  <Th>Email</Th>
                  <Th>Gender</Th>
                  <Th>Country</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>{item.first_name}</Td>
                    <Td>{item.last_name}</Td>
                    <Td>{item.dob_age}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.gender}</Td>
                    <Td>{item.country}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Box mt={"40px"}>
        <HStack
          margin={"auto"}
          gap={"30px"}
          width={"20%"}
          justifyContent={"space-between"}
        >
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            variant={"solid"}
            colorScheme={"teal"}
          >
            Prev
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            variant={"solid"}
            colorScheme={"teal"}
          >
            Next
          </Button>
        </HStack>
      </Box>
    </>
  );
};
