import React from "react"
import { Button } from "@chakra-ui/react"

const ButtonInput = (props) => {
  return (
    <Button
      {...props}
      isLoading={props.isLoading}
      onClick={props.onClick}
      leftIcon={props.icon}
      variantColor="teal"
      color="white"
      bg='tomato'
      variant={props.variant}
    >
      {props.title}
    </Button>
  )
}

export default ButtonInput
