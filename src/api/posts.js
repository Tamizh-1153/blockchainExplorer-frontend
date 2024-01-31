import axios from "axios"
import { toast } from "react-toastify"

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASEURL}/api/v1`,
})

export const getUserInfo = async () => {
  try {
    const response = await api.get("/user/info", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    console.log("Error getting user info")
    throw error
  }
}

export const createUser = async ({ name, email, password }) => {
  try {
    const res = await api.post("/register", { name, email, password })
    return res.data
  } catch (error) {
    toast.error("Error registering user")
    throw error
  }
}

export const userLogin = async ({ email, password }) => {
  try {
    const res = await api.post("/login", { email, password })
    return res.data
  } catch (error) {
    toast.error("Error Logging in")
    throw error
  }
}

export const forgotPassword = async (email) => {
  try {
    const res = await api.post("/forgot_password", { email })
    return res.data
  } catch (error) {
    toast.error("Error sending password reset link")
    throw error
  }
}

export const resetPassword = async ({ id, token, password }) => {
  try {
    const res = await api.post(`/reset_password/${id}/${token}`, {
      password,
    })
    return res.data
  } catch (error) {
    toast.error("Error updating password")
    throw error
  }
}

export const getWalletDetails = async (address) => {

  try {
    const res = await api.get(`/blockchain/address/${address}`)
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getTransactionByHash = async (hash) => {
  try {
    const res = await api.get(`/blockchain/hash/${hash}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}
