import { useToast } from "@chakra-ui/react"

const Toast = (...props) => {
  const toast = useToast()
  toast({
    position: props.position || "top",
    title: props.title,
    description: props.description,
    status: props.status || "success", //success, error, warning
    duration: props.duration || 5000,
    isClosable: props.close || true
  })
}

export default Toast
