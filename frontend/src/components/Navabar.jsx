import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <Flex
        justifyContent={"space-around"}
        alignItems={"center"}
        fontSize={"20px"}
        bg={"teal.200"}
        fontWeight={"bold"}
        padding={"10px"}
      >
        <Link to={"/"}>Homepage</Link>
        <Link to={"/userdetails"}>User Details</Link>
      </Flex>
    </>
  );
};
