import React, { useMemo } from "react"
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorMode
} from "@chakra-ui/react"

function PasswordInput(props) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const { colorMode } = useColorMode()
  const linkColor = useMemo(() => (colorMode === "dark" ? "gray.500" : "gray.500"), [
    colorMode
  ])
  const handleChange = (event) => props.getData(event.target.value)
  return (
    <FormControl
      {...props.style}
    >
      <FormLabel color={linkColor} htmlFor={props.name}>
        {props.title}
      </FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter Password"
          color={linkColor}
          value={props.value}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          <Button color={linkColor} h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}

export default PasswordInput
