import {
    requestLogin,
    clearError,
    receiveLogin,
    errorLogin,
  } from "../actions/user"
  import urls from "../urls"
  const auth = localStorage.TOKEN
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  export function clearErrorCall() {
    return (dispatch) => {
      dispatch(clearError())
    }
  }

  const setStore = (stuff) => {
    return new Promise((resolve, reject) => {
      if (stuff) {
        resolve((localStorage.TOKEN = stuff))
      } else {
        reject("Supply data to store")
      }
    })
  }
 
  export function loginUserCall(email, password, toast) {
    return (dispatch) => {
      dispatch(requestLogin())
      fetch(urls.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ email, password })
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.token) {
              dispatch(receiveLogin(json))
              setStore(json.token)
                .then((stuff) => {
                  toast(
                    "success",
                    "Login Successful! :tada:",
                    "Your Login was successful. You will be redirected soon."
                  )
                  setTimeout(() => {
                    window.location.replace("/")
                  }, 2000)
                })
                .catch((err) => {
                  dispatch(errorLogin(err.message))
                })
          } else {
            toast(
              "error",
              "Authentication Failed!",
              "User email and password combination do not match!"
            )
            dispatch(errorLogin("Authentication Failed!"))
          }
        })
        .catch((error) => {
          dispatch(errorLogin(error.message))
        })
    }
  }
  export function createUserCall(data, toast, clearForm) {
    return (dispatch) => {
    if (
      data.firstName === "" ||
      data.lastName === "" ||
      data.email === "" ||
      data.password === ""
    ) {
      if (data.firstName === "") {
        toast(
          "error",
          "User First Name is required!",
          "User First Name is a required field."
        )
      }
      if (data.lastName === "") {
        toast(
          "error",
          "User Last Name is required!",
          "User Last Name is a required field."
        )
      }
      if (data.email === "") {
        toast("error", "User Email is required!", "User Email is a required field.")
      }
      if (!regex.test(data.email.toLowerCase())) {
        toast("error", "Invalid Email format!", "User Email is not an email address.")
      }
      if (data.password === "") {
        toast(
          "error",
          "User Password is required!",
          "User Password is a required field."
        )
      }
    } else {
      fetch(urls.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            if (
              json.error.status === 409 &&
              json.error.message === "Email already registered"
            ) {
              toast(
                "error",
                "Email already Registered!",
                "Email already registered. Try a different email."
              )
            }
          } else {
            toast(
              "success",
              "User Created Successfully! :tada:",
              "User Account was successfully created."
            )
            clearForm()
          }
        })
        .catch((error) => {
          toast(
            "error",
            "Error Registering Account!",
            "An error occurred, Reload the Page and Try Again."
          )
          console.log(error)
        })
    }
}
  }