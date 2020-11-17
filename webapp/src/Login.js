import React, { useState } from "react"
import { Box, useToast, ButtonGroup, FormLabel, Link, Text } from "@chakra-ui/react"
import TextInput from "./components/TextInput"
import PasswordInput from "./components/PasswordInput"
import ButtonInput from "./components/Button"
import { Link as Links } from "react-router-dom"
import { connect } from "react-redux"
import { loginUserCall } from "./calls/user"
const Login = (props) => {
  const toast = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const loginUser = (email, password, showToast) => {
    props.submitForm(email, password, showToast)
  }
  const showToast = (status, title, description) => {
    toast({
      position: "top",
      title,
      description,
      status,
      duration: 5000,
      isClosable: true
    })
  }
  return (
    <>
      <Box
        as="div"
        left="0"
        width="100%"
        height="100vh"
        top="0"
        right="0"
        pt="0"
        d="flex"
        flexDirection="row"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        bg="red"
      >
        <Box
          as="div"
          d="flex"
          pb={["4", "4", "4"]}
          pt="0"
          minHeight="95%"
          width={["100%", "85%", "60%"]}
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box>
            
          </Box>
          <FormLabel fontSize="xl" color="#718096" mt="4" mb="4">
            Account Login
          </FormLabel>
          <Box
            as="div"
            pt="0"
            minHeight="95%"
            width={["100%", "90%", "45%"]}
            alignItems="center"
            alignContent="center"
            justifyContent="space-between"
            flexDirection="column"
          >
            <TextInput
              style={{ mt: 4 }}
              value={email}
              type="email"
              name="email"
              title="Email"
              getData={(e) => setEmail(e)}
            />
            <PasswordInput
              style={{ mt: 4 }}
              value={password}
              name="password"
              title="Password"
              getData={(e) => setPassword(e)}
            />
            <ButtonGroup
              d="flex"
              width="100%"
              alignItems="center"
              alignContent="center"
              justifyContent="center"
              flexDirection="row"
              mt="8"
              spacing={12}
            >
              <ButtonInput
                isLoading={props.isFetching}
                variant="solid"
                variantColor="teal"
                style={{ mt: 8 }}
                title="Login to Account"
                onClick={() => loginUser(email, password, showToast)}
              />
            </ButtonGroup>
            <Box
              d="flex"
              width="100%"
              alignItems="center"
              alignContent="center"
              justifyContent="center"
              flexDirection="row"
              mt="8"
              spacing={12}
            >
              <Link as={Links} to="/register">
                <Text fontSize="md" color="#718096" alignSelf="center" mt="4" mb="4">
                  Need an Account? Register
                </Text>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
function mapper(state) {
  return {
    isFetching: state.user.isFetching,
    error: state.user.error,
    redirect: state.user.redirect
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (email, password, showToast) => {
      dispatch(loginUserCall(email, password, showToast))
    }
  }
}
export default connect(
  mapper,
  mapDispatchToProps
)(Login)