import React, { useMemo } from "react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useColorMode
} from "@chakra-ui/react"

const TextInput = (props) => {
  let form = {}
  let field = {}
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
      <Input
        {...field}
        value={props.value}
        color={linkColor}
        type={props.type}
        id={props.name}
        placeholder={props.title}
        defaultValue={props.defaultValue}
        onChange={handleChange}
      />
      <FormErrorMessage color={linkColor}>None</FormErrorMessage>
    </FormControl>
  )
}

export default TextInput
