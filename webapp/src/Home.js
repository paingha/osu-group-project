import React from "react";
import { Box } from "@chakra-ui/react"

const logout=async()=>{
     await localStorage.removeItem('TOKEN');
     await window.location.replace("/login");
}
const Home = () => {
  return (
  <Box
  as="div"
  left="0"
  width="100%"
  height="100vh"
  top="0"
  right="0"
  pt="0"
  d="flex"
  flexDirection="column"
  alignContent="center"
  alignItems="center"
  justifyContent="center"
>
    <h1>Welcome to the Tutoring App</h1>
    <br />
    <a href="#" onClick={()=> logout()}>Logout</a>
</Box>
);
};

export default Home;
