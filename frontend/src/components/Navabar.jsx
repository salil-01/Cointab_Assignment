import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <Flex
        justifyContent={"space-around"}
        alignItems={"center"}
        fontSize={"20px"}
      >
        <Link to={"/"}>Homepage</Link>
        <Link to={"/data"}>Data</Link>
      </Flex>
    </>
  );
};
