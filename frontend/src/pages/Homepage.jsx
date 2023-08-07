import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const toast = useToast();

  //   to fetch data
  function fetchData() {
    setIsLoading(true);
    fetch("https://randomuser.me/api/?results=50")
      .then((res) => res.json())
      .then((actualData) => {
        console.log(actualData);
        setTimeout(() => {
          postData(actualData);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        alert("Error while fetching data");
      });
  }

  //   to post data
  function postData(data) {
    setIsLoading(true);
    fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((actualData) => {
        console.log(actualData);
        setIsLoading(false);
        toast({
          title: "Added Data in DB",
          position: "top-right",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast({
          title: "Error while posting data",
          position: "top-right",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }

  //   to delete data
  function deleteData() {
    setIsLoading(true);
    fetch("http://localhost:8080/user", { method: "DELETE" })
      .then((res) => res.json())
      .then((actualData) => {
        console.log(actualData);
        setIsLoading(false);
        toast({
          title: "Deleted Data from DB",
          position: "top-right",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        alert("Error while deleting data");
      });
  }
  const handleClickFetchData = () => {
    if (isLoading) {
      // If already fetching, show an alert
      toast({
        title: "Already Fetching",
        description: "Please wait until the current fetch is complete.",
        position: "top-right",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    fetchData();
  };

  const handleClickDeleteData = async () => {
    if (isLoading) {
      // If already fetching, show an alert
      toast({
        title: "Data Deletion in Progress",
        description:
          "Please wait until the current delete operation is completeds.",
        position: "top-right",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // Show the delete confirmation modal
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = (confirmed) => {
    // If confirmed, delete the data
    if (confirmed) {
      deleteData();
    }
    // Close the delete confirmation modal
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <Box width={"60%"} margin={"auto"} marginTop={"5%"}>
        <Center>
          <Text fontSize={"20px"} fontWeight={"bold"}>
            Cointab Assignment
          </Text>
        </Center>
        <Flex justifyContent={"space-around"} alignItems={"center"} mt={"50px"}>
          <Button
            variant={"solid"}
            colorScheme={"teal"}
            onClick={handleClickFetchData}
            mr={2}
          >
            Fetch Data
          </Button>
          <Button
            variant={"solid"}
            colorScheme={"teal"}
            onClick={handleClickDeleteData}
            mr={2}
          >
            Delete Data
          </Button>
          <Button variant={"solid"} colorScheme={"teal"}>
            <Link to={"/userdetails"}>Show User Details</Link>
          </Button>
        </Flex>
      </Box>
      <Modal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete the data?</ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => handleDeleteConfirmation(false)}
            >
              No
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteConfirmation(true)}
              ml={3}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
